import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
  });
};

export default useFonts;