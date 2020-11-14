import React, {useEffect, useState} from "react"
import { StyleSheet, View, Dimensions, Image, SafeAreaView, ScrollView} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import {Spinner, 
  Container,
  Button,
  Icon,
  H3,
  Card
} from "native-base";
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
    //ejecto secuntario al consultar la api
    useEffect(() => {
        getSearchRecipes();
    }, []);

    //mostramos un spiner mientras se ejecuta el hook de efecto
    if (!recipes) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    }

    //se diseña la pantalla a retornar
    return (
        <Container style={{backgroundColor: '#DBDBDB'}}>
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
                  <Card style={{borderRadius: 15}}>
                    <View style={styles.mainContainer}>
                      <View style={styles.leftContainer}>
                        <View style={styles.image}>
                          <Image source={
                            item.image ?
                            ({ uri: `${apiImageUrl}${item.id}-${apiImageSize}.${item.imageType}` })
                            : require("../../assets/pizza.png")} style={styles.recipeImage}/>
                        </View>
                      </View>
                      <View style={styles.rightContainer}>
                        <SafeAreaView style={{flex:1}}>
                        <ScrollView style={styles.cardheader} contentContainerStyle={{flex: 1}} horizontal={true}>
                          <H3>{item.title}</H3>
                        </ScrollView>
                        </SafeAreaView>
                        <View style={styles.showDetails}>
                          <H3>Details</H3>
                          <Button icon transparent>
                            <Icon><AntDesign name="arrowright" size={24} color="red" /></Icon>
                          </Button>
                        </View>
                      </View>
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

///se crean los estilos a utilizar
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    logoApp: {
      width: width,
      height: height * 0.06,
      resizeMode: "contain",
      marginTop: 30
    },

    mainContainer:{
      flexDirection: 'row',
      flex: 1,
      height: height * 0.20,
      borderRadius: 15,
    },

    logo:{
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: 'white',
      paddingBottom: 5,
      marginBottom: 5
    },

    leftContainer:{
      backgroundColor: '#F92626',
      alignItems: 'center',
      paddingRight: 15,
      paddingLeft: 15,
      paddingTop: 15,
      borderBottomLeftRadius:15,
      borderTopLeftRadius: 15,
    },


    rightContainer:{
      flex: 1,
      paddingLeft:10,
      paddingTop:10,
      paddingRight:10
    },

    cardheader:{
      flex: 1,
    },

    cardfooter:{
      alignSelf: "flex-end"
    }, 

    showDetails:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderTopColor: 'red',
      borderTopWidth: 1,
    },

    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 3,
      },
  
});

export default RecipeSearch;
