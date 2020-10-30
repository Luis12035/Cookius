import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import {Spinner} from "native-base";
import backend from "../api/backend"
import getEnvVars from "../../enviroment"

const { apiKey } = getEnvVars();

const { width, height } = Dimensions.get("window");

const homeScreen = ({ navigation }) => {

    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    const getRecipes = async () => {
        try {
          // Consultar la API de TheMovieDB
          const response = await backend.get(`random?apiKey=${apiKey}&number=10`);
    
          setRecipes(response.data);
        } catch (error) {
          // Error al momento de ejecutar la petición a la API
          setError(true);
        }
    }
    
    useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getRecipes();
    }, []);

    if (!recipes) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="blue" />
          </View>
        )
    }

    return (
    <View style={styles.container}>
        <Text>Esta es la pantalla Home desde la pantalla home.</Text>
        <StatusBar style="auto" />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default homeScreen;