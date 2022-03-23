import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
  });
};

export default useFonts;