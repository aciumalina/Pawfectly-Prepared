import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { saveUserData } from './userDataManager';


GoogleSignin.configure({
    webClientId: '895295762669-1ikv63lval2i3fof1jr1qu4a4216i975.apps.googleusercontent.com',
});

export const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();


    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then(async (userCredential) => {
        const user = userCredential.user;
        if (checkIfUserExists) {
            alert("User already exists!");
            return;
        }
        else {
            const { given_name, family_name, email } = userCredential.additionalUserInfo.profile;

            await saveUserData(user.uid, email, given_name, family_name);
        }

    })
        .catch((err) => {
            console.log(err);
        })

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

async function checkIfUserExists(userCredential) {
    if (userCredential.additionalUserInfo.isNewUser)
        return true;
    return false;
}
