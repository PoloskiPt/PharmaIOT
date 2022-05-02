import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
    'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'roboto-thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'roboto-black': require('../assets/fonts/Roboto-Black.ttf'),
    'roboto-blackitalic': require('../assets/fonts/Roboto-BlackItalic.ttf'),
    'roboto-bolditalic': require('../assets/fonts/Roboto-BoldItalic.ttf'),
    'roboto-lightitalic': require('../assets/fonts/Roboto-LightItalic.ttf'),
    'roboto-mediumitalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto-thinitalic': require('../assets/fonts/Roboto-ThinItalic.ttf'),

  });
};

export default useFonts;