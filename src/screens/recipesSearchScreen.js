import react, {useEffect, useState} from "react"
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { Container, H1, Spinner, Card, CardItem, Body, H3 } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import {FlatList} from "react-native-gesture-handler";

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const RecipeSearch = ({ route, navigation }) => {
    // Obtener desde los parámetros de la navegación el término de búsqueda
    const { search } = route.params;
    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);

    const getSearchRecipes = async () => {
        try {
          const response = await backend.get(`${apiUrl}complexSearch?query=${search}&api_key=${apiKey}&number=20`);
    
          setRecipes(response.data);
        } catch (error) {
          setError(true);
        }
    }

    useEffect(() => {
        getSearchRecipes();
    }, []);

    if (!recipes) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    }
    return (
        <View style={styles.container}>
          <Text>Esta es la pantalla de la busqueda de receta</Text>
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

