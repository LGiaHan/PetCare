import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({}) {
    const navigation = useNavigation();
    return (
        <ImageBackground source={{ uri: "https://i.pinimg.com/564x/8d/56/b7/8d56b7f2c721d18c6360f6d961eb733f.jpg" }} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.container}>
                <Text style={styles.title}>PetCare App</Text>
                <Text style={styles.descrip}>Taking care of a pet is a favorite for many people. It helps you to reduce stress and fatigue.</Text>
                <Image source={{ uri: "https://i.pinimg.com/564x/c3/c8/a7/c3c8a7826e6f7ea654c3b39f8b1ddf3d.jpg" }} style={styles.image} />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("login")}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: "100vh",
    },
    container: {
        alignItems: "center",
    },
    title: {
        marginTop: 80,
        fontSize: 34,
        color: "#8A4B01",
        fontFamily: "AnonymousPro_bold",
    },
    descrip: {
        fontSize: 16,
        width: "80%",
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
        color: "#8A4B01",
        fontFamily: "AnonymousPro",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "AnonymousPro_bold",
    },
    button: {
        backgroundColor: "#EFBF28",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        fontSize: 16,
    },
});
