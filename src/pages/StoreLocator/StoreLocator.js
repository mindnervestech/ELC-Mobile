import React, { Component } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    ActivityIndicator
} from 'react-native';
import styles from './Style';
import { connect } from 'react-redux';
import I18n from '../../localization/index';
import Footer from '../../common/footer';
import HeaderComm from '../../common/header/header';
import COMMONSTYLE from '../../utils/Style';
import * as COLORS from '../../utils/Color';
import { scale, verticalScale } from '../../utils/Scale';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getStoreLocator } from '../../actions/StoreLocatorAction';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome5';


class StoreLocator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultCountry: this.props.comesFrom != 'delivery' ? this.props.navigation.state.params.country : 'United Arab Emirates',
            defaultCity: '-- All Cities --',
            storeLocatorData: {},
            country: ['United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Bahrain', 'Qatar', 'Oman', 'Morocco'],
            uniqueCities: [],
            markers: [],
            enableScrollViewScroll: true,
            mapCoordinate: null,
            listViewFlag: true,
            markerIndex: this.props.comesFrom === 'delivery' ? this.props.markerIndexTick : null,
            checkStateUpdate: false,
            focusedLocation: {
                lattitude: 25.2333562,
                longitude: 55.307943,
                city: 'nothing',
            },
        }
    }

    async componentWillMount(props) {
        var obj = 'country_id=' + '' + '&city='
        this.props.getStoreLocator(obj);
        await this.getLocationHandler();
    }

    componentWillReceiveProps(nextprops) {
        const { defaultCountry } = this.state
        if (nextprops.storeLocatorStatus) {
            this.setState({ storeLocatorData: nextprops.storeLocatorData }, () => {
                this._onSelectCountry(0, defaultCountry);
            });
        }
    }

    haversine_distance(coords1, coords2) {

        function toRad(x) {
            return x * Math.PI / 180;
       }
   
     var dLat = toRad(coords2.latitude - coords1.latitude);
     var dLon = toRad(coords2.longitude - coords1.longitude)
   
     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(toRad(coords1.latitude)) * 
             Math.cos(toRad(coords2.latitude)) *
             Math.sin(dLon / 2) * Math.sin(dLon / 2);
   
     return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   }

    generateLatLng(countryFilter) {
        const { focusedLocation } = this.state;
        for (var i = 0; i < countryFilter.length; i++) {
            var asd = { latitude: parseFloat(countryFilter[i].lattitude), longitude: parseFloat(countryFilter[i].longitude) };
            //latlng.push(this.haversine_distance(latlng[0], destination[0]))
            countryFilter[i].distance = this.haversine_distance(asd, focusedLocation);
        }
        //console.log('this is countryFilter', countryFilter);
        countryFilter.sort(function(a, b){
            return a.distance-b.distance
        })
        //console.log('this is countryFilter after sorting', countryFilter);
        //console.log('Point A', latlng[0]);
        //console.log('Point B', destination[0]);
        //console.log('this is distance from there to here', this.haversine_distance(latlng[0], destination[0]));
        // console.log('this is the lat lng arrray for sending in api', latlng);
        // //var distination = { lat: 18.504533, lng: 73.9051906};
        // var distanceService = new google.maps.DistanceMatrixService();
        // distanceService.getDistanceMatrix({
        //     origins: [latlng],
        //     destinations: [distination],
        //     travelMode: google.maps.TravelMode.WALKING,
        //     unitSystem: google.maps.UnitSystem.METRIC,
        //     durationInTraffic: true,
        //     avoidHighways: false,
        //     avoidTolls: false
        // },
        //     function (response, status) {
        //         console.log('this is status', status);
        //         console.log('this is response:', response);
        //         if (status !== google.maps.DistanceMatrixStatus.OK) {
        //             console.log('Error:', status);
        //         } else {
        //             console.log(response);
        //             // $("#distance").text(response.rows[0].elements[0].distance.text).show();
        //             // $("#duration").text(response.rows[0].elements[0].duration.text).show();
        //         }
        //     });
    }

    // shouldComponentUpdate(nextprops) {
    //     console.log('this is shoudupdte');
    //     debugger;
    // }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            }
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //console.log(">>>>>>>>", position.coords.latitude);
                //console.log(">>>>>>>>", position.coords.longitude);
                const coordsEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }
                };
                //this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude, });
                //this.pickLocationHandler(coordsEvent);
                this.setState({ focusedLocation: { lattitude: position.coords.latitude, longitude: position.coords.longitude, city: 'Nothing' } });

                // var obj = {
                //     latitude: position.coords.latitude, longitude: position.coords.longitude,
                //     latitudeDelta: 0.01, longitudeDelta: 0.01
                // };
                // this.setState({ marker: {latitude: position.coords.latitude, longitude: position.coords.longitude}, mapCoordinate: obj })
            }
            ,
            (err) => console.log(err),
            { enableHighAccuracy: false, timeout: 8000 }
        );
    }

    changeLang = (lang) => {
        if (lang === 'en') {
            I18n.locale = 'en';
            this.setState({ text: 'en' })
        } else {
            I18n.locale = 'ar';
            this.setState({ text: 'ar' })
        }
    }

    _onSelectCountry(index, value) {
        const { comesFrom } = this.props;
        const { storeLocatorData, focusedLocation } = this.state
        comesFrom != 'delivery' && this._citiydropdown.select(-1);
        this.googlePlacesAutocomplete._handleChangeText('')
        this.setState({ defaultCountry: value });
        if (Object.keys(storeLocatorData).length > 0) {
            const countryFilter = storeLocatorData.filter(obj => obj.country.toUpperCase() == value.toUpperCase());
            var obj = {
                latitude: parseFloat(countryFilter[0].lattitude), longitude: parseFloat(countryFilter[0].longitude),
                latitudeDelta: 0.1, longitudeDelta: 0.1
            };
            setTimeout(() => {
                this.map.animateToRegion({
                    latitude: parseFloat(countryFilter[0].lattitude), longitude: parseFloat(countryFilter[0].longitude),
                    latitudeDelta: 10, longitudeDelta: 10
                })
            }, 10);
            const uniqueCities = [...new Set(countryFilter.map(x => x.city))];
            this.generateLatLng(countryFilter);
            countryFilter.unshift(focusedLocation);
            this.setState({ markers: countryFilter, mapCoordinate: obj, markerIndex: null })
            //  const uniqueCities = storeLocatorData.filter(obj => obj.country == value)
            this.setState({ uniqueCities: uniqueCities })
        }
    }
    _onSelectCity(index, value) {
        const { storeLocatorData, defaultCountry } = this.state
        this.googlePlacesAutocomplete._handleChangeText('')
        if (Object.keys(storeLocatorData).length > 0) {
            const countryCityFilter = storeLocatorData.filter(obj => (obj.country.toUpperCase() == defaultCountry.toUpperCase() && obj.city == value));
            setTimeout(() => {
                this.map.animateToRegion({
                    latitude: parseFloat(countryCityFilter[0].lattitude), longitude: parseFloat(countryCityFilter[0].longitude),
                    latitudeDelta: 10, longitudeDelta: 10
                })
                this.setState({ markers: countryCityFilter, markerIndex: null })
            }, 100);
        }
    }

    _onSelectMarker(item, index) {
        const { comesFrom } = this.props

        // var obj = {
        //     latitude: parseFloat(item.lattitude), longitude: parseFloat(item.longitude),
        //     latitudeDelta: 0.1, longitudeDelta: 0.1
        // };
        setTimeout(() => {
            this.map.animateToRegion({
                latitude: parseFloat(item.lattitude), longitude: parseFloat(item.longitude),
                latitudeDelta: 0.01, longitudeDelta: 0.01
            })
        }, 10);
        this.setState({ markerIndex: index });
        if (comesFrom == 'delivery') {
            this.props.classObj.setState({ nayomi_store_id: item.id, markerIndexTick: index });
        }
    }


    renderOptionItem = ({ item, index }) => {
        const { markerIndex, mapCoordinate } = this.state;
        if (index === 0) {
            return (<View />)
        } else {
            return (
                <TouchableOpacity style={{ flex: 1, padding: scale(16), borderBottomWidth: 1, borderColor: 'white' }} onPress={() => this._onSelectMarker(item, index)}>
                    <View style={{ flexDirection: 'row' }}>
                        {index == markerIndex ? <View style={{ flexDirection: 'row' }}><View style={styles.breadcrumbCircle}>
                            <MaterialIcons
                                name='check'
                                onPress={() => { this.setState({ showResetPass: false }) }}
                                size={scale(15)}
                                color={'white'}
                            />
                        </View><Text>{'  '}</Text></View> : <View />}
                        <Text style={{ fontSize: scale(16), fontWeight: '500' }}>{item.name}</Text>
                    </View>
                    <Text style={{ paddingTop: scale(10), fontSize: scale(14), fontFamily: 'NotoSans-Italic' }}>{item.address}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: scale(10) }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Linking.openURL(`https://www.google.com/maps?daddr=@${item.landmark}`)}>
                            <Icon name="location-arrow" size={scale(20)} color={'lightgrey'} />
                            <Text style={{ color: '#999999' }}>{I18n.t('direction')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: scale(15) }} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                            <MaterialIcons name="phone" color={'lightgrey'} size={scale(20)} />
                            <Text style={{ color: '#999999' }}>{'   '}{item.phone}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _onSelectLocation(data, details) {
        let latitude = details.geometry.location.lat;
        let longitude = details.geometry.location.lng;
        setTimeout(() => {
            this.map.animateToRegion({
                latitude: latitude, longitude: longitude,
                latitudeDelta: 0.1, longitudeDelta: 0.1
            })
        }, 10);

        this.setState({ listViewFlag: false });

    }

    isMarkerIndexChanged() {
        const { checkStateUpdate, markerIndex } = this.state;
        const { markerIndexTick } = this.props;
        if (markerIndexTick !== null) {
            if (markerIndexTick !== markerIndex) {
                this.setState({ markerIndex: markerIndexTick })
            }
        }
    }

    render() {
        const { country, uniqueCities, listViewFlag, defaultCountry, defaultCity, mapCoordinate, markers, markerIndex, checkStateUpdate } = this.state
        const { comesFrom, markerIndexTick } = this.props;
        this.isMarkerIndexChanged();
        return (
            <View style={{ flex: 1 }}>
                {comesFrom != 'delivery' ? <HeaderComm changeLang={this.changeLang} navigation={this.props.navigation} onRef={instance => { this.instance = instance; }} classObj={this} {...this.props}/> : <View />}
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <View style={{ paddingHorizontal: scale(16) }}>
                        {comesFrom != 'delivery' ? <View><View style={COMMONSTYLE.countryModalMain}>
                            <ModalDropdown
                                ref={el => this._countryropdown = el}
                                options={country}
                                style={COMMONSTYLE.modalStyle}
                                dropdownStyle={COMMONSTYLE.modalDropdownStyle}
                                dropdownTextStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                                textStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                                // defaultIndex={0}
                                defaultValue={defaultCountry}
                                onSelect={(index, data) => this._onSelectCountry(index, data)}
                            />
                            <TouchableOpacity style={COMMONSTYLE.modalIcon} onPress={() => { this._countryropdown && this._countryropdown.show(); }}>
                                <MaterialIcons
                                    name="chevron-down"
                                    color={COLORS.BRAND_DARKEST}
                                    size={scale(30)}
                                />
                            </TouchableOpacity>
                        </View>
                            <View style={COMMONSTYLE.countryModalMain}>
                                <ModalDropdown
                                    ref={el => this._citiydropdown = el}
                                    options={uniqueCities}
                                    style={COMMONSTYLE.modalStyle}
                                    dropdownStyle={COMMONSTYLE.modalDropdownStyle}
                                    dropdownTextStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                                    textStyle={COMMONSTYLE.modalTextDropdownTextStyle}
                                    //defaultIndex={0}
                                    defaultValue={defaultCity}
                                    onSelect={(index, data) => this._onSelectCity(index, data)}
                                />
                                <TouchableOpacity style={COMMONSTYLE.modalIcon} onPress={() => { this._citiydropdown && this._citiydropdown.show(); }}>
                                    <MaterialIcons
                                        name="chevron-down"
                                        color={COLORS.BRAND_DARKEST}
                                        size={scale(30)}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View> : <View style={{ paddingTop: scale(20) }} />}
                        <View style={styles.container}>
                            <GooglePlacesAutocomplete
                                ref={c => this.googlePlacesAutocomplete = c}
                                placeholder='Search'
                                minLength={1} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                listViewDisplayed={listViewFlag}    // true/false/undefined
                                fetchDetails={true}
                                renderDescription={row => row.description} // custom description render
                                onPress={(data, details = null) => this._onSelectLocation(data, details)}
                                getDefaultValue={() => ''}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyAi0iRRQYErNXeAa6tZNgsevHWr6wbT-Nc',
                                    language: 'en', // language of the results
                                    types: '(cities)' // default: 'geocode'
                                }}
                                styles={{
                                    container: {
                                        backgroundColor: 'white',
                                        borderWidth: 0.5,
                                        borderColor: 'grey',
                                    },
                                    textInputContainer: {
                                        width: '100%',
                                        backgroundColor: 'white',
                                        alignItems: 'center'
                                    },
                                    description: {
                                        fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    }
                                }}
                                // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                // currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    type: 'cafe'
                                }}

                                GooglePlacesDetailsQuery={{
                                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                    fields: 'formatted_address',
                                }}

                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                //   predefinedPlaces={[homePlace, workPlace]}

                                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                // renderLeftButton={()  => <Image source={require('')} />}
                                renderRightButton={() => <MaterialIcons
                                    name={"magnify"}
                                    color={'grey'}
                                    size={scale(30)}
                                />}
                            />
                            {/* </View>
                        <View style={styles.container}> */}
                            {mapCoordinate ? <MapView style={styles.map}
                                ref={map => { this.map = map }}
                                initialRegion={mapCoordinate}
                                zoomEnabled={true}
                                minZoomLevel={2}
                                maxZoomLevel={30}
                            >
                                {markers.map((marker, index) => (
                                    <Marker key={`marker${index}`} coordinate={{
                                        latitude: parseFloat(marker.lattitude),
                                        longitude: parseFloat(marker.longitude),
                                    }}
                                        title={marker.name}
                                        subtitle={marker.address + "," + marker.country + "," + marker.country_id}
                                    >
                                        <Image style={{ flex: 1, width: 50, height: 100 }} resizeMode='contain' source={{ uri: "https://storage.googleapis.com/nay/icons/map-marker.png" }} />
                                    </Marker>
                                ))}
                            </MapView> : <View />}
                        </View>
                        <View style={{ paddingVertical: verticalScale(20), height: verticalScale(400), paddingHorizontal: verticalScale(20) }}>
                            <View style={{ backgroundColor: COLORS.BASE_WHITE, borderWidth: 1, borderColor: 'lightgrey' }}>
                                <FlatList
                                    data={markers}
                                    renderItem={this.renderOptionItem}
                                    showsVerticalScrollIndicator={true}
                                    extraData={this.state}
                                    keyExtractor={(item, index) => index.toString()}
                                    nestedScrollEnabled={true}

                                />

                            </View>
                        </View>
                    </View>
                    {comesFrom != 'delivery' ? <Footer {...this.props} /> : <View />}
                </ScrollView>

            </View>
        );
    }
}

function mapStateToProps(state) {
    const { StoreLocatorReducer } = state;
    return {
        storeLocatorData: StoreLocatorReducer.storeLocatorData,
        storeLocatorStatus: StoreLocatorReducer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStoreLocator: (obj) => {
            dispatch(getStoreLocator(obj))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreLocator);
