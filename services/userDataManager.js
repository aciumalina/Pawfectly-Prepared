import { db } from "./config.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveUserDataInAsyncStorage = async (uid, firstname = "", lastname = "") => {
    await AsyncStorage.setItem('userUID', uid);
    if (!firstname && !lastname) {
        //login case, fetch user data from users with the corresponding uid
        const documentRef = doc(db, 'users', uid);
        try {
            const documentSnapshot = await getDoc(documentRef);

            if (documentSnapshot.exists()) {
                // Documentul există, puteți accesa datele
                const documentData = documentSnapshot.data();
                await AsyncStorage.setItem('userFirstName', documentData.firstname);
                await AsyncStorage.setItem('userLastName', documentData.lastname);
            } else {
                console.log('Documentul nu există.');
            }
        } catch (error) {
            console.error('Eroare la obținerea documentului:', error);
        }
    }
    else {
        //signup case when i already have the firstname and the lastname passed as parameters
        await AsyncStorage.setItem('userFirstName', firstname);
        await AsyncStorage.setItem('userLastName', lastname);
    }
}

export const saveUserData = async (id, email, firstname, lastname) => {

    const dataToAdd = {
        id: id,
        email: email,
        firstname: firstname,
        lastname: lastname,
    };

    const documentRef = doc(db, 'users', id);
    try {
        await setDoc(documentRef, dataToAdd);
        console.log('Document added successfully.');
    } catch (error) {
        console.error('Error adding document:', error);
    }

}

export const saveProfilePic = async (uri) => {
    const userDocRef = doc(db, 'users', await AsyncStorage.getItem("userUID"));
    const dataToAdd = {
        profilePic: uri,
    };

    try {
        await setDoc(userDocRef, dataToAdd, { merge: true });
        await AsyncStorage.setItem("userProfilePic", uri);
        console.log('Profile picture updated successfully.');
    } catch (error) {
        console.error('Error updating profile picture:', error);
    }


}