import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import * as COLORS from '../../utils/Color'
import { scale, verticalScale } from '../../utils/Scale';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: scale(16),
    },
    orderProduct: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#c4c4c4',
    },
    imageContainer: {
        // flex: 1,
        // //justifyContent: 'flex-start',
        // //alignItems: 'stretch',
        // padding: scale(5),
        // width: '30%',
        // left: scale(-22),
        // zIndex: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingBottom: scale(5),
        width: '40%'
    },
    orderBlock: {
        paddingVertical: verticalScale(10), 
        paddingHorizontal: scale(7), 
        minHeight: scale(120),
    },
    modalIcon:{
        //position: 'absolute',
        //right: scale(25),
        //top: scale(14),
        width: '33%', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        //borderWidth: scale(2),
        //borderColor: '#f693b9',
        padding: scale(5),
        //zIndex: 1,
        },
        box: {
            // height: scale(10),
            // width: scale(10),
            // borderColor: '#fafafa',
            // borderWidth: scale(1),
            // justifyContent: 'center',
            width: '34%', 
            height: scale(40),
            width: scale(40),
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            borderWidth: scale(2),
            borderColor: '#f693b9',
            padding: scale(5),
            margin: scale(5),
            zIndex: 1,
        },
        price: {
            color: COLORS.BRAND_DARKEST, 
            textAlign: 'center',
            fontSize: scale(20)
        },
        alignRow: {
            width: '100%', 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            borderBottomColor: 'black',
            borderBottomWidth: scale(1)
        },
        orderBlockMargin: {
            backgroundColor: '#f4f4f4', 
            marginTop: scale(15),
            paddingHorizontal: scale(20),
        },
        orderBlockHeading: {
            paddingHorizontal: scale(15), 
            fontSize: scale(25),
            fontWeight: 'bold',
        },
        scrollImageSize: {
            width :width/2,
            height: width/2,
            resizeMode: 'contain',
            
          },
  youMayText: {
    fontSize: scale(20)
  },
  emptyContainer: {
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(30),
  },
  subTotal: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: verticalScale(10)
  },
  Nprice: {
    color: COLORS.BRAND_DARKEST, 
    textAlign: 'center',
    fontSize: scale(20),
    fontWeight: 'bold',
},
Wprice: {
    color: COLORS.BRAND_DARKEST, 
    textAlign: 'center',
    fontSize: scale(20),
    textDecorationLine: 'line-through'
},
backButton: {
    width: '16%', 
    top: scale(10), 
    //justifyContent: 'space-between', 
    alignItems: 'center',
    borderColor: '#d686a4',
    borderWidth: scale(1),
    height: scale(45),
},
checkOutButton: {
    backgroundColor: '#f693b9', 
    width: '84%', 
    height: scale(45),
    borderColor: '#d686a4',
    borderWidth: scale(1),
},
checkOutButtonTxt: {
    textAlign: 'center', 
    top: scale(10), 
    fontSize: scale(20), 
    color: '#fff'
},
outOfStockBox: {
    paddingVertical: verticalScale(15),
    marginBottom: scale(15),
    borderColor: COLORS.BASE_BORDER,
    borderWidth: scale(1),
},
bottomBdr: {
    borderBottomColor: COLORS.BASE_BORDER,
    borderBottomWidth: scale(1),   
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
},
outOfStockImageContainer: {
    flex: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'stretch',
    padding: scale(5),
    //width: '30%',
    left: scale(-15),
    zIndex: 1,
    //top: scale()
},
outOfStockOther: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
},
outOfStockRemoveButton: {
    height: scale(23), 
    width: '100%', 
    backgroundColor: '#e2e2e2', 
    borderColor: '#e2e2e2',
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    borderRadius: scale(20)
},
itemText: {
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: scale(5),
    fontFamily: 'VAGRoundedELC-Light'
  },
  itemText1: {
    fontSize: scale(16),
    textAlign: 'center',
    paddingBottom: scale(5)
  },
  itemText2: {
    fontSize: scale(18),
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: scale(5),
    color: 'red'
  },
  amountText: {
    fontSize: scale(16),
    color: 'red'
  },
  itemText3: {
    fontSize: scale(12),
    fontWeight:'100',
    color:'#fff'
  },
  similar_products: {
    padding: scale(15), 
    marginTop: scale(15), 
    marginBottom: scale(15), 
    backgroundColor: '#f4f4f4', 
    paddingHorizontal: scale(20)
  }
});
