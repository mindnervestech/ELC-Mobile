import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from 'react-native-check-box';
import { scale, verticalScale } from '../../utils/Scale';
import Util from '../../utils/Util';
import _ from 'underscore'
import { getStatusBarHeight } from 'react-native-status-bar-height';

let avlBandCupSize = [];
let availableList = [];
class Filters extends Component {

  constructor(props) {
    super(props);
    const { filterData, collapseData, productListData, isEmpty, filterProductList, filters } = this.props;
    //console.log('this 1111111111111111', isEmpty, filters, filterProductList, productListData);
    this.state = {
      filterCollapse: collapseData,
      applyFilter: isEmpty ? {} : filters,
      productListData: isEmpty ? productListData : filterProductList,
      selectedBandSize: null,

    }
    availableList =[];
  }

  componentDidMount() {
    this.props.onRef(this);
}

  _applyFilter = (itemName) => {
    // var filterObj = {};
    var obj = {};
    const { applyFilter, filterCollapse } = this.state
    // Object.keys(applyFilter).map((item, index) => {
    //     filterObj[item] = applyFilter[item].toString();
    // })
    Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((language) => {
      Util.getAsyncStorage('SIGN_IN_DATA').then((data) => {
        obj = {
          customerid: data == null ? " " : data.customer_id,
          filters: applyFilter,
          sortby: "relevance",
          storeid: parseInt(language.store_id),
          url_key: itemName
        }
        this.props.navigation.navigate('ProductList', { objectData: obj, filterData: applyFilter, collapseData: filterCollapse, comeFrom: 'filter' });

      });
    });
  }

  async changeStates(data){
    await this.props.getFilteredData(data);
    const { filters, isEmpty, filterProductList } = this.props;
    if(!isEmpty){
      this.setState({ applyFilter:filters, productListData: filterProductList, })
    }
  }

   onCheckboxClick = (data, index) => {
    this.changeStates(data);
    // if (this.state.applyFilter[data.code] != undefined) {
    //   let index = this.state.applyFilter[data.code].indexOf(data.value);
    //   if (index == -1) {
    //     let filter = this.state.applyFilter;
    //     let array = filter[data.code];

    //     array.push(data.value)

    //     filter[data.code] = array;

    //     this.setState({ applyFilter: filter })
    //   } else {
    //     let filter = this.state.applyFilter;
    //     let array = filter[data.code];
    //     array.splice(index, 1);
    //     filter[data.code] = array;
    //     this.setState({ applyFilter: filter })
    //   }
    // } else {
    //   let filter = this.state.applyFilter;
    //   let array = [];
    //   array.push(data.value)
    //   filter[data.code] = array;
    //   this.setState({ applyFilter: filter })
    // }

  }

  componentWillMount() {
    const { filters, isEmpty, filterProductList } = this.props;
    if(!isEmpty){
      this.setState({ applyFilter:filters, productListData: filterProductList, })
    }
    //console.log('this is filters', this.props.filters);
    //console.log('this is isEmpty', this.props)
    //this.setState({ applyFilter:this.props.filters })
  }

  componentDidUpdate(){
    //console.log('is updated thats good');
  }

  getFilters = (is_bra, filterType, productFilters) => {
    let prdFilter, id, sizeFilter, bandFilter, cupFilter;
    let _bandlabel, _cuplabel;
    let simpleSizes, simpleSizesArray, bandSizes, bandSizesArray, cupSizes, cupBandSizes;
    let availableProductsArr = this._getAvailableProducts(this.state.productListData);

    if ((parseInt(is_bra) === 1) && ((filterType === 'Size') || (filterType === 'المقاس'))) {
      let sizeFiltersArray;
      availableProductsArr = _.sortBy(availableProductsArr, 'size');
      if (availableProductsArr.length > 0) {
        let iFilterType = _.pluck(availableProductsArr, 'size');
        let availableFilterItems = _.uniq(iFilterType);
        avlBandCupSize = availableFilterItems;
        if (this.props.firstFilter.isFirst) {
          this.props.getFilterValue('size', availableFilterItems);
        }
        if (Object.keys(this.props.filters).length === 0 && this.props.filters.constructor === Object) {
        } else {
          if (this.props.filters['size']) {
            this.props.filters['size'].map((value) => {
              if (this.props.secondFilter.isSecond && this.props.secondFilter.name === 'size') {
                if (this.props.secondFilter.value) {
                  if (this.props.secondFilter.value.indexOf(value) === -1) {
                    this.props.getFilteredData({
                      code: 'size',
                      value: value
                    });
                  }
                }
              } else {
                if (!availableFilterItems.includes(value)) {
                  this.props.getFilteredData({
                    code: 'size',
                    value: value
                  });
                }
              }
            });
          }
        }
        if (this.props.firstFilter.isFirst && this.props.firstFilter.name === 'size') {
          sizeFiltersArray = _.uniq(availableList);
        } else {
          sizeFiltersArray = [];
          productFilters.map((prdFilterItem) => {
            if (this.props.secondFilter.isSecond && this.props.secondFilter.name === 'size') {
              if (this.props.secondFilter.value) {
                if (this.props.secondFilter.value.indexOf(prdFilterItem.value) !== -1) {
                  sizeFiltersArray.push(prdFilterItem);
                }
              }
            } else {
              if (availableFilterItems.includes(prdFilterItem.value)) {
                sizeFiltersArray.push(prdFilterItem);
                availableList.push(prdFilterItem);
              }
            }
          })
        }

      } else {
        sizeFiltersArray = productFilters;
      }

      simpleSizes = this._getBraSizeFilters(sizeFiltersArray, 'simple');
      simpleSizesArray = sizeFiltersArray.filter(f => simpleSizes.includes(f.name));

      bandSizes = this._getBraSizeFilters(sizeFiltersArray, 'bandSizes');
      cupSizes = this._getBraSizeFilters(sizeFiltersArray, 'cupSizes');
      cupBandSizes = this._getBraSizeFilters(sizeFiltersArray, 'cupBandSizes');

      sizeFilter = simpleSizesArray.map((item, index) => {

        id = item.code + "_" + item.value;
        return (
          <View key={`${index}_subfilters_${item}`} >
            <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(item, index) }}>
              <CheckBox onClick={() => { this.onCheckboxClick(item, index) }}
                isChecked={this.state.applyFilter[item.code] != undefined ? this.state.applyFilter[item.code].indexOf(item.value) != -1 : false} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )
      })

