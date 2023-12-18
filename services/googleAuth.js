import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { saveUserData } from './userDataManager';
import { fetchSignInMethodsForEmail } from '@react-native-firebase/auth';


GoogleSignin.configure({
    webClientId: '895295762669-1ikv63lval2i3fof1jr1qu4a4216i975.apps.googleusercontent.com',
});

export const onGoogleButtonPressSignin = async () => {
    // Check if your device supports Google Play

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();


    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userExists = await checkIfUserExists(user.email);

    if (!userExists) {
        const user_sign_in = auth().signInWithCredential(googleCredential);

        user_sign_in.then(async (userCredential) => {
            const user = userCredential.user;

            const { given_name, family_name, email } = userCredential.additionalUserInfo.profile;

            await saveUserData(user.uid, email, given_name, family_name);


        })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        alert("User already exists!");

        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return;


    }






    // try {
    //     // Google Sign-Out
    //     await GoogleSignin.signOut();

    //     // Firebase Sign-Out
    //     await auth().signOut();

    //     console.log('Google and Firebase Sign-Out successful');
    // } catch (error) {
    //     console.error('Error during Google and Firebase Sign-Out:', error);
    // }





}

export const onGoogleButtonPressLogin = async () => {
    // Check if your device supports Google Play

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();


    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userExists = await checkIfUserExists(user.email);

    if (userExists) {
        const user_sign_in = auth().signInWithCredential(googleCredential);

        user_sign_in.then(async (userCredential) => {
            const user = userCredential.user;

            const { given_name, family_name, email } = userCredential.additionalUserInfo.profile;

            await saveUserData(user.uid, email, given_name, family_name);


        })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        alert("User doesn't exist!");

        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return;


    }
}

async function checkIfUserExists(email) {
    try {
        providers = await auth().fetchSignInMethodsForEmail(email);
        return providers.length > 0;
    } catch (error) {
        // error case, it is considered that the user doesn't exist
        console.log(error);
        return false;
    }


}


