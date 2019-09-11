import React, { Component } from 'react';
import {
    View, Image, ActivityIndicator, TouchableOpacity, FlatList, Platform, Text, ScrollView
} from 'react-native';
import styles from './Style'
import I18n from '../../localization/index';
import { scale, verticalScale } from '../../utils/Scale';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Video from 'react-native-video-controls';
import { Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { height, width } = Dimensions.get('window');

class ImagesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productListData: {},
            noDataMessage: null,
            scrolledIndex: 10,
            imageSelected: '',
            thumbnailImages: '',
            currentIndex: 0,
        }

    }

    componentDidMount() {
        const lastProps = this.props.navigation.state.params;
        this.setState({imageSelected : lastProps.image, thumbnailImages: lastProps.thumbnailImages});
    }

    componentWillMount() {
        
    }

    renderProductImageItem = ({ item , index}) => {
        return (    
            <View style={{ paddingBottom: scale(10), paddingRight:scale(10), flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { this.selectImageItem(item, index) }}>
                    <Image style={[styles.productImagesList, this.state.currentIndex == index+1 ? { borderColor: '#f693b9', marginRight: scale(0)} : {marginRight: scale(0)}]} source={{ uri: item}} />
                </TouchableOpacity>
            </View>
        )
    }

    selectImageItem(item, index) {
        let image_url = item;
        this.setState({ imageSelected: image_url, currentIndex: index+1 });
    }

    closeImg(){
        this.props.navigation.goBack();
    }

    _renderZoomImageItem = (item, index) => {
        return (
            <View style={{marginTop:scale(0)}}>
                <Image style={{height:scale(490), width: scale(350)}} source={{ uri: item }} />
            </View>
        )
    }

    

    render() {
        const { imageSelected, thumbnailImages} = this.state;
        return (

            <View style={styles.pageViewStyle}>
                {!imageSelected.includes('.mp4') ?
                    <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {imageSelected.length > 0 ?
                        <View>
                            <View style={{ marginTop: getStatusBarHeight(true), top:scale(10), right:scale(20) ,alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={() => this.closeImg()}>
                                    <MaterialIcons
                                        name='close-circle-outline'
                                        onPress={() => this.closeImg()}
                                        size={scale(35)}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{alignItems:'center',marginTop:scale(20)}}>
                                <Image style={{height:scale(490), width: scale(350)}} source={{ uri: imageSelected }} />
                            </View> */}
                            <View style={{flexDirection:'column'}}>
                            <View style={{top: Platform.OS == 'ios' ? scale(20) : scale(10) ,height: '82%', width: '100%',left:scale(10)}}>
                                <Swiper style={{height:scale(500)}} 
                                    autoplay={false}
                                    showsPagination={false}
                                    index={this.state.currentIndex}>
                                    {(thumbnailImages).map(this._renderZoomImageItem)}
                                </Swiper>
                            </View>
                            <View style={{bottom: Platform.OS == 'ios' ? scale(20) : scale(20),alignItems: 'center'}}>
                                <FlatList
                                    data={thumbnailImages}
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    renderItem={this.renderProductImageItem}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    style={I18n.locale == 'ar' ? { } : {}}
                                    //showsVerticalScrollIndicator= {false}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            </View>
                        </View> :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                    </ScrollView>
                </View> : 
                <View> 
                    <View style={{ marginTop: getStatusBarHeight(true), top:scale(10), right:scale(20) ,alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.closeImg()}>
                            <MaterialIcons
                                name='close-circle-outline'
                                onPress={() => this.closeImg()}
                                size={scale(35)}
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View  style={{alignItems: 'center',justifyContent:'center' , marginTop:scale(10), height:height- scale(120), width: width- scale(20)}}> 
                        <Video source={{uri: imageSelected}}
                            ref={(ref) => {
                                this.player = ref
                            }}                                      
                            onBuffer={this.onBuffer} 
                            onError={this.videoError} 
                            // paused={true}
                            autoplay={true}
                            repeat={true}
                        /> 
                    </View>
                </View>}
            </View>
        );
    }
}

export default ImagesScreen;