      //const selectedCupSizeEle = document.querySelector('input[name=CUPSIZ]:checked');
      const selectedCupSizeEle = null;
      let selectedCupSizeValue = null;
      if (selectedCupSizeEle !== null) {
        selectedCupSizeValue = selectedCupSizeEle.value;
      }

      bandFilter = bandSizes.map((item, index) => {
        return (
          <View key={`${index}_subfilters_${item}`} >
            <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(item, index) }}>
              <CheckBox onClick={() => { this.onCheckboxClick(item, index) }}
                isChecked={this.state.applyFilter[item.code] != undefined ? this.state.applyFilter[item.code].indexOf(item.value) != -1 : false} />
              <Text>{item}</Text>
            </TouchableOpacity>
          </View>
        )
      })

      let selectedBandSize = this.state.selectedBandSize;
      let dynamicCupSizes;
      if (selectedBandSize === null) {
        dynamicCupSizes = cupSizes;
      } else {
        dynamicCupSizes = cupBandSizes[selectedBandSize];
      }

      cupFilter = dynamicCupSizes.map((item, index) => {
        return (
          <View key={`${index}_subfilters_${item}`} >
            <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(item, index) }}>
              <CheckBox onClick={() => { this.onCheckboxClick(item, index) }}
                isChecked={this.state.applyFilter[item.code] != undefined ? this.state.applyFilter[item.code].indexOf(item.value) != -1 : false} />
              <Text>{item}</Text>
            </TouchableOpacity>
          </View>
        )
      })

      if (bandSizes.length > 0) {
        _bandlabel = <View><Text style={{ fontWeight: 'bold' }}><Text>Band Size</Text></Text><View id="main-BANDSIZ">{bandFilter}</View></View>
      }

      if (cupSizes.length > 0) {
        _cuplabel = <View><Text style={{ fontWeight: 'bold' }}><Text>Cup Size</Text></Text><View id="main-CUPSIZ" contentEditable='true' ref='cupFilter'>{cupFilter}</View></View>
      }

      return [sizeFilter, _bandlabel, _cuplabel];

    } else {
      prdFilter = productFilters.map((item, index) => {
        if (item) {
          id = item.code + "_" + item.value;
          if (availableProductsArr.length > 0) {
            let iFilterType = _.pluck(availableProductsArr, item.code);
            let availableFilterItems = _.uniq(iFilterType);

            if (availableFilterItems.includes(item.value)) {
              return (
                <View key={`${index}_subfilters_${item}`} >
                  <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(item, index) }}>
                    <CheckBox onClick={() => { this.onCheckboxClick(item, index) }}
                      isChecked={this.state.applyFilter[item.code] != undefined ? this.state.applyFilter[item.code].indexOf(item.value) != -1 : false} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )
          } 
          } else {
            return (
              <View key={`${index}_subfilters_${item}`} >
                <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(item, index) }}>
                  <CheckBox onClick={() => { this.onCheckboxClick(item, index) }}
                    isChecked={this.state.applyFilter[item.code] != undefined ? this.state.applyFilter[item.code].indexOf(item.value) != -1 : false} />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )
          }
        }
      })
      return prdFilter;
    }

  }


  _doPart1Filter = (selectedBandSize = null, selectedCupSizeValue = null) => {

    this.setState({ selectedBandSize: selectedBandSize });
    let checks;
    if (selectedCupSizeValue !== null) {
      let item = 'Size';
      if (this.props.productFilters) {
        this.props.productFilters[item].map((filterItem) => {
          if (this.props.filters[this.props.filterKey[item]]) {
            this.props.filters[this.props.filterKey[item]].map((j, index) => {
              if (j === filterItem.value.toString()) {
                this.props.getFilteredData(filterItem);
              }
            })
          }
        })
      }

      //checks = document.querySelectorAll('#main-CUPSIZ' + ' input[type="checkbox"]');
      for (let i = 0; i < checks.length; ++i) { checks[i].checked = false; }
    }
  }


  _doPart2Filter = (e, sizeFilters, selectedCupSize = null) => {

    if (selectedCupSize === null) {
      return false;
    }

    //const selectedBandSizeEle = document.querySelector('input[name=BANDSIZ]:checked');
    if (selectedBandSizeEle === null) {
      alert('Please select Band size first');

      //let checks = document.querySelectorAll('#main-CUPSIZ' + ' input[type="checkbox"]');
      for (var i = 0; i < checks.length; ++i) { checks[i].checked = false; }

      return false;
    }

    const selectedBandSize = selectedBandSizeEle.value;
    if ((selectedCupSize !== null) && (selectedCupSize !== "undefined")) {
      const selectedBraSize = selectedBandSize + selectedCupSize;
      let selectedBraItem = sizeFilters.find(o => o.name === selectedBraSize);
      if (selectedBraItem !== null) {
        this.props.getFilteredData(selectedBraItem);
      }
    }
  }


  _getBraSizeFilters = (items, sizeType) => {
    let sizeNames, simpleSizes, nonSimpleSizes, bandSizes, cupSizes, cupBandSizes, uniqBandSizes, uniqCupSizes;

    sizeNames = [];
    simpleSizes = [];
    bandSizes = [];
    cupSizes = [];
    uniqBandSizes = [];
    cupBandSizes = {};

    items.map((item) => {
      sizeNames.push(item.name);
    })

    simpleSizes = sizeNames.filter(sizeName => sizeName.length < 5);
    nonSimpleSizes = sizeNames.filter(sizeName => sizeName.length > 5);

    nonSimpleSizes.map((nonSimpleSize) => {
      let bandSize = nonSimpleSize.substring(0, 5);
      let cupSize = nonSimpleSize.substring(5);
      bandSizes.push(bandSize);
      cupSizes.push(cupSize);

      if ((bandSizes.includes(bandSize))) {
        if ((cupBandSizes[bandSize] !== undefined) && (cupBandSizes[bandSize].length > 0)) {
          cupBandSizes[bandSize].push(cupSize);
        } else {
          cupBandSizes[bandSize] = [];
          cupBandSizes[bandSize].push(cupSize);
        }
      }

    })

    uniqBandSizes = [...new Set(bandSizes)];
    uniqCupSizes = [...new Set(cupSizes)];

    if (sizeType === 'simple') {
      return simpleSizes;
    } else if (sizeType === 'bandSizes') {
      return uniqBandSizes;
    } else if (sizeType === 'cupSizes') {
      return uniqCupSizes;
    } else if (sizeType === 'cupBandSizes') {
      return cupBandSizes;
    }
  }


  _getBraSimpleSizeFilters = (items, simpleSizes) => {

    let simpleSizesArray, simpleSizesFilter;
    simpleSizesArray = items.filter(f => simpleSizes.includes(f.name));

    simpleSizesArray.map((item, index) => {
      return (
        <View key={`${index}_subfilters_${item}`} >
          <TouchableOpacity style={{ flexDirection: "row", margin: scale(2), alignItems: 'center' }} onPress={() => { this.onCheckboxClick(data, index) }}>
            <CheckBox onClick={() => { this.onCheckboxClick(data, index) }}
              isChecked={this.state.applyFilter[data.code] != undefined ? this.state.applyFilter[data.code].indexOf(data.value) != -1 : false} />
            <Text>{data.name}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }


  _getAvailableProducts = (filterProductList) => {
    let availableProductsArr = [];
    Object.keys(filterProductList).map((key, index) => {
      let filterProductDetail = this.getPrdInfo(filterProductList[key].json);
      if ((filterProductDetail !== null) && (filterProductDetail.length > 0)) {
        availableProductsArr.push(...filterProductDetail);
      }

    }
    );
    if (availableProductsArr.length > 0) {
      availableProductsArr.sort(function (a, b) {
        if (a.color && b.color) {
          var nameA = a.color.toLowerCase(), nameB = b.color.toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        } else {
          return 0
        }
      })
    }


    //Get Unique Elements
    availableProductsArr = Array.from(new Set(availableProductsArr.map(JSON.stringify))).map(JSON.parse);
    return availableProductsArr;
  }


  getPrdInfo = (prdJson) => {

    let item = prdJson;
    let prdarr;
    prdarr = [];
    let itemFiltersInfo = {
      "subcategory_desc": Object.keys(item.filtersdata['subcategory_desc'])[0],
      "collections": Object.keys(item.filtersdata['collections'])[0],
      "styles": Object.keys(item.filtersdata['styles'])[0],
      "fabrics": Object.keys(item.filtersdata['fabrics'])[0],
    }

    if (item.simpleproducts === undefined) {
      let smplPrdInfo = {
        ...itemFiltersInfo
      }

      prdarr.push(smplPrdInfo);
      return prdarr;
    }

    if (item.simpleproducts.length === 0) {
      let smplPrdInfo = {
        ...itemFiltersInfo
      }

      prdarr.push(smplPrdInfo);
      return prdarr;
    }


    Object.values(item.simpleproducts).map((simpleproduct, index) => {
      let smpl_color, smpl_size;
      if (('color' in simpleproduct) && ((simpleproduct.color !== undefined) && (simpleproduct.color !== null))) {
        smpl_color = simpleproduct.color.option_value;
      }
      if (('size' in simpleproduct) && (simpleproduct.size !== undefined)) {
        smpl_size = simpleproduct.size.option_value;
      }

      if (smpl_color && smpl_size) {
        let smplPrdInfo = {
          color: smpl_color,
          size: smpl_size,
          ...itemFiltersInfo
        }

        prdarr.push(smplPrdInfo);
      }
    });
    return prdarr;
  }

  // setToInitial() {
  //   const { productListData, Filters } = this.props;
  //   this.props.classObj.setState({ productListData: productListData, showFilter: false,  });
  //   this.setState({ applyFilter: Filters });
  // }

  render() {
    const { is_bra, Filters, itemName } = this.props;

    //console.log(itemName, 'itemName Filters Filters Filters', Filters)
    return (
      <View style={{ marginTop: getStatusBarHeight(true) }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row', padding: scale(16), justifyContent: 'space-between',
          marginBottom: scale(5), backgroundColor: '#0D943F',
        }}>
          <View>
            <Text style={{ fontSize: scale(20) }}>Filters</Text>
          </View>
          <View>
            <TouchableOpacity style={{ borderColor: "#fff", borderRadius: scale(5), borderWidth: 2 }} onPress={() => { this.props.classObj.setState({ showFilter: false }) }}>
              <Text style={{ fontSize: scale(15), marginHorizontal: scale(10), marginVertical: scale(5) }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, height: height-scale(100) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
            
              {Object.keys(Filters).map((item, index) => {
                if(Filters[item].length > 1)  {
                return (<>
                  <TouchableOpacity key={`${index}_main_name`} style={styles.listview}
                    onPress={() => {
                      let filterCollapse = this.state.filterCollapse;
                      if (this.state.filterCollapse[item]) {
                        filterCollapse[item] = false;
                        this.setState({ filterCollapse })
                      } else {
                        filterCollapse[item] = true;
                        this.setState({ filterCollapse })
                      }
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <Text>{item}</Text>
                    </View>
                    <View>
                      <Ionicons name={this.state.filterCollapse[item] == undefined || !this.state.filterCollapse[item] ? "plus" : "minus"} color="black" size={scale(22)} />
                    </View>
                  </TouchableOpacity>

                  <Collapsible collapsed={!this.state.filterCollapse[item]} key={`${index}_colla`}>
                    <View style={{ marginVertical: scale(10) }}>
                      {this.getFilters(is_bra, item, Filters[item])}
                      {/* {Filters[item].map((data, index) => {
                                        if(data){
                                        return(<View key={`${index}_subfilters_${item}`} >
                                           <TouchableOpacity style={{ flexDirection: "row", margin: scale(2) , alignItems: 'center'}} onPress={()=>{ this.onCheckboxClick(data, index)}}>
                                            <CheckBox onClick={()=>{ this.onCheckboxClick(data, index)}}
                                            isChecked={this.state.applyFilter[data.code] != undefined ? this.state.applyFilter[data.code].indexOf(data.value) != -1 : false}/>
                                            <Text>{data.name}</Text>
                                            </TouchableOpacity>
                                        </View>)  
                                        }  
                                    })} */}
                    </View>
                  </Collapsible>
                </>)
                }
              })}
            </ScrollView>
        </View>
        </ScrollView>
      </View>
    )
  }

}



export default Filters;

const styles = StyleSheet.create({
  listview:
  {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    marginTop: scale(5),
    flexDirection: 'row',
    backgroundColor: '#0D943F',
    justifyContent: 'space-between'

  }
})