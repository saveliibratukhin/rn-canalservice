import { Image, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { useAuth } from "../AuthContext";
import { generalStyles } from "../generalStyles";
//import DeviceInfo from 'react-native-device-info'  //doesn't work in expo 
import { useDevice } from "../deviceContext";

export default function Header() {
    const [isAuth, setIsAuth] = useAuth()
    const [isTablet] = useDevice()

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        setIsAuth(false)
    }

    return (    
        <View style={styles.headerContainer}>
            {//instead of DeviceInfo.isTablet()
            isTablet? 
                <Image 
                    source={require('../imgs/fulllogo.png')}
                    style={{width: 273,height: 63}}
                />
                : <Image 
                    source={require('../imgs/tinylogo.png')}
                    style={{width: 63,height: 63}}
                    /> 
            }
            <TouchableOpacity onPress={logout}>
                <Image
                    style={{height: 56, width: 62}}
                    source={require('../imgs/backicon.png')} 
                />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 118,
        backgroundColor: generalStyles.CREAM_COLOR,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})