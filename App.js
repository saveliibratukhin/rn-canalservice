import { useEffect, useState } from 'react';
import { AsyncStorage, SafeAreaView, StyleSheet } from 'react-native';
import AuthScreen from './src/components/AuthScreen';
import Header from './src/components/Header';
import { AuthContext } from './src/AuthContext';
import { useFonts } from 'expo-font';
import PostsScreen from './src/components/PostsScreen';
import { DeviceContext } from './src/deviceContext';
import * as Device from 'expo-device';

export default function App() {
  const [isAuth, setIsAuth] = useState(false)

  //because DeviceInfo doesn't work on Expo
  const [isTablet, setIsTablet] = useState()

  const [loaded] = useFonts({
    Inter: require('./assets/Inter.ttf')
  })

  const getAuthToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token === 'jwtjwtjwtjwtjwt')
      setIsAuth(true)
  }

  const checkDeviceInfo = async () => {
    Device.getDeviceTypeAsync().then(type => setIsTablet(type === Device.DeviceType.TABLET ))
  }

  useEffect(() => {
    getAuthToken()
    checkDeviceInfo()
  }, [])

  if(!loaded)
    return null

  return (
    <DeviceContext.Provider value={[isTablet, setIsTablet]}>
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
        <SafeAreaView style={styles.container}>
          <Header />
          { //i decided to use the expression here because there is no need to use navigation
          isAuth? <PostsScreen />
            : <AuthScreen />}
        </SafeAreaView>
      </AuthContext.Provider>
    </DeviceContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
