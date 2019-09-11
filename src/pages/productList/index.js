import React, { Component } from 'react';
import {
    Text,
    View,
    Linking,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    SafeAreaView
} from 'react-native';
import styles from './Style'
import I18n from '../../localization/index';
import HeaderComm from '../../common/header/header';
import { getProductListData, searchProductList, clearProductList, clearSearchList, saveFilterData } from '../../actions/ProductListAction'
import { connect } from 'react-redux';
import * as MESSAGE from '../../utils/Message'
import { scale, verticalScale } from '../../utils/Scale';
import Util from '../../utils/Util';
import Footer from '../../common/footer';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as COLORS from '../../utils/Color'
import Ionicons from "react-native-vector-icons/FontAwesome";
import _ from 'underscore'
import Filter from '../Filters/index'


var radio_props = [
    { label: 'Relevance', value: 0 },
    { label: 'Price (High to Low)', value: 1 },
    { label: 'Price (Low to High)', value: 2 }
];

let newFilter = {};
let secondFilterValue = {};
let sortbyv = 'relevance';

class ProductList extends Component {

    constructor(props) {
        super(props)
        const { filterData, collapseData, comeFrom } = this.props.navigation.state.params;
        this.state = {
            productListData: {},
            noDataMessage: null,
            scrolledIndex: 10,
            currentCountryData: {},
            selectedProduct: '',
            filterData: filterData ? filterData : {},
            collapseData: collapseData ? collapseData : {},
            showSortBy: false,
            showFilter: false,
            selectedRadio: 0,
            footer_description: null,
            comeFrom: comeFrom,
            showSale: false,

            filters: {},
            firstFilter: {
                name: '',
                isFirst: false
            },
            secondFilter: {
                name: '',
                isSecond: false,
                value: null
            }

        }
        newFilter = {};
        secondFilterValue = {};
        sortbyv = 'relevance';
    }

