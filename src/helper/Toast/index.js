import {
    Dimensions,
} from 'react-native';

import Toast from 'react-native-root-toast';

const DIMENSION = Dimensions.get('window');
export default function showToast(msg, shouldShowInCenter = false) {
    // position: shouldShowInCenter ? Dimensions.height/2 :  DIMENSION.height -150
	Toast.show(`${msg}`, { duration: 10000, position: Toast.positions.BOTTOM, animation: true, hideOnPress: true });
}
