import React, {useEffect, useState} from "react"
import { StyleSheet, View, Text, Dimensions, Image, StatusBar} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
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
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const RecipeSearch = ({ route, navigation }) => {
    // Obtener desde los parámetros de la navegación el término de búsqueda
    const { search } = route.params;
    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);

    // Datos temporales para evaluacion
    // const DATA=[
    //   {
    //     id: "1",
    //     title: "Pizza con cebolla",
    //     spoonacularScore: "25",
    //     summary: "asdasfasfasufhasffhaosdhaosuhfoaishfoaihodiasdoiasdoasdsfasfas",
    //   },

    //   {
    //     id: "2",
    //     title: "Pizza napolitada",
    //     spoonacularScore: "45",
    //     summary: "asdasfasfasufhasffhaosdhaosuhfoaishfoaihodiasdoiasdoasdsfasfas",
    //   },

    //   {
    //     id: "3",
    //     title: "Pizza de pollo",
    //     spoonacularScore: "50",
    //     summary: "asdasfasfasufhasffhaosdhaosuhfoaishfoaihodiasdoiasdoasdsfasfas",
    //   },
    // ]

    const getSearchRecipes = async () => {
        try {
          const response = await backend.get(`${apiUrl}complexSearch?query=${search}&apiKey=${apiKey}&number=20`);
          //https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=&number=20
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
        <Container style={{backgroundColor: '#F5F5F5'}}>
          {/* Logo de la aplicacion */}
          <View style={styles.logo}>
          <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
          </View>
          <FlatList
          data={recipes.results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>{
            return(
              <View>
                <TouchableOpacity onPress={() => {navigation.navigate("recipeInfoScreen", {id: item.id, imageType: item.imageType})}}>
                  <Card>
                    <View style={styles.mainContainer}>
                    <View style={styles.leftContainer}>
                      <View style={styles.image}>
                        <Image source={{uri: `${apiImageUrl}${item.id}-${apiImageSize}.${item.imageType}`}} style={styles.recipeImage}/>
                      </View>
                    </View>
                    <Card transparent style={styles.rightContainer}>
                      <CardItem header style={styles.cardheader}>
                        <H2>{item.title}</H2>
                      </CardItem>
                        {/* Quitamos spoonacularScore */}
                      <CardItem footer style={styles.cardfooter}>
                        <View style={styles.showDetails}>
                            <H3>Details</H3>
                            <Button icon>
                              <Icon><AntDesign name="arrowright" size={24} color="white" /></Icon>
                            </Button>
                          </View>
                      </CardItem>
                    </Card>
                  </View>
                  </Card>
                </TouchableOpacity>
              </View>
            )
          }}>

          </FlatList>
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

    mainContainer:{
      flexDirection: 'row',
      flex: 1,
    },

    leftContainer:{
      backgroundColor: '#F92626',
      alignItems: 'center',
      
    },

    image:{
      borderRadius: 15,
    },

    rightContainer:{
      flex: 3,
    },

    cardheader:{
      height: 40,
    },

    cardfooter:{
      height: 50,
    },

    showDetails:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },

    recipeImage: {
      width: 100,
      height: 100,
    },
});

export default RecipeSearch;