    changeLang = (lang) => {
        Util.getAsyncStorage('ALL_COUNTRY_AND_LANGUAGE').then((data) => {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
                for (var i in data.data) {
                    if (data.data[i].country == select.country && data.data[i].language == lang) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', data.data[i]);
                        this.getProductListByLangaugeData();
                    }
                }
            });
        });

    }

    getProductListByLangaugeData() {
        let lastProps = this.props.navigation.state.params;
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
            lastProps.objectData.storeid = parseInt(language.store_id)
            this.setState({ productListData: {}, noDataMessage: null })
            if (lastProps.comeFrom === 'product' || lastProps.comeFrom === 'home') {
                this.props.getProductList(lastProps.objectData);
            } else if (lastProps.comeFrom === 'filter') {
                let filterList = this.multiPropsFilter(lastProps.objectData.filters);
                this.setState({ productListData: filterList })

            } else {
                this.props.searchProductList(lastProps.objectData);
            }
        });
    }

    createFilterObject = (name, value) => {
		let array = [];
		if (newFilter[name]) {
			array = newFilter[name];
		}

		if (array.indexOf(value) != -1) {
			array.splice(array.indexOf(value), 1);
			newFilter[name] = array;
			this.setState({ filters: newFilter });
			if (newFilter[name].length == 0) {
				delete newFilter[name];
			}
		} else {
			let newFilterArray = []
			if (newFilter[name]) {
				newFilterArray = newFilter[name];
				newFilterArray.push(value);
				newFilter[name] = newFilterArray;
				this.setState({ filters: newFilter });
			} else {
				newFilterArray.push(value);
				newFilter[name] = newFilterArray;
				this.setState({ filters: newFilter });
			}
		}
		let data = this.multiPropsFilter(newFilter);
		this.props.saveFilterData(data);
        this.getSortBy(sortbyv, data);
        
        if(name === 'size' || newFilter['size']) {
			data = this.sortByStock(data, 'size');
			this.props.saveFilterData(data);
			//this.getSortBy(sortbyv, data);
		} else {
			this.props.saveFilterData(data);
			this.getSortBy(sortbyv, data);
		}
    }

    sortByStock = (filterData, key) => {
		if(Object.keys(newFilter).length === 0) {
			return filterData;
		}
		if (!newFilter[key]) return filterData;
		return filterData.sort((a, b) => {
			let aArray = [];
			let bArray = [];
			let newSizeInStockbArray = [];
			let newSizeInStockaArray = []; 
			newFilter[key].some((item) => {
				a.json.simpleproducts.some(data => {
					if (data[key]) {
						if (data[key].option_value === item) {
							aArray.push(data.stockstatus);
						}
					}
				})

				b.json.simpleproducts.some(data => {
					if (data[key]) {
						if (data[key].option_value === item) {
							bArray.push(data.stockstatus);
						}
					}
				});
				newSizeInStockaArray = aArray.filter((item) => {
					return item;
				});
				newSizeInStockbArray = bArray.filter((item) => {
					return item;
				});
			});
			return  newSizeInStockbArray.length - newSizeInStockaArray.length;
		});
	}
    
    multiPropsFilter = (filters) => {
		const filterKeys = Object.keys(filters);
		let products = this.props.productListData.product_data;
		products = _.values(products);
		return products.filter(product => {
			/*try {
				product = JSON.parse(product.json)
			} catch(e) {
				return true;
			}*/
			product = product.json;
			if (!filterKeys.length) return true;
			return filterKeys.every(key => {
				if (!filters[key].length) return true;
				return filters[key].some((item) => {
					if (key === "color") {
						return product.simpleproducts.some(data => {
							if (data[key]) {
								if (data[key].option_value == item) {
									return true;
								}
							}
						});
					} else if (key === "size") {
						return product.simpleproducts.some(data => {
							if (data[key]) {
								if (data[key].option_value == item) {
									return true;
								}
							}
						});
					} else {
						return Object.keys(product.filtersdata[key]).some((productfilterdata, index) => {
							let filterarray = [];
							filterarray = productfilterdata.split(',');
							if (filterarray.length > 0) {
								if (filterarray.indexOf(item) !== -1) {
									return true;
								}
							}
						});
					}
				});
			});
		});
    }
    
    getSortBy = (value, data = null) => {
		sortbyv = value;
		if (data == null) {
			if (value == "price_desc") {
				let sortData = _.values(this.props.filterProductList).sort((a, b) => b.price - a.price);
                //consoleconsole.log("sortData",sortData)
                if(newFilter['size']){
					sortData = this.sortByStock(sortData, 'size');
				}
				this.props.saveFilterData(sortData);
			} else if (value == 'price_asc') {
                let sortData = _.values(this.props.filterProductList).sort((a, b) => a.price - b.price);
                if(newFilter['size']){
					sortData = this.sortByStock(sortData, 'size');
				}
				this.props.saveFilterData(sortData);
			} else {
                let data = this.multiPropsFilter(newFilter);
                if(newFilter['size']){
					data = this.sortByStock(data, 'size');
				}
				this.props.saveFilterData(data);
			}
		} else {
			if (value == "price_desc") {
                let sortData = _.values(data).sort((a, b) => b.price - a.price);
                if(newFilter['size']){
					sortData = this.sortByStock(sortData, 'size');
				}
				this.props.saveFilterData(sortData);
			} else if (value == 'price_asc') {
                let sortData = _.values(data).sort((a, b) => a.price - b.price);
                if(newFilter['size']){
					sortData = this.sortByStock(sortData, 'size');
				}
				this.props.saveFilterData(sortData);
			} else {
                let data = this.multiPropsFilter(newFilter);
                if(newFilter['size']){
					data = this.sortByStock(data, 'size');
				}
				this.props.saveFilterData(data);
			}
		}
	}


    getFilteredData = (item = null) => {
        // this.setState({ price: el.target.value });
        if (Object.keys(newFilter).length === 0 && newFilter.constructor === Object) {
            this.setState({
                firstFilter: {
                    name: item.code,
                    isFirst: true
                },
                secondFilter: {
                    name: '',
                    isSecond: false,
                    value: null
                }
            })
        } else {
            if (item.code !== this.state.firstFilter.name) {
                this.setState({
                    firstFilter: {
                        name: this.state.firstFilter.name,
                        isFirst: false
                    }
                });
                if (this.state.secondFilter.name == '') {
                    this.setState({
                        secondFilter: {
                            name: item.code,
                            isSecond: true,
                            value: secondFilterValue[item.code]
                        }
                    })
                } else {
                    if (item.code != this.state.firstFilter.name && Object.keys(newFilter).length === 1 && newFilter[this.state.firstFilter.name]) {
                        this.setState({
                            secondFilter: {
                                name: item.code,
                                isSecond: true,
                                value: secondFilterValue[item.code]
                            }
                        })
                    } else if (item.code !== this.state.secondFilter.name && item.code != this.state.firstFilter.name) {
                        this.setState({
                            secondFilter: {
                                name: this.state.secondFilter.name,
                                isSecond: false,
                                value: null
                            },
                            firstFilter: {
                                name: this.state.firstFilter.name,
                                isFirst: false
                            }
                        })
                    }
                }
            }

        }
        if (item !== null) {
            this.createFilterObject(item.code, item.value);
        }
    };

    emptyObj = (obj = {}) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    getFilterValue = (code, value) => {
        secondFilterValue[code] = value;
    }

    componentDidUpdate(prevProps) {
        //console.log('componentDidUpdate componentDidUpdate componentDidUpdate')

        const prevParam = prevProps.navigation.state.params
        const currentParam = this.props.navigation.state.params
        //console.log('this is prevParam+currentParam', prevParam, currentParam);
        if (JSON.stringify(prevParam) != JSON.stringify(currentParam)) {
            if (currentParam.comeFrom == 'product') {
                this.setState({ filterData: {}, collapseData: {} })
            }
            this.setState({ productListData: {}, noDataMessage: null })
            const lastProps = this.props.navigation.state.params;
            if (lastProps.comeFrom === 'product' || lastProps.comeFrom === 'home') {
                newFilter = {};
                this.newFilter = {};
                // this.props.getProductList(lastProps.objectData);
            } else if (lastProps.comeFrom === 'filter') {
                let filterList = this.multiPropsFilter(lastProps.objectData.filters)
                this.setState({ productListData: filterList })
            } else {
                this.newFilter = {};
                this.props.searchProductList(lastProps.objectData);
            }
        }
    }

    componentWillMount() {
        const lastProps = this.props.navigation.state.params;
        this.setState({ productListData: {}, noDataMessage: null })
        if (lastProps.comeFrom === 'product' || lastProps.comeFrom === 'home') {
            this.props.getProductList(lastProps.objectData);
        } else if (lastProps.comeFrom === 'filter') {
            let filterList = this.multiPropsFilter(lastProps.objectData.filters)
            this.setState({ productListData: filterList })
        } else {
            this.props.searchProductList(lastProps.objectData);
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.status === 'PRODUCTLIST_DATA_SUCCESS' || nextprops.status === 'SEARCH_PRODUCTLIST_DATA_SUCCESS') {
            console.log(nextprops.productListData);
            this.setState({ productListData: Object.values(nextprops.productListData.product_data).slice(0, 10) })
            this.setState({ footer_description: nextprops.productListData.category_description });
            // this.props.clearSearchResult();
        } else if (nextprops.status === 'PRODUCTLIST_DATA_FAILED' || nextprops.status === 'SEARCH_PRODUCTLIST_DATA_FAILED') {
            this.setState({ noDataMessage: MESSAGE.NO_DATA_AVAILABLE })
            //this.props.clearProductListData();
        } else if(nextprops.status === 'FILTER_PRODUCT_LIST') {
            //console.log('this is filterProductList', nextprops.filterProductList);
            this.setState({ filterProductList: nextprops.filterProductList, productListData: Object.values(nextprops.filterProductList).slice(0, 10) });
        } 
        if (Object.keys(nextprops.currentCountryData).length > 0) {
            Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
                if (JSON.stringify(nextprops.currentCountryData) != JSON.stringify(language)) {
                    if (nextprops.currentCountryData.language === language.language) {
                        Util.setAsyncStorage('SELECTED_COUNTRY_LANGUAGE', nextprops.currentCountryData);
                        this.setState({ productListData: {}, noDataMessage: null });
                        setTimeout(() => {
                            this.getProductListByLangaugeData();
                        }, 100);
                    }

                }
            });
        }
    }

    _getUnique = (arr, comp) => {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e])
            .map(e => arr[e]);
        return unique;
    };

    renderOptionItem = ({ item }) => {
        const { selectedProduct, showSale } = this.state;
        var showSaleIn = false;
        var discountedPrice = 0;
        if (item.json.offers.status) {
            var arr = [];
            for (var i in item.json.offers.data) {
                if (i != 1 && arr.length < 2) {
                    var data = {}
                    data[i] = item.json.offers.data[i];
                    arr.push(data);
                } else if(i==1) {
                    //this.setState({ showSale : true });
                    showSaleIn = true;
                    discountedPrice = item.json.offers.data[i];
                }
            }
            item.offerList = arr;
        }

        var similarProductsList = item.json.simpleproducts;

        var tempObj = {};
        for (var i in similarProductsList) {
            if (tempObj[similarProductsList[i].color["text"]]) {
                tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
            } else {
                tempObj[similarProductsList[i].color["text"]] = [];
                tempObj[similarProductsList[i].color["text"]].push(similarProductsList[i]);
            }
        }
        function splitValue(n, s) { return n ? n.substring(0, s) + "," + n.substring(s) : "" }

        var filteredSimpleProducts = [];
        for (var i in tempObj) {
            var obj = {};
            obj.key = i;
            for (var j in tempObj[i]) {
                for (var k in tempObj[i][j]) {
                    if (obj[k]) {
                        obj[k].push(tempObj[i][j][k])
                    } else {
                        obj[k] = [];
                        obj[k].push(tempObj[i][j][k])
                    }
                }
            }
            filteredSimpleProducts.push(obj);
        }

        return (
            <TouchableOpacity style={{ width: '50%', alignItems: 'center', paddingBottom: verticalScale(10) }}
                onPress={this.getListViewItem.bind(this, item.json)}>
                <Image style={{ width: '95%', height: verticalScale('250') }} source={{ uri: item.json.imageUrl.primaryimage[0] }} />
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.itemText}>{item.json.name}</Text>
                    <Text style={[styles.itemText1, { color: 'lightpink' }]}>{item.json.collection_desc}</Text>
                    <View style={styles.itemText2}>
                        {item.json.offers.status == 1 && !showSaleIn ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.amountText, { color: 'black' }]}>
                                    {item.currency}&nbsp;{item.price}
                                </Text>
                                {/* {item.json.offers.data['1'] ?
                                    <Text style={styles.amountText}>
                                        &nbsp;{item.currency}&nbsp;{item.json.offers.data['1']}
                                    </Text> :
                                    <Text style={styles.amountText}>
                                        &nbsp;{item.currency}&nbsp;{item.json.offers.data['2']}
                                    </Text>} */}
                            </View>
                            : <View />}
                        {showSaleIn ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.amountText, { textDecorationLine: 'line-through', color: 'black' }]}>
                                    {item.currency}&nbsp;{item.price}
                                </Text>
                                <Text style={[styles.amountText, { color: 'red' }]}>
                                &nbsp;{item.currency}&nbsp;{discountedPrice}
                                </Text>
                            </View>
                        : <View />}
                        {item.json.offers.status == 0 ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.amountText, { color: 'black' }]}>
                                    {item.currency}&nbsp;{item.price}
                                </Text>
                            </View>
                            : <View />}
                    </View>
                    {item.json.offers.status == 1 && !showSaleIn ?
                        <TouchableOpacity onPress={() => this.openDiscoverMore(item.json.id, showSaleIn)} style={{ width: '95%', height: scale(30), borderRadius: scale(20), backgroundColor: '#f599ba', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.itemText3, { padding: scale(10) }]}>{I18n.t('buymore_savemore')}</Text>
                        </TouchableOpacity>
                        : <View />}
                    {showSaleIn ?
                        <TouchableOpacity onPress={() => this.openDiscoverMore(item.json.id, showSaleIn)} style={{ width: '95%', height: scale(30), borderRadius: scale(20), backgroundColor: '#f599ba', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.itemText3, { padding: scale(10) }]}>{I18n.t('sale')}</Text>
                        </TouchableOpacity>
                        : <View />}
                    {filteredSimpleProducts.length > 1 ?
                        <View style={[styles.productColor]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingBottom: scale(10) }}>
                                    <TouchableOpacity onPress={this.getListViewItemForColor.bind(this, item.json, filteredSimpleProducts[0].key)}>
                                        <Image style={[styles.productColorList]} source={{ uri: filteredSimpleProducts[0].color[0].url }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingBottom: scale(10) }}>
                                    <TouchableOpacity onPress={this.getListViewItemForColor.bind(this, item.json, filteredSimpleProducts[1].key)}>
                                        <Image style={[styles.productColorList]} source={{ uri: filteredSimpleProducts[1].color[0].url }} />
                                    </TouchableOpacity>
                                </View>
                                {filteredSimpleProducts.length > 2 ? 
                                    <View style={{ paddingBottom: scale(4), justifyContent: 'center' }}>
                                    <Text>{filteredSimpleProducts.length-2} {I18n.t('more')} +</Text>
                                </View> : <View />}
                            </View>
                        </View>
                        : <View />}
                </View>
                {/* DIscover Mode Popup */}

                {selectedProduct == item.json.id &&
                    <View style={[styles.discoverMode]}
                        onPress={this.getListViewItem.bind(this, item.json)}>
                        <View style={styles.closeOnImgScreen}>
                            <TouchableOpacity >
                                <MaterialIcons
                                    name='close-circle-outline'
                                    onPress={() => this.closeImg()}
                                    size={scale(30)}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', paddingTop: '20%', }}>
                            <View style={{ width: scale(35), height: scale(35), borderWidth: 1, borderColor: '#fff', borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: scale(20), width: scale(20), tintColor: '#fff' }} source={require('../../assets/productDetailIcon/shopping-bag.png')} />
                            </View>
                        </View>
                        {!showSale ? <View style={{ alignItems: 'center', paddingTop: '20%' }}>
                            <Text style={{ fontSize: scale(24), color: '#fff' }}>{I18n.t('buyMore')}</Text>
                            <Text style={{ fontSize: scale(24), color: '#fff' }}>{I18n.t('saveMore')}</Text>
                            <View style={{ borderWidth: .5, borderColor: '#fff', width: scale(110) }} />
                            {item.json.offers.status == 1 ?
                                <View style={{ top: 20 }}>
                                    {item.offerList[0] ?
                                        <Text style={[styles.itemText1, { color: '#fff', fontWeight: '300', padding: scale(10) }]}>
                                            {Object.keys(item.offerList[0])[0]}
                                            <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                                            &nbsp;{item.currency} &nbsp;{Object.values(item.offerList[0])[0]}</Text>
                                        : <View />}

                                    {item.offerList[1] ?
                                        <View>
                                            <View style={{ borderWidth: .5, borderColor: '#fff', width: scale(110) }} />
                                            <Text style={[styles.itemText1, { color: '#fff', fontWeight: '300', padding: scale(10) }]}>
                                                {Object.keys(item.offerList[1])[0]}
                                                <Text style={{ fontWeight: '700' }}>&nbsp;{I18n.t('for')}</Text>
                                                &nbsp;{item.currency} &nbsp;{Object.values(item.offerList[1])[0]}</Text>
                                        </View>
                                        : <View />}
                                </View>
                                : <View />}

                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeOffers') }} style={[styles.discoverMore, { top: 50 }]}>
                                <Text style={[{ padding: scale(8), fontSize: scale(14), color: '#000' }]}>{I18n.t('discoverMore')}</Text>
                            </TouchableOpacity>

                        </View> : 
                        <View style={{ alignItems: 'center', paddingTop: '20%' }}>
                            <Text style={{ fontSize: scale(24), color: '#fff' }}>{I18n.t('sale')}</Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeOffers') }} style={[styles.discoverMore, { top: 50 }]}>
                                <Text style={[{ padding: scale(8), fontSize: scale(14), color: '#000' }]}>{I18n.t('discoverMore')}</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>}
            </TouchableOpacity>
        )
    }

    openDiscoverMore = (itemId, showSaleIn) => {
        this.setState({ selectedProduct: itemId, showSale: showSaleIn });
    }

    closeImg() {
        this.setState({ selectedProduct: '', showSale: false });
    }

    //handling onPress action  
    getListViewItem = (item) => {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                var obj = {
                    customerid: data === null ? " " : data.customer_id,
                    store: select.store_id,
                    url_key: item.url_key
                }
                this.props.navigation.navigate('PriductDetail', { objectData: obj });
            });
        });
    }

    //handling Color onPress action
    getListViewItemForColor = (item, color) => {
        Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((select) => {
            Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
                var obj = {
                    customerid: data === null ? " " : data.customer_id,
                    store: select.store_id,
                    url_key: item.url_key
                }
                this.props.navigation.navigate('PriductDetail', { objectData: obj, color: color });
            });
        });
    }

    scrollEnd = () => {
        const { scrolledIndex, comeFrom, productListData } = this.state;
        if (comeFrom !== 'filter') {
            this.setState({ scrolledIndex: (scrolledIndex + 10) })
            this.setState({ productListData: Object.values(this.props.status === 'FILTER_PRODUCT_LIST' ? this.props.filterProductList : this.props.productListData.product_data).slice(0, this.state.scrolledIndex) });
        }
    }

    _Filter = () => {
        const { productListData } = this.props;
        const { filterData, collapseData } = this.state
        this.props.navigation.navigate('Filters', { Filters: productListData.filters, productListData: productListData.product_data, filterData: filterData, collapseData: collapseData, itemName: productListData.category_key });
    }

    sortBy = () => {
        this.setState({ showSortBy: true });
    }
    filterBy = () => {
        this.setState({ showFilter: true });
    }


    getProductListBySort = (value) => {
        const { productListData } = this.state;
        let sortBy = ''
        let url_key = this.props.navigation.state.params.objectData.url_key;
        if (value == 0) {
            sortBy = 'relevance'
        } else if (value == 1) {
            sortBy = 'price_desc'
        } else {
            sortBy = 'price_asc'
        }
        if (sortBy == "price_desc") {
            const sortData = _.values(productListData).sort((a, b) => b.price - a.price);
            this.props.saveFilterData(sortData);
        } else if (sortBy == 'price_asc') {
            const sortData = _.values(productListData).sort((a, b) => a.price - b.price);
            this.props.saveFilterData(sortData);
        } else {
            const productListData = this.multiPropsFilter(newFilter);
            this.props.saveFilterData(productListData);
        }
        // let filter = {};
        // var filterObj = {};
        // if (this.props.navigation.state.params.filterData) {
        //     filter = this.props.navigation.state.params.filterData;
        // }
        // Object.keys(filter).map((item, index) => {
        //     filterObj[item] = filter[item].toString();
        // })
        // Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
        //     Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        //         var obj = {
        //             customerid: data === null ? " " : data.customer_id,
        //             filters: filterObj,
        //             sortby: sortBy,
        //             storeid: parseInt(language.store_id),
        //             url_key: url_key
        //         }
        //         this.props.getProductList(obj);
        //     });
        // });
        this.setState({ showSortBy: false, selectedRadio: value, productListData: {}, noDataMessage: null });
    }

    showShowSortByModal() {
        return (
            <View>
                <Modal
                    transparent={true}
                    visible={this.state.showSortBy}
                    onRequestClose={() => {

                    }}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ showSortBy: false })}>
                        <View style={styles.contentSortBy}>
                            <View style={[styles.containerSortBy, { backgroundColor: '#fff' }]}>
                                <View style={{ padding: scale(20) }}>
                                    <RadioForm
                                        radio_props={radio_props}
                                        initial={this.state.selectedRadio}
                                        buttonSize={10}
                                        formHorizontal={false}
                                        labelHorizontal={true}
                                        labelStyle={{ paddingRight: '25%', fontSize: scale(16) }}
                                        buttonColor={COLORS.BRAND_DARKEST}
                                        selectedButtonColor={COLORS.BRAND_DARKEST}
                                        onPress={(value) => { this.getProductListBySort(value) }}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }



    showFilterModal() {
        const { productListData } = this.props;
        const { filterData, collapseData } = this.state

        let filterKey = {}
        Object.keys(this.props.productListData.filters).map((item, index) => {
            if (this.props.productListData.filters[item][0] && this.props.productListData.filters[item].length >= 1) {
                filterKey[item] = this.props.productListData.filters[item][0].code;
            } else {
                for (let i = 0; i < this.props.productListData.filters[item].length; i++) {
                    if (this.props.productListData.filters[item][i]) {
                        filterKey[item] = this.props.productListData.filters[item][i].code;
                        break;
                    }
                }
            }
        })

        return (
            <View>
                <Modal
                    transparent={true}
                    visible={this.state.showFilter}
                    onRequestClose={() => {

                    }}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ showFilter: false })}>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.containerFilterBy]}>
                                <View style={{ paddingHorizontal: scale(10), paddingBottom: scale(10) }}>
                                    <Filter
                                        onRef={instance => { this.instance = instance; }}
                                        classObj={this}
                                        Filters={productListData.filters}
                                        productListData={productListData.product_data}
                                        filterData={filterData}
                                        collapseData={collapseData}
                                        itemName={productListData.category_key}

                                        productFilters={productListData.filters}
                                        products={productListData.product_data}
                                        getFilteredData={this.getFilteredData}
                                        //getSortBy={this.getSortBy}
                                        filters={newFilter}
                                        isEmpty={this.emptyObj(newFilter)}
                                        //clearFilter={this.clearFilter}
                                        filterKey={filterKey}
                                        is_bra={this.props.productListData.is_bra}
                                        filterProductList={this.props.filterProductList}
                                        firstFilter={this.state.firstFilter}
                                        secondFilter={this.state.secondFilter}
                                        getFilterValue={this.getFilterValue}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }



    render() {
        const { productListData, noDataMessage, footer_description } = this.state;
        const { filterProductList } = this.props;
        //console.log('this is data we have recieved-------------------------------',productListData);
        //console.log('this is filterProductList', filterProductList);
        // if(Object.keys(filterProductList).length > 0) {
        //     productListData = filterProductList;
        // }
        return (
            <View style={styles.container}>
                <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/>
                <View style={[styles.filterSortMain, I18n.locale == 'ar' ? { flexDirection: 'row-reverse' } : '']}>
                    <TouchableOpacity style={styles.filterSort} onPress={() => this.filterBy()}>
                        <Text style={styles.filterSortText}>{I18n.t('filterBy')}</Text>
                    </TouchableOpacity>
                    <View style={{ height: verticalScale(35), borderWidth: 1, }} />
                    <TouchableOpacity style={styles.filterSort} onPress={() => this.sortBy()}>
                        <Text style={styles.filterSortText}>{I18n.t('sortBy')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterSortBorder} />
                {this.state.showSortBy ? <View>{this.showShowSortByModal()}</View> : <View />}
                {this.state.showFilter ? <View>{this.showFilterModal()}</View> : <View />}
                {!noDataMessage ? (Object.keys(productListData).length > 0 ?
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} onScrollEndDrag={() => this.scrollEnd()}>
                            {/* <View style={styles.filterSortBorder} /> */}

                            <View style={{ padding: scale(5), justifyContent: 'center' }}>
                                <FlatList
                                    data={productListData}
                                    renderItem={this.renderOptionItem}
                                    numColumns={2}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    showsVerticalScrollIndicator={false}
                                    key={2}
                                    extraData={this.state}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <Footer footerDescription={footer_description} comesFrom={'productList'} {...this.props} />
                        </ScrollView>
                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: scale(18), fontFamily: 'Roboto' }}>{noDataMessage}</Text></View>}
            </View>
        );
    }
}


function mapStateToProps(state) {
    const { ProductListReducer, CommonReducer } = state;
    return {
        productListData: ProductListReducer.productListData,
        status: ProductListReducer.status,
        currentCountryData: CommonReducer.currentCountryData,
        filterProductList: ProductListReducer.filterProductList,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: (obj) => {
            dispatch(getProductListData(obj))
        },
        searchProductList: (obj) => {
            dispatch(searchProductList(obj))
        },
        clearProductListData: () => {
            dispatch(clearProductList())
        },
        clearSearchResult: () => {
            dispatch(clearSearchList())
        },
        saveFilterData: (obj) => {
            dispatch(saveFilterData(obj))
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
// export default ProductList;
