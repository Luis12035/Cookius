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
    const { id, imageType } = route.params;
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
        <Container style={{backgroundColor: '#F5F5F5'}}>
         {/* Logo de la aplicacicon */}
          <View style={styles.logo}>
            <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
          </View>
          <ScrollView>
                <H1 style={{textAlign: 'center'}}>{recipe.title}</H1>
                <Card transparent style={styles.imgaRecipeContainer}>
                  <Image source={{uri: `${apiImageUrl}${recipe.id}-${apiImageSize}.${imageType}`}} style={styles.recipeImage}/>
                </Card>
                <H2>Description</H2>
                <View style={styles.infoRecipe}>
                  <HTML html={recipe.summary}/>
                </View>
                <H2>Ingredients</H2>
                <View style={styles.infoRecipe}>
                  {
                    recipe.extendedIngredients.map((ingredients, index) => (
                      <Text key={index}>{ingredients.original}</Text>))
                  } 
                </View>
                <H2>Preparation steps</H2>
                <View style={styles.infoRecipe}>
                  {
                    recipe[`analyzedInstructions`][0][`steps`].map((step, index) =>(
                      <Text key={index}>Step {index + 1}: {step.step}</Text>))    
                  } 
                </View>
              </ScrollView>
        </Container>
      );
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },

    logoApp: {
      width: width,
      height: height * 0.08,
      resizeMode: "contain",
    },

    imgaRecipeContainer:{
      alignItems: 'center',
      marginLeft: 15,
      marginRight: 15,
    },

    recipeImage: {
      width: width/1.1,
      height: height/4,
      borderRadius: 15,
    },

    infoRecipe:{
      marginBottom: 15,
      marginLeft: 25,
      marginRight: 25,
      padding: 15,
      //borderRadius: 15,
      // borderWidth: 0.25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 5.00,

      elevation: 3,
    }
});

export default RecipeInfo;