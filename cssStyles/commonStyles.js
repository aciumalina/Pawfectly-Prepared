import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    // homepage: {
    //     flex: 1,
    //     backgroundColor: 'pink',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcc7b1'
    },

    input: {
        borderColor: "#0a2e4f",
        borderWidth: 2,
        borderRadius: 25,
        padding: 12,
        //justifyContent: "space-between",
        backgroundColor: "#d0d8d9",
        width: "90%",
        marginBottom: 10,

    },

    logo: {
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 250,
        paddingLeft: 12,
    },

    button: {
        borderColor: "#0a2e4f",
        borderWidth: 2,
        borderRadius: 25,
        padding: 12,
        //justifyContent: "space-between",
        backgroundColor: "#e0774a",
        width: "90%",
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    }
});

export { styles }