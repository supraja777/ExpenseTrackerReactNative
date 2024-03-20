import { View, Text, StyleSheet, Button } from "react-native"
function ErrorOverlay({message, onConfirm}) {
    return (<View style={styles.ActivityIndicator}>
        <Text style={[styles.title,styles.text]}>Error occured</Text>
        <Text style={[styles.text]}>{message}</Text>
        <Button title="okay" onPress={onConfirm}/>
    </View>)
}


export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontWeight: 20,
        fontWeight: 'bold'
    },
})