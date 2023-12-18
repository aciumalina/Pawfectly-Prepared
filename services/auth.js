import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const signup = async (email, password) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        //await sendEmailVerification();
        const user = userCredential.user;
        //await saveUserDataInAsyncStorage(user);
        console.log("user registred");
        return user;
    }
    catch (error) {
        throw error;
    }
}


export const login = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        //await saveUserDataInAsyncStorage(user);
        console.log("User signed in ");
        return user;
    }

    catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const logout = async () => {
    try {
        await GoogleSignin.signOut();
        //await AsyncStorage.removeItem('userUID');
        await auth().signOut();
    }
    catch (error) {
        throw error;
    }
}


