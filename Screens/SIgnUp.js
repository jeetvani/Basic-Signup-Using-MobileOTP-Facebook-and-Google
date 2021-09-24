import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import firebase from 'firebase';
import *as Facebook from 'expo-facebook'
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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as Google from 'expo-google-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.recaptchaVerifier = React.createRef();
    }
    state = {
        Username: '',
        Password: '',
        ConfirmPassword: '',
        Email: '',
        PhoneNumber: '',
        OTPsentsuccess: true,
        verificationID: '',
        OTP: ''
    }

    async Validate() {

        console.log("Data Added Succesfully");
        if (this.state.Username == "") {
            alert("Kindly Enter A Valid Username")
        } else {
            if (this.state.Password == "") {
                alert("Kindly Enter A Valid Password")
            } else {
                if (this.state.ConfirmPassword == "") {
                    alert("Kindly Confirm Your Password")
                } else {
                    if (this.state.PhoneNumber.length < 10) {
                        alert("Kindly enter a Valid 10 digit Mobile Number")
                    } else {
                        if (!this.state.Password == this.state.ConfirmPassword) {

                        } else {
                            const phoneProvider = new firebase.auth.PhoneAuthProvider();
                            const verificationId = await phoneProvider.verifyPhoneNumber(
                                JSON.stringify("+91" + this.state.PhoneNumber),
                                this.recaptchaVerifier.current
                            );
                            this.setState({ verificationID: verificationId, OTPsentsuccess: false })
                            console.log(verificationId);
                            AsyncStorage.setItem("Name", this.state.Username)
                            AsyncStorage.setItem("PhoneNumber", this.state.PhoneNumber)
                            alert("Verification code has been sent to your phone."),

                                this.setState({ Username: "", Password: '', Email: '', ConfirmPassword: "", PhoneNumber: '' })

                        }
                    }
                }
            }
        }
    }


    render() {
        // Google SignUpin Config
        const handleFacebookSignIn = async () => {
            await Facebook.initializeAsync({
                appId: '180285490856498'
            })
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            })
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            AsyncStorage.setItem("Name",(await response.json()).name)
            this.props.navigation.navigate("MainScreen")
              }
        }

        const handleGoogleSignIn = () => {
            const config = {
                iosClientId: '665952789178-pq8cs65jcfkc4ra157dtvpm0j816buq0.apps.googleusercontent.com',
                androidClientId: '665952789178-lm4sue5kh177mqnssmoi55l9pmpl7ira.apps.googleusercontent.com',
                scopes: ['profile', 'email']

            }
            Google
                .logInAsync(config)
                .then((result) => {
                    console.log(result);
                    if (result.type == "success") {
                        console.log(result.user);
                        AsyncStorage.setItem("Name", result.user.name)
                        AsyncStorage.setItem("Email", result.user.email)
                        this.props.navigation.navigate("MainScreen")
                    } else {
                        console.log('Google SignIn cancelled');
                    }
                })
        }
        const NavigateToLogin = async () => {
            this.props.navigation.navigate('Login')
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar backgroundColor="black" />
                <View style={{ alignItems: 'center' }} >
                    <Image width={200} source={{ uri: 'https://upcred.in/icon/IncredwhiteNone.png' }} />
                    {this.state.OTPsentsuccess ?
                        <View style={{ alignItems: 'center' }}>
                            <FirebaseRecaptchaVerifierModal
                                ref={this.recaptchaVerifier}
                                firebaseConfig={firebaseConfig}
                            />

                            <TextInput value={this.state.Username} onChangeText={(text) => { this.setState({ Username: text }) }} placeholder="Username" placeholderTextColor="#b2b2b2" editable={true} style={{ fontSize: 16, marginTop: 20, borderColor: '#b2b2b2', width: 210, borderWidth: 1, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 7, fontWeight: 'bold' }}></TextInput>

                            <TextInput value={this.state.Password} onChangeText={(text) => { this.setState({ Password: text }) }} placeholder="Password" placeholderTextColor="#b2b2b2" secureTextEntry editable={true} style={{ marginTop: 20, fontSize: 16, borderColor: '#b2b2b2', width: 210, borderWidth: 1, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 7, fontWeight: 'bold' }}></TextInput>
                            <TextInput value={this.state.ConfirmPassword} onChangeText={(text) => { this.setState({ ConfirmPassword: text }) }} placeholder="Confirm Your Password" placeholderTextColor="#b2b2b2" secureTextEntry editable={true} style={{ marginTop: 20, fontSize: 16, borderColor: '#b2b2b2', width: 210, borderWidth: 1, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 7, fontWeight: 'bold' }}></TextInput>
                            <TextInput value={this.state.PhoneNumber} onChangeText={(text) => { this.setState({ PhoneNumber: text }) }} placeholder="Phone Number" placeholderTextColor="#b2b2b2" editable={true} style={{ marginTop: 20, fontSize: 16, borderColor: '#b2b2b2', width: 210, borderWidth: 1, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 7, fontWeight: 'bold' }}></TextInput>

                            <TouchableOpacity onPress={this.Validate.bind(this)} style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: 'black', color: "white", paddingVertical: 5, borderRadius: 8, marginHorizontal: 22, paddingHorizontal: 22 }}>Sign-Up</Text>
                            </TouchableOpacity>
                            <Text>Or</Text>
                            <TouchableOpacity onPress={handleGoogleSignIn} style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: '#4c8bf5', color: "white", paddingVertical: 5, borderRadius: 8, marginHorizontal: 22, paddingHorizontal: 22 }}>Sign-Up With Google</Text>
                            </TouchableOpacity>
                            <Text>Or</Text>
                            <TouchableOpacity onPress={handleFacebookSignIn} style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: '#3b5998', color: "white", paddingVertical: 5, borderRadius: 8, marginHorizontal: 22, paddingHorizontal: 22 }}>Sign-Up With Facebook</Text>
                            </TouchableOpacity>

                        </View> : <View>
                            <TextInput keyboardType="number-pad" onChangeText={(text) => { this.setState({ OTP: text }) }} placeholder="OTP" placeholderTextColor="#b2b2b2" editable={true} style={{ fontSize: 16, marginVertical: 20, borderColor: '#b2b2b2', width: 210, borderWidth: 1, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 7, fontWeight: 'bold' }}></TextInput>

                            <TouchableOpacity onPress={async () => {
                                try {
                                    const credential = firebase.auth.PhoneAuthProvider.credential(
                                        this.state.verificationID,
                                        this.state.OTP,
                                    );
                                    await firebase.auth().signInWithCredential(credential);
                                    alert("Phone authentication successful 👍")
                                    this.props.navigation.navigate("MainScreen")
                                } catch (err) {
                                    alert("Wrong OTP ")
                                }
                            }} style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: 'black', color: "white", paddingVertical: 5, borderRadius: 18, marginHorizontal: 22 }}>Verify</Text>
                            </TouchableOpacity></View>}
                    <View style={{ alignItems: 'center' }}>

                        <Text style={{ marginVertical: 5 }}>Already Registerd ?</Text>
                        <TouchableOpacity onPress={NavigateToLogin}>
                            <Text>Log-in Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    LogoContainer:
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
    InputStyles: {}
})