import {
    Dimensions,
    Platform
} from 'react-native';

module.exports = {
    screen: Dimensions.get('window'),
    screenHeight:  Dimensions.get('window').height,
    screenWidth:  Dimensions.get('window').width,
    deviceType : function(){if(Dimensions.get('window').height/Dimensions.get('window').width < 1.7) return "tablet"; else return "phone"},
    isIOS: Platform.OS === 'ios',
    isANDROID: Platform.OS === 'android',

    RobotoLightItalic: 'Roboto-LightItalic',
    RobotoBlackItalic: 'Roboto-BlackItalic',
    RobotoBoldItalic: 'Roboto-BoldItalic',
    RobotoMediumItalic: 'Roboto-MediumItalic',
    RobotoRegular: 'Roboto-Regular'

};