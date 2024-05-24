import { StyleSheet, Image, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

export default function Detail() {
    const [userId, setUserId] = useState("");
    const [infoPet, setInfoPet] = useState({});
    const [healthStatus, setHealthStatus] = useState("");
    const navigation = useNavigation();

    const getUserID = async () => {
        try {
            const id_login = await AsyncStorage.getItem("id_login");
            if (id_login !== null) {
                setUserId(id_login);
            }
        } catch (error) {
            console.error("Error getting user data:", error);
        }
    };

    const getInforPet = async (id) => {
        try {
            const response = await axios.get("https://66456de1b8925626f891d7d1.mockapi.io/user/" + id);
            if (!response.data) {
                throw new Error("No data received");
            }
            let users = response.data;
            setInfoPet(users);
        } catch (error) {
            console.error("Error fetching pet data:", error);
        }
    };

    // Calculate BMI of Pets
    const calculateHealthIndex = () => {
        if (infoPet.pet && infoPet.pet[infoPet.pet.length - 1].weight && infoPet.pet[infoPet.pet.length - 1].height) {
            const weight = parseFloat(infoPet.pet[infoPet.pet.length - 1].weight);
            const height = parseFloat(infoPet.pet[infoPet.pet.length - 1].height) / 100;
            const bmi = weight / (height * height);
            console.log(bmi);
            if (bmi < 18.5) {
                return "Thin";
            } else if (bmi >= 18.5 && bmi < 25) {
                return "Normal";
            } else {
                return "Fat";
            }
        } else {
            return "";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUserID();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userId) {
            getInforPet(userId);
        }
    }, [userId]);

    useEffect(() => {
        const status = calculateHealthIndex();
        setHealthStatus(status);
    }, [infoPet]);
    console.log(infoPet);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={{ uri: infoPet.pet && infoPet.pet[infoPet.pet.length - 1].image ? infoPet.pet[infoPet.pet.length - 1].image : "Guest" }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.title2}>{infoPet.pet && infoPet.pet[infoPet.pet.length - 1].name ? infoPet.pet[infoPet.pet.length - 1].name : "Loading"} !!</Text>
                </View>
            </View>

            {healthStatus === "Fat" ? (
                <View style={styles.fatMessage}>
                    <Text style={styles.fatMessageText}>Oops! Your pet is too {healthStatus} !</Text>
                </View>
            ) : (
                <View style={styles.fatMessage}>
                    <Text style={styles.fatMessageText}> Your pet is {healthStatus} !</Text>
                </View>
            )}

            <View style={styles.listBox}>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Weight:</Text>
                    <Text style={styles.textData}>{infoPet.pet && infoPet.pet[infoPet.pet.length - 1].weight ? infoPet.pet[infoPet.pet.length - 1].weight : "Loading"}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Height:</Text>
                    <Text style={styles.textData}>{infoPet.pet && infoPet.pet[infoPet.pet.length - 1].height ? infoPet.pet[infoPet.pet.length - 1].height : "Loading"}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Age:</Text>
                    <Text style={styles.textData}>{infoPet.pet && infoPet.pet[infoPet.pet.length - 1].age ? infoPet.pet[infoPet.pet.length - 1].age : "Loading"}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Gender:</Text>
                    <Text style={styles.textData}>{infoPet.pet && infoPet.pet[infoPet.pet.length - 1].gender ? infoPet.pet[infoPet.pet.length - 1].gender : "Loading"}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("mypet")}>
                <Text style={styles.buttonText}>List My Pets</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    content: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 180,
        marginTop: 30,
    },
    textContainer: {
        position: "absolute",
        top: 60,
        left: -170,
    },
    title: {
        fontFamily: "AnonymousPro_bold",
        color: "#FFD43B",
        fontSize: 40,
        width: 300,
    },
    title2: {
        fontFamily: "AnonymousPro",
        marginTop: 10,
        color: "#8A4B01",
        fontSize: 24,
        width: 300,
    },
    image: {
        height: 250,
        width: 180,
    },
    listBox: {
        marginTop: 100,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 22,
    },
    box: {
        width: 160,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#8A4B01",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        padding: 15,
        elevation: 5,
    },
    textBox: {
        color: "#8A4B01",
        fontSize: 20,
        fontFamily: "AnonymousPro_bold",
        fontWeight: "900",
    },
    textData: {
        paddingTop: 15,
        fontFamily: "AnonymousPro",
        fontSize: 20,
    },
    buttonParent: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 15,
    },
    fatMessage: {
        position: "absolute",
        top: 330,
        left: 70,
        backgroundColor: "#FFD43B",
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
        elevation: 5,
    },
    fatMessageText: {
        color: "#8A4B01",
        fontSize: 16,
        fontFamily: "AnonymousPro_bold",
    },
    button: {
        borderRadius: 4,
        marginTop: 30,
        padding: 10,
        backgroundColor: "#FFD43B",
    },

    buttonText: {
        fontStyle: "italic",
        color: "#8A4B01",
        fontSize: 16,
    },
});
