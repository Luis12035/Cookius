import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, Text, ScrollView} from "react-native";
import {Spinner, 
  Container,
  Card,
  H1,
  H2} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import HTML from 'react-native-render-html'; // importamos el componente que nos permite renderizar el texto html

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

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

    //mostramos un spiner mientras se ejecuta el hook de efecto
    if (!recipe) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    }

    //se diseña la pantalla a retornar
    return (
        <Container style={{backgroundColor: '#DBDBDB'}}>
         {/* Logo de la aplicacicon */}
          <View style={styles.logo}>
            <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
          </View>
          <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom:10}}>
                <H1 style={styles.titles}>{recipe.title}</H1>
                <Card transparent style={styles.imgaRecipeContainer}>
                  <Image source={{uri: `${apiImageUrl}${recipe.id}-${apiImageSize}.${imageType}`}} style={styles.recipeImage}/>
                </Card>
                <H2 style={styles.titles} >Description</H2>
                <View style={styles.infoRecipe}>
                  <HTML html={recipe.summary}/>
                </View>
                <H2 style={styles.titles} >Ingredients</H2>
                <View style={styles.infoRecipe}>
                  {
                    recipe.extendedIngredients.map((ingredients, index) => (
                      <Text key={index}>{ingredients.original}</Text>))
                  } 
                </View>
                <H2 style={styles.titles} >Preparation steps</H2>
                <View style={styles.infoRecipe}>
                  {
                    recipe[`analyzedInstructions`][0][`steps`].map((step, index) =>(
                      <Text key={index} style={{flexDirection: 'row'}} > <Text style={{fontWeight: 'bold'}} >Step {index + 1}:</Text> {step.step}</Text>
                      ))    
                  } 
                </View>
              </ScrollView>
        </Container>
      );
}

//se crean los estilos a utilizar
const styles = StyleSheet.create({
    logoApp: {
      width: width,
      height: height * 0.06,
      resizeMode: "contain",
      marginTop: 30
    },
    
    logo:{
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: 'white',
      paddingBottom: 5
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
      borderColor: 'white',
      borderWidth: 3,
    },

    infoRecipe:{
      backgroundColor: "#fff",
      padding: 10,
      width: width/1.1,
      borderRadius:15,
      borderLeftColor: '#F92626',
      borderLeftWidth: 25,
    },

    titles: {
      marginBottom: 10,
      marginTop:10,
      borderBottomColor: 'red',
      borderBottomWidth: 1,
    },


  });
  
export default RecipeInfo;