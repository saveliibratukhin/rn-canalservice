import { useRef, useState } from "react";
import { Alert, AsyncStorage, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";
import { useDevice } from "../deviceContext";
import { generalStyles } from "../generalStyles";

export default function AuthScreen () {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isAuth, setIsAuth] = useAuth()
    const [isTablet] = useDevice()
    const walletTextInput = useRef()

    const authHandler = async () => {
        if(login && password) {
            if(login === 'admin') {
                if (password === 'admin') {
                    await AsyncStorage.setItem('token', 'jwtjwtjwtjwtjwt') 
                    setIsAuth(true)
                } else
                    Alert.alert('Неверный пароль')
            } else
                Alert.alert('Такого пользователя не существует')
        } else {
            Alert.alert('Заполните все поля')
        }
    }

    return (
        <View style={isTablet? styles.tabletContainer : styles.container}>
            <View style={styles.authForm}>
                <Text style={[generalStyles.h1, {color: generalStyles.BLUE_WATER_COLOR, textAlign: 'center'}]}>
                    Authorization
                </Text>
                <View style={isTablet? styles.inputLabelViewTabletStyle : {}}>
                    <Text style={[generalStyles.h1, {marginTop: 15}]}>login</Text>
                    <TextInput 
                        value={login} 
                        onChangeText={setLogin} 
                        style={styles.input} 
                        returnKeyType='next'
                        onSubmitEditing={() => walletTextInput.current.focus()}
                    />
                </View>
                <View style={isTablet? styles.inputLabelViewTabletStyle : {}}>
                    <Text style={[generalStyles.h1, {marginTop: 15}]}>
                        password
                    </Text>
                    <TextInput 
                        ref={walletTextInput}
                        value={password} 
                        onChangeText={setPassword} 
                        style={styles.input} 
                        secureTextEntry={true} 
                        returnKeyType='done'
                        onSubmitEditing={authHandler}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={authHandler}>
                    <Text style={generalStyles.h1}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      margin: 15,
    },
    tabletContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    authForm: {
        borderColor: generalStyles.BLUE_WATER_COLOR,
        borderWidth: 3,
        borderRadius: 5,
        padding: 25,
        width: '100%'
    },
    input: {
        borderColor: generalStyles.BLUE_WATER_COLOR,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        marginTop: 15,
        height: 39,
        maxWidth: 295,
        flexGrow: 1
    },
    button: {
        backgroundColor: generalStyles.CREAM_COLOR,
        color: '#000',
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 5,
    },
    inputLabelViewTabletStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});