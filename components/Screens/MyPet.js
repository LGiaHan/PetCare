import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function MyPet() {
    const [userId, setUserId] = useState("");
    const [infoPet, setInfoPet] = useState({});

    //Get UserID from API
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
    //Get infor Pet in UserID from API
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

    //delete pet
    const handleDelete = async (id) => {
        const indexDeletePet = infoPet.pet.findIndex((item) => item.id === id);
        const arrayPet = infoPet.pet;
        arrayPet.splice(indexDeletePet, 1);
        infoPet.pet = arrayPet;
        try {
            const result = await axios.put("https://66456de1b8925626f891d7d1.mockapi.io/user/" + userId, infoPet);
            if (result.status == 200) {
                Alert.alert("Delete Success", "Huhu My pet is die !!");
                getInforPet(userId);
            } else {
                Alert.alert("Error", "Failed to delete pet.");
            }
        } catch (error) {
            console.error("Error fetching pet data:", error);
        }
    };

    //useEffect
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

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                <Image source={{ uri: "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58480.jpg" }} style={styles.imageUser} />
                <View style={{ textAlign: "center" }}>
                    <Text style={{ fontFamily: "AnonymousPro_bold", color: "#8A4B01", fontSize: 20 }}>{infoPet.username}</Text>
                </View>
            </View>
            <Text style={{ fontFamily: "AnonymousPro_bold", color: "#8A4B01", fontSize: 16, marginTop: 10, marginLeft: 10 }}>List of my Pet:</Text>
            <FlatList
                data={infoPet.pet}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.box}>
                        <Image source={{ uri: item.image }} style={styles.imageType} />
                        <View>
                            <Text style={styles.textBox}>{item.name}</Text>
                            <Text style={styles.textType}>{item.type}</Text>
                            <View>
                                <Text style={styles.infor}>Weight: {item.weight} kg</Text>
                                <Text style={styles.infor}>Height: {item.height} cm</Text>
                                <Text style={styles.infor}>Age: {item.age}</Text>
                                <Text style={styles.infor}>Gender: {item.gender}</Text>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                                <Text style={styles.buttonText}>Pass away</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    box: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#8A4B01",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        padding: 15,
        margin: 10,
    },
    textBox: {
        color: "#8A4B01",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 5,
        fontWeight: "900",
        fontFamily: "AnonymousPro_bold",
    },
    imageUser: {
        width: 120,
        height: 130,
    },
    imageType: {
        width: 100,
        height: 130,
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textType: {
        color: "#8A4B01",
        fontSize: 17,
        fontFamily: "AnonymousPro",
        textAlign: "center",
        fontWeight: "semibold",
        marginBottom: 10,
    },
    infor: {
        color: "#8A4B01",
        fontFamily: "AnonymousPro",
        marginBottom: 3,
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#8A4B01",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },
});
