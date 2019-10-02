import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import ReactNative from 'react-native';
import SplashScreen from './src/pages/SplashScreen/index'
import HomeScreen from './src/pages/Home/Home'
import HomeOffersScreen from './src/pages/Home/HomeOffers'
import HelpScreen from './src/pages/Help/Help';
import FAQScreen from './src/pages/Help/FAQ';
import ReturnPolicyScreen from './src/pages/Help/ReturnPolicy';
import PrivacyPolicyScreen from './src/pages/Help/PrivacyPolicy';
import PaymentMethodsScreen from './src/pages/Help/PaymentMethods';
import TermsandConditionsScreen from './src/pages/Help/TermsandConditions';
import DeliveryPolicyScreen from './src/pages/Help/DeliveryPolicy';
import ContactUsScreen from './src/pages/Help/ContactUs';
import AboutUsScreen from './src/pages/Help/AboutUs'; 
import SignInScreen from './src/pages/SignIn/SignIn';
import SignUpScreen from './src/pages/SignUp/SignUp';
import AmirahSignUpScreen from './src/pages/SignUp/AmirahSignUp';
import ProductListScreen from './src/pages/productList/index';
import ProfileScreen from './src/pages/Profile/Profile';
import DrawerContent from './src/common/menu';
import LanguagePopUpScreen from './src/pages/LanguagePopUpAtStart/LanguagePopAtStart';
import ProductDetailScreen from './src/pages/productList/ProductDetail';
import StoreLocatorScreen from './src/pages/StoreLocator/StoreLocator';
import OrderViewScreen from './src/pages/Order/OrderView';
import CartScreen from './src/pages/Cart/Cart';
import CheckoutScreen from './src/pages/Checkout/index';
import FiltersScreen from './src/pages/Filters';
import ImagesScreen from './src/pages/productList/ImagesScreen';
import OrderConfirmationScreen from './src/pages/Checkout/OrderConfirmation';
import confirmationScreen from './src/pages/Checkout/confirmation.1';

import { scale, verticalScale } from './src/utils/Scale';
import EditAddress  from './src/pages/Profile/EditAddress';


const AppNavigation = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  HomeOffers: { screen: HomeOffersScreen, navigationOptions: { header: null } },
  Profile: { screen: ProfileScreen, navigationOptions: { header: null }}, 
  EditAddress: { screen: EditAddress, navigationOptions: { header: null }},
  Help: { screen: HelpScreen, navigationOptions: { header: null }},
  FAQ: { screen: FAQScreen, navigationOptions: { header: null } },
  ReturnPolicy : { screen: ReturnPolicyScreen, navigationOptions: { header: null }  },
  PrivacyPolicy : { screen: PrivacyPolicyScreen, navigationOptions: { header: null } },
  PaymentMethods : { screen: PaymentMethodsScreen, navigationOptions: { header: null } },
  TermsandConditions : { screen: TermsandConditionsScreen, navigationOptions: { header: null }},
  DeliveryPolicy: { screen: DeliveryPolicyScreen, navigationOptions: { header: null } },
  AboutUs: { screen: AboutUsScreen, navigationOptions: { header: null } },
  ContactUs: { screen: ContactUsScreen, navigationOptions: { header: null }},
  SignIn: { screen: SignInScreen, navigationOptions: { header: null } },
  SignUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  AmirahSignUp: { screen: AmirahSignUpScreen, navigationOptions: { header: null } },
  ProductList: { screen: ProductListScreen, navigationOptions: { header: null } },
  PriductDetail:{screen: ProductDetailScreen, navigationOptions:{header:null}},
  LanguagePopUp: { screen: LanguagePopUpScreen, navigationOptions: { header: null } },
  StoreLocator: { screen: StoreLocatorScreen, navigationOptions: { header: null } },
  OrderView: { screen: OrderViewScreen, navigationOptions: { header: null } },
  Cart: { screen: CartScreen, navigationOptions: { header: null } },
  Checkout: { screen: CheckoutScreen, navigationOptions: {header: null} },
  ImagesScreen: { screen: ImagesScreen, navigationOptions: { header:null }},
  OrderConfirmation: { screen: OrderConfirmationScreen, navigationOptions: {header: null}},
  Filters: { screen: FiltersScreen, navigationOptions: { header:null }},
  Confirmation: { screen: confirmationScreen, navigationOptions: { header:null }},

  }
);


const MyApp = createDrawerNavigator({
  App: {
    screen: AppNavigation,
  }
},{
  drawerWidth: scale(270),
  drawerPosition: ReactNative.I18nManager.isRTL ?'right':'left',
  contentComponent: DrawerContent
});

const LandingNavigation = createStackNavigator({

  Splash: {
    screen: SplashScreen,
    navigationOptions: { header: null }
  },

  Root:
  {
    screen: MyApp,
    navigationOptions: ({ navigation }) => ({ 
      header: null
    })
  },
});


const App = createAppContainer(LandingNavigation);

export default App;
