import { Image, Text, TextInput, View, TouchableOpacity, Button, Keyboard, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../cssStyles/commonStyles";
import { logout } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {

    const navigation = useNavigation();
    const handleLogout = () => {
        try {
            logout();
            navigation.navigate("Register");
        }
        catch (error) {
            alert("Error logging out!");
        }
    }


    useEffect(() => {

    }, []);

    return (
        <View>

            <Text onPress={handleLogout}>Click here to logout!</Text>
        </View>

    )
}

export default HomeScreen;

