import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, StatusBar, Text, ScrollView} from "react-native";
import {Spinner, 
  Container,
  Header,
  Item,
  Input,
  Button,
  Icon,
  Right,
  H3,
  Card,
  CardItem,
  Body,
  H1,
  H2} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList } from "react-native-gesture-handler";
import HTML from 'react-native-render-html'; // importamos el componente que nos permite renderizar el texto html

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");
let recipes =0;

const RecipeInfo = ({route, navigation}) => {
    // Obtener el id de la película
    const { id } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(false);

    // Datos temporales para evaluacion
    

    const getRecipeInfo = async () => { 
        try {
          const response = await backend.get(`${apiUrl}${id}/information?apiKey=${apiKey}`);
          //https://api.spoonacular.com/recipes/636787/information?apiKey=
    
          setRecipe(response.data);
        } catch(error) {
          setError(true);
        }
    };

    // Efecto secundario que ejecuta la consulta a la API
    useEffect(() => {
        getRecipeInfo();
    }, []);

    if (!recipe) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    }


    return (
        <Container>
         {/* Logo de la aplicacicon */}
          <View style={styles.logo}>
            <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
          </View>
          <ScrollView>
                <H1 style={{textAlign: 'center'}}>{recipe.title}</H1>
                <Card style={styles.imgaRecipeContainer}>
                  <Image source={{uri: `${apiImageUrl}${recipe.id}-${apiImageSize}.${recipe.imageType}`}} style={styles.recipeImage}/>
                </Card>
                <H3>Descripción</H3>
                <Card>
                  <CardItem>
                    <Body>
                      <HTML html={recipe.summary}/>
                    </Body>
                  </CardItem>
                </Card>
                <H3>Ingredientes</H3>
                <Card>
                  <CardItem>
                    <Body>
                      {
                        recipe.extendedIngredients.map((ingredients) => (
                        <Text key={ingredients.id}>{ingredients.original}</Text>))
                      }
                    </Body>
                  </CardItem>
                </Card>
                <H3>Preparación</H3>
                <Card>
                  <CardItem>
                    <Body>
                      {
                        recipe[`analyzedInstructions`][0][`steps`].map((step) =>(
                        <Text key={step.number}>Paso {step.number}: {step.step}</Text>
                        ))
                        
                      }
                    </Body>
                  </CardItem>
                </Card>
              </ScrollView>
        </Container>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    logoApp: {
      width: width,
      height: height * 0.08,
      resizeMode: "contain",
    },

    imgaRecipeContainer:{
      alignItems: 'center',
    },

    recipeImage: {
      width: width,
      height: 128,
    },
});

export default RecipeInfo;