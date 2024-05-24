import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";

export default function Index() {
    const handlePress = () => {
        console.log("Get Start button pressed");
        // Thêm logic xử lý khi nút được nhấn vào đây
    };
    return (
        <ImageBackground source={{ uri: "https://i.pinimg.com/564x/8d/56/b7/8d56b7f2c721d18c6360f6d961eb733f.jpg" }} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.container}>
                <Text style={styles.title}>HealthCare Pets</Text>
                <Text style={styles.descrip}>Take care of a pet is favorite many people. It help you to gaimr stress and fatigue</Text>
                <Image source={{ uri: "https://i.pinimg.com/564x/c3/c8/a7/c3c8a7826e6f7ea654c3b39f8b1ddf3d.jpg" }} style={styles.image} />
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Get Start</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        alignItems: "center",
    },

    title: {
        marginTop: 150,
        fontSize: 30,
        fontWeight: "bold",
        color: "#8A4B01",
    },
    descrip: {
        fontSize: 16,
        width: "80%",
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
        color: "#8A4B01",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#EFBF28",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});
