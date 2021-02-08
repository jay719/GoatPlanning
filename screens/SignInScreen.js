
import React,  { useState} from 'react'
import {ImageBackground, SafeAreaView, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal} from "react-native" //safe area makes sure content is under tool bar




export default function SignInScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

const handleUsernameText = (text) => {
    setUsernameValue(text)
}
const handlePasswordText = (text) => {                //usually would be event and event.target.value
    setPasswordValue(text)
}   

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
            style={styles.background}
            source={require('../assets/classylake.png')}
            >
                  <View style={styles.welcome}>
                        <Text style={styles.welcomeText}> Trip Plauner</Text>
                        <Text style={styles.welcomeHiText}>Mobile</Text>
                    </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Please Sign in Below</Text>
                            <TextInput
                            style={{ borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={handleUsernameText}
                            value={usernameValue}
                            placeholder="Username"
                            />
                             <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1 }}
                                secureTextEntry={true}
                                onChangeText={handlePasswordText}
                                value={passwordValue}
                                placeholder="Password"
                            /> 
                            <TouchableOpacity
                            style={{ ...styles.openButton }}
                            
                            >
                                <Text style={styles.textStyle}>Submit Sign in</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </Modal>
                    
                    
                    
                    <View style={styles.loginButton}>
                        <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(true)}}>
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerButton}>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    background: {
        flex: 1,
        justifyContent:"flex-end",
    },
    welcome:{
        flex: 1,
        top: 290
    },
    welcomeText: {
        left: 30,
        // bottom: 230,
        // justifyContent: "center",
        // alignItems: "center",
        fontSize: 30,
        paddingBottom: 50,
        fontWeight: "700",
        color: 'hsl(155, 100%, 84%)',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    
    },welcomeHiText: {
        // bottom: 230,
        // justifyContent: "center",
        // alignItems: "center",
        fontSize: 27,
        fontWeight: "700",
         
        left: 50,
        color: 'hsl(155, 100%, 84%)',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        
    },container: {
        flex: 1,
        backgroundColor:'hsl(159, 100%, 73%)',
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    loginButton: {
        width: '100%',
        height: 60,
        backgroundColor: 'hsl(155, 100%, 84%)',
        justifyContent: "center",
        alignItems: "center",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        
        
    },
    registerButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'hsl(159, 100%, 73%)',
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        color: "white",

    },
    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        fontWeight: "700",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },

    signUpButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        fontWeight: "700",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    }
    
})