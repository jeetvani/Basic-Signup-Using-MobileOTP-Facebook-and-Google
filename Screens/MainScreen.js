import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal,BackHandler } from 'react-native';
import Image from 'react-native-scalable-image';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: "AIzaSyD3yhbWUSflgRV0MYV4X2eyXw9-SXDZbkw",
    authDomain: "mandiapp83-f3c73.firebaseapp.com",
    databaseURL: "https://mandiapp83-f3c73-default-rtdb.firebaseio.com",
    projectId: "mandiapp83-f3c73",
    storageBucket: "mandiapp83-f3c73.appspot.com",
    messagingSenderId: "285979018863",
    appId: "1:285979018863:web:48f8ffcd69b3cae206ef9a",
    measurementId: "G-YQX97HV61C"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export default class MainScreen extends React.Component {
    state = {
        ModalShown: false,
        OTP: '',
        name: '',
        phnnumber: '',
        email: ''

    }
  
   
    async componentDidMount() {
      
        const Name = await AsyncStorage.getItem("Name")
        this.setState({ name: Name })
        const PhnNum = await AsyncStorage.getItem("PhoneNumber")
        this.setState({ phnnumber: PhnNum })
        const mail = await AsyncStorage.getItem("Email")
        this.setState({ email: mail })
    }
    render() {
        const LogOut = async () => {
            AsyncStorage.removeItem("Name")
            AsyncStorage.removeItem("Email")
            AsyncStorage.removeItem("PhoneNumber")

            this.props.navigation.navigate("SignUp")
            alert("Log Out SuccessFull")
        }

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <StatusBar backgroundColor="black" />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', marginVertical: 8, fontWeight: 'bold', marginHorizontal: 10, fontSize: 24 }}>Welcome To  </Text>

                    <Image width={200} source={{ uri: 'https://upcred.in/icon/IncredwhiteNone.png' }} />
                    <View  >


                    </View>
                    <Text style={{ textAlign: 'center', marginVertical: 8, fontWeight: 'bold', marginHorizontal: 10, fontSize: 24 }}>You are currently SIgned in as  {this.state.name} </Text>
                    <Text style={{ textAlign: 'center', marginVertical: 8, fontWeight: 'bold', marginHorizontal: 10, fontSize: 24 }}>With Phone Number  {this.state.phnnumber} </Text>
                    <Text style={{ textAlign: 'center', marginVertical: 8, fontWeight: 'bold', marginHorizontal: 10, fontSize: 24 }}>With Email Adress  {this.state.email} </Text>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={LogOut} style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: 'red', color: "white", paddingVertical: 8, borderRadius: 18, marginHorizontal: 22,paddingHorizontal:22, }}>Log Out</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        )
    }
}

const Styles = StyleSheet.create({ LogoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' } })