import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const InformationPet = () => {
    const navigation = useNavigation();
    const [inforPet, setInforPet] = useState({});
    const [namePet, setNamePet] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [userId, setUserId] = useState("");

    const handleInput = async () => {
        const savePet = {
            id: inforPet.id,
            image: inforPet.images,
            type: inforPet.namePet,
            name: namePet,
            weight: weight,
            height: height,
            age: age,
            gender: gender,
        };
        try {
            const response = await axios.get("https://66456de1b8925626f891d7d1.mockapi.io/user/" + userId);
            if (!response.data) {
                throw new Error("No data received");
            }

            let users = response.data;
            const arrPet = users.pet;
            arrPet.push(savePet);
            users.pet = arrPet;
            const result = await axios.put("https://66456de1b8925626f891d7d1.mockapi.io/user/" + userId, users);
            if (result.status == 200) {
                navigation.navigate("detail");
                console.log("ok");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            AsyncStorage.getItem("InforPet")
                .then((jsonInforPet) => {
                    if (jsonInforPet !== null) {
                        const inforPet = JSON.parse(jsonInforPet);
                        setInforPet(inforPet);
                    } else {
                        console.log("Không tìm thấy đối tượng trong AsyncStorage");
                    }
                })
                .catch((error) => console.error("Lỗi khi lấy đối tượng từ AsyncStorage:", error));
        };
        getUserData();

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
        getUserID();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.box}>
                    <Image source={{ uri: inforPet.images }} style={styles.image} />
                    <Text style={{ color: "#8A4B01", fontSize: 17, fontFamily: "AnonymousPro_bold" }}>
                        Breed: <Text>{inforPet.namePet}</Text>
                    </Text>
                </View>
                <Text style={{ color: "#8A4B01", fontFamily: "AnonymousPro_bold", textAlign: "center", marginBottom: 20, fontSize: 18 }}>Form Pet's information </Text>
                <View>
                    <View style={styles.inputParent}>
                        <Text style={styles.textPet}>Name:</Text>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={setNamePet} value={namePet} />
                    </View>
                    <View style={styles.inputParent}>
                        <Text style={styles.textPet}>Weight: (kg)</Text>
                        <TextInput style={styles.input} placeholder="Weight" keyboardType="numeric" onChangeText={setWeight} value={weight} />
                    </View>
                    <View style={styles.inputParent}>
                        <Text style={styles.textPet}>Height: (cm)</Text>
                        <TextInput style={styles.input} placeholder="Height" keyboardType="numeric" onChangeText={setHeight} value={height} />
                    </View>
                    <View style={styles.inputParent}>
                        <Text style={styles.textPet}>Age:</Text>
                        <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" onChangeText={setAge} value={age} />
                    </View>
                    <View style={styles.inputParent}>
                        <Text style={styles.textPet}>Gender:</Text>
                        <View style={styles.radioContainer}>
                            <TouchableOpacity style={styles.radioButton} onPress={() => setGender("boy")}>
                                <View style={gender === "boy" ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                                <Text style={styles.radioText}>Boy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.radioButton} onPress={() => setGender("girl")}>
                                <View style={gender === "girl" ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                                <Text style={styles.radioText}>Girl</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleInput}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#8A4B01",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        padding: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    textPet: {
        fontFamily: "AnonymousPro_bold",
        color: "#8A4B01",
        width: 60,
        fontSize: 15,
        marginBottom: 6,
    },
    inputParent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    image: {
        width: 120,
        height: 150,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#8A4B01",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
        marginVertical: 15,
    },
    radioButtonUnselected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        marginRight: 8,
    },
    radioButtonSelected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        marginRight: 8,
        backgroundColor: "#000",
    },
    radioText: {
        fontSize: 16,
        fontFamily: "AnonymousPro",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#8A4B01",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default InformationPet;
