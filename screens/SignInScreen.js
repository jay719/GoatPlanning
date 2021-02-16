
import React,  { useState} from 'react'
import {ImageBackground, SafeAreaView, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal} from "react-native" //safe area makes sure content is under tool bar
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';


export default function SignInScreen() {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

const handleUsernameText = (text) => {
    setUsernameValue(text)
}
const handlePasswordText = (text) => {                //usually would be event and event.target.value
    setPasswordValue(text)
}   

spawnLogInMessage = () => {
    return <Text>Success!!</Text>
}
    return (
        
            <ImageBackground 
            style={styles.background}
            source={require('../assets/roadtrip.png')}
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
                            style={{ borderColor: 'gray', borderWidth: 1, margin:20, }}
                            onChangeText={handleUsernameText}
                            value={usernameValue}
                            placeholder="Username"
                            />
                             <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1, margin:20,}}
                                secureTextEntry={true}
                                onChangeText={handlePasswordText}
                                value={passwordValue}
                                placeholder="Password"
                            /> 
                            <TouchableOpacity
                            style={{ ...styles.openButton }}
                            
                            >
                                {spawnLogInMessage}
                                <Text 
                                style={styles.textStyle}
                                onPress={() => {
                                    fetch('http://deploy-trip-planner.herokuapp.com/login', {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json'

                                        },
                                        body: JSON.stringify({
                                            username: usernameValue,
                                            password: passwordValue
                                        })
                                    })
                                        .then( response => response.json())
                                        .then(data => {
                                            console.log('token', data)
                                            if (data.message) {
                                                setError(data.message)
                                            } else {
                                                {spawnLogInMessage}
                                                dispatch({type:"SET_CURRENT_ID",currentID: data.user.id})
                                                dispatch({type:"SET_CURRENT_USER", currentUser: data.user.username})
                                                
                                            }

                                        })
                                        .then(setModalVisible(false))
                                        
                                }}
                                >
                                    Submit Sign in
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </Modal>
                    
                    
                    
                    <View style={styles.loginButton}>
                        <TouchableOpacity style={styles.buttons} onPress={() => {setModalVisible(true)}} color={'hsl(181, 59%, 94%)'}>
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerButton}>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        
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
        color: 'hsl(181, 59%, 94%)',
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
        color: 'hsl(206, 64%, 97%)',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        
    },container: {
        flex: 1,
        backgroundColor:'hsl(160, 100%, 98%)',
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        height:50,
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
        backgroundColor: 'hsl(181, 59%, 94%)',
        justifyContent: "center",
        alignItems: "center",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,  
        borderColor: 'hsl(206, 64%, 87%)',
        borderWidth:0.5,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
    },
    registerButton: {
        width: '100%',
        height: 60,
        backgroundColor: 'hsl(206, 64%, 97%)',
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        
        

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
    },
    textStyle: {
        fontWeight:'200',
    }
    
})