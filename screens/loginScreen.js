import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { saveUserDataInAsyncStorage } from "../services/userDataManager";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/auth";
import { styles } from "../cssStyles/commonStyles";
import { onGoogleButtonPressLogin } from "../services/googleAuth";



const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        navigation.navigate("Register");
    }

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await login(email, password);
            if (user) {
                //await saveUserDataInAsyncStorage(user.uid);
                navigation.navigate("Home");
                setLoading(false);
            }

        }
        catch (error) {
            setLoading(false);
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Invalid username or password")
            }
            else if (error.code === "auth/too-many-requests") {
                alert("too many requests");
            }
            else {
                alert("Signup error: " + error.message)
            }
        }
    }

    return (
        <View>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} />

            <TouchableOpacity onPress={handleLogin}><Text>Login here</Text></TouchableOpacity>
            <Button
                title="Google Login"
                onPress={onGoogleButtonPressLogin}
            />

        </View>
    )

}

export default LoginScreen;
