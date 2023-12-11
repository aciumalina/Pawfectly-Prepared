import { ScrollView, Image, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../services/auth";
import { saveUserData, saveUserDataInAsyncStorage } from "../services/userDataManager";
import { styles } from "../cssStyles/commonStyles";
import { Button } from 'react-native';
import { onGoogleButtonPress } from '../services/googleAuth';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        setLoading(true);
        try {
            const user = await signup(email, password);
            if (user) {
                const id = user.uid;
                await saveUserData(id, email, firstname, lastname);
                await saveUserDataInAsyncStorage(id, firstname, lastname);
                //navigation.navigate("Login");
            }
        }
        catch (error) {
            setLoading(false);
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
            else if (error.code === "auth/weak-password") {
                alert("weak password");
            }
            else {
                alert("signup error: " + error.message);
            }
        }

    }

    const handleLogin = async () => {
        navigation.navigate("Login");
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={require("../assets/logo.png")}
                    style={styles.logo}
                    overlayColor={'pink'} />
                <Text>Register</Text>
                <TextInput style={styles.input} placeholder="Firstname" value={firstname} onChangeText={setFirstname} />
                <TextInput style={styles.input} placeholder="Lastname" value={lastname} onChangeText={setLastname} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} />

                <TouchableOpacity style={styles.button} onPress={handleSignup}><Text>Click here to register</Text></TouchableOpacity>
                <Button
                    title="Google Sign-In"
                    onPress={onGoogleButtonPress}
                />
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <Text>.</Text>
                <TouchableOpacity onPress={handleLogin}><Text>Already have an account? Login here!</Text></TouchableOpacity>

            </View>
        </ScrollView>
    );


};

export default RegisterScreen;

