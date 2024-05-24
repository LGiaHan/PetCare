import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

export default function Login() {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const fetchApi = async () => {
        try {
            const response = await fetch("https://66456de1b8925626f891d7d1.mockapi.io/user");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };
    const fetchData = async () => {
        const arrayData = await fetchApi();
        setUser(arrayData);
    };
    useEffect(() => {
        fetchData();
    }, []);

    //check ValidateForm
    const validateForm = () => {
        const errors = {};

        if (!username.trim()) {
            errors.username = "Please enter your username";
        }

        if (!password.trim()) {
            errors.password = "Please enter your password";
        }

        return errors;
    };
    //Login
    const handleLogin = async () => {
        const errorsEmpty = validateForm();
        const errorCheck = {};
        if (Object.keys(errorsEmpty).length > 0) {
            setErrors(errorsEmpty);
        } else {
            const findUser = user.find((item) => item.username === username);
            if (findUser) {
                if (findUser.password === password) {
                    await AsyncStorage.setItem("username", username);
                    await AsyncStorage.setItem("id_login", findUser.id);
                    navigation.navigate("choose");
                } else {
                    errorCheck.password = "Password is not correct";
                    setErrors(errorCheck);
                }
            } else {
                errorCheck.username = "Account is doesn't exist";
                setErrors(errorCheck);
            }
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.hello}>Hello</Text>
                <Text style={styles.signin}>Sign in to your account</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
                <View style={{ position: "relative", marginBottom: 20 }}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
                    <View style={{ position: "absolute", top: 14, left: 20 }}>
                        <Icon name="user" size={20} color="#8A4B01" />
                    </View>
                    {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                </View>
                <View style={{ position: "relative", marginBottom: 16 }}>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
                    <View style={{ position: "absolute", top: 14, left: 20 }}>
                        <Icon name="lock" size={20} color="#8A4B01" />
                    </View>
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, fontStyle: "italic", textAlign: "center", color: "gray", marginTop: 10, fontFamily: "AnonymousPro" }}>
                Forgot Your Password? <Text style={{ fontSize: 14, fontStyle: "italic", color: "blue", textDecorationLine: "underline" }}>Click Here!</Text>
            </Text>
            <Image source={{ uri: "https://i.pinimg.com/564x/44/ba/ea/44baeab8a5725c667672d11504816edb.jpg" }} style={styles.image} />
            <View>
                <Text style={{ textAlign: "center", color: "gray", fontFamily: "AnonymousPro" }}>
                    Don't have an account? <Text style={{ fontSize: 14, fontStyle: "italic", color: "black", textDecorationLine: "underline" }}>Create it</Text>
                </Text>
                <View style={{ marginTop: 14, gap: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10 }}>
                    <View style={{ backgroundColor: "#3a5692", borderRadius: 100, height: 40, width: 40, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="facebook" size={20} color="white" />
                    </View>
                    <View style={{ backgroundColor: "#2399e7", borderRadius: 100, height: 40, width: 40, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="twitter" size={20} color="white" />
                    </View>
                    <View style={{ backgroundColor: "#f70000", borderRadius: 100, height: 40, width: 40, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="youtube" size={20} color="white" />
                    </View>
                    <View style={{ backgroundColor: "#f7f501", borderRadius: 100, height: 40, width: 40, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="snapchat" size={20} color="black" />
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    top: {
        marginTop: 40,
        marginBottom: 20,
    },
    hello: {
        textAlign: "center",
        fontSize: 60,
        marginBottom: 10,
        fontFamily: "AnonymousPro_bold",
    },
    signin: {
        color: "#8A4B01",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "AnonymousPro",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#8A4B01",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontFamily: "AnonymousPro",
        paddingLeft: 45,
    },

    error: {
        color: "red",
        fontFamily: "AnonymousPro",
        marginLeft: 6,
        marginTop: 5,
        fontStyle: "italic",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#8A4B01",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontFamily: "AnonymousPro_bold",

        fontSize: 17,
        fontWeight: "bold",
    },
    image: {
        width: "100%",
        height: 180,
        marginTop: 10,
    },
});
