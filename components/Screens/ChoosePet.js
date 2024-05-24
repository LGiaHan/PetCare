import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChoosePet() {
    const navigation = useNavigation();
    const [petData, setPetData] = useState([]);
    const [filterTypePet, setFilterTypePet] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedPetText, setSelectedPetText] = useState("#000");
    const scaleValue = new Animated.Value(1);

    const fetchApi = async () => {
        try {
            const response = await fetch("https://66456de1b8925626f891d7d1.mockapi.io/listPet");
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
        setPetData(arrayData);
        setFilterTypePet(arrayData);
        console.log(petData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectPet = (petId) => {
        setSelectedPet(petId);
        setSelectedPetText("#fff");
        if (petId !== "All") {
            const filterFromCate = petData.filter((item) => item.typePet === petId);
            setFilterTypePet(filterFromCate);
        } else {
            setFilterTypePet(petData);
        }
    };
    const filterCategories = () => {
        const uniqueCategories = Array.from(new Set(petData.map((item) => item.typePet)));
        uniqueCategories.unshift("All");
        return uniqueCategories;
    };
    const uniqueCategories = filterCategories();

    // Lấy thông tin người dùng từ AsyncStorage khi component được mount
    useEffect(() => {
        const getUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem("username");
                if (storedUsername !== null) {
                    setUsername(storedUsername);
                }
            } catch (error) {
                console.error("Error getting user data:", error);
            }
        };
        getUserData();
    }, []);

    //choosePet
    const handleChoosePet = async (item) => {
        await AsyncStorage.setItem("InforPet", JSON.stringify(item));
        navigation.navigate("information");
    };
    return (
        <View style={styles.screenChoose}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Text style={styles.title}>Choose Your Favorite Pets:</Text>
                    <View style={styles.type}>
                        <Text style={{ color: "#8A4B01", fontSize: 16, fontFamily: "AnonymousPro" }}>
                            Welcome: <Text style={{ fontFamily: "AnonymousPro_bold", fontSize: 18 }}>{username || "Guest"}</Text> !
                        </Text>
                        <View style={styles.buttonType}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("mypet")}>
                                <Text style={styles.buttonText}>My Pet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("login")}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardListTypePet}>
                        <Text style={styles.pet}>Join our animal lovers community</Text>
                        <Image source={{ uri: "https://i.pinimg.com/564x/0d/c4/e2/0dc4e22273e4502823a22ed41dcd2f55.jpg" }} style={styles.image} />
                    </View>
                </View>
                <Text style={styles.categories}>Categories:</Text>
                <FlatList
                    data={uniqueCategories}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.chooseTypePet,
                                selectedPet === item && styles.chooseTypePetSelected,
                                {
                                    transform: [{ scale: selectedPet === item ? scaleValue : 1 }],
                                },
                            ]}
                            onPress={() => handleSelectPet(item)}
                        >
                            <Text style={[styles.chooseTypePetText, { color: selectedPet === item ? selectedPetText : "#000" }]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.listCate}
                />

                <FlatList
                    data={filterTypePet}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.box} onPress={() => handleChoosePet(item)}>
                            <Image source={{ uri: item.images }} style={styles.imageType} />
                            <View style={styles.textContainer}>
                                <View style={styles.name}>
                                    <Text style={styles.textBox}>{item.namePet}</Text>
                                    <Text style={styles.textType}>{item.typePet}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    screenChoose: {
        padding: 10,
        backgroundColor: "#fff",
    },
    title: {
        fontFamily: "AnonymousPro_bold",
        fontWeight: "900",
        fontSize: 21,
        color: "#8A4B01",
        marginVertical: 10,
    },
    cardContainer: {
        backgroundColor: "#ffc53b",
        borderRadius: 10,
        elevation: 5,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 10,
    },
    cardListTypePet: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 180,
        height: 200,
        borderRadius: 25,
    },
    pet: {
        width: "50%",
        fontFamily: "AnonymousPro_bold",
        fontSize: 17,
        color: "#8A4B01",
        fontWeight: "bold",
        paddingLeft: 25,
    },
    listCate: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    categories: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 10,
        fontFamily: "AnonymousPro_bold",
        marginBottom: 10,
        color: "#8A4B01",
    },
    chooseTypePet: {
        backgroundColor: "#D2EAF1",
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    chooseTypePetText: {
        fontFamily: "AnonymousPro",
        fontWeight: "normal",
        textAlign: "center",
        fontSize: 16,
        color: "#000",
    },
    chooseTypePetSelected: {
        backgroundColor: "#8A4B01",
        color: "#fff",
        borderRadius: 15,
        marginHorizontal: 5,
        fontFamily: "AnonymousPro",
    },
    imageType: {
        width: 120,
        height: 150,
        marginBottom: 20,
    },
    box: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 15,
        margin: 10,
    },
    textBox: {
        color: "#8A4B01",
        fontSize: 20,
        fontFamily: "AnonymousPro_bold",

        fontWeight: "900",
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
        fontWeight: "normal",
        marginTop: 8,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    name: {
        textAlign: "center",
    },
    type: {
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
    },
    buttonType: {
        flexDirection: "row",
        gap: 10,
    },
    button: {
        width: "30%",
        height: 30,
        borderWidth: 1,
        borderColor: "#8A4B01",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    buttonText: {
        color: "#8A4B01",
        fontSize: 13,
        fontWeight: "thin",
        fontFamily: "AnonymousPro",
    },
});
