import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Content, Text, H1, Spinner, Card } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const MovieInfoScreen = ({route, navigation}) => {
    // Obtener el id de la película
    const { id } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(false);

    const getMovieInfo = async () => { 
        try {
          const response = await backend.get(`${apiUrl}${id}/information?apikey=${apiKey}`);
          //https://api.spoonacular.com/recipes/636787/information?apiKey=07e9445ef5134f7d9ab5bbb0ffb089c3
    
          setRecipe(response.data);
        } catch(error) {
          setError(true);
        }
    };

    // Efecto secundario que ejecuta la consulta a la API
    useEffect(() => {
        getMovieInfo();
    }, []);

    if (!recipe) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    }
    return (
        <View style={styles.container}>
          <Text>Esta es la pantalla de Informacion de al receta</Text>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
});