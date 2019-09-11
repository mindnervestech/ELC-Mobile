
  import ReactNative from 'react-native';
  import I18n from 'react-native-i18n';
  import Util from '../utils/Util';
  import ar from './ar';
  import en from './en';
  
  // Should the app fallback to English if user locale doesn't exists
  I18n.fallbacks = true;
  
  // Define the supported translations
  I18n.translations = {
    en,
    ar
  };

  Util.getAsyncStorage('SELECTED_COUNTRY_LANGUAGE').then((data) => {
    I18n.locale = data.language;
    
  });

  if(ReactNative.I18nManager.isRTL === true){
    I18n.locale = 'ar';
  }else{
    I18n.locale = 'en';
  }

  // I18n.locale = 'en';
  // const currentLocale = I18n.currentLocale();
  const currentLocale = I18n.locale;
  I18n.fallbacks = true;
  // Is it a RTL language?
  export const isRTL = currentLocale === 'ar';
  
  // Allow RTL alignment in RTL languages
  // ReactNative.I18nManager.allowRTL(isRTL);
  
  // The method we'll use instead of a regular string
  export function strings(name, params = {}) {
    return I18n.t(name, params);
  };
  export default I18n;