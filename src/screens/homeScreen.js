import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions, StatusBar, Image, FlatList, ScrollView} from "react-native";
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
        H1} from "native-base";
import backend from "../api/backend"
import getEnvVars from "../../enviroment"
import { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from 'react-native-render-html'; // importamos el componente que nos permite renderizar el texto html

const { apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const homeScreen = ({ navigation }) => {

    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [searcError, setSearchError] = useState(false);

    //Elemento Data de prueba par evitar realizar demaciadas consultas a la API.
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

    const getRecipes = async () => {
        try {
          // Consultar la API de TheMovieDB
          const response = await backend.get(`random?apiKey=${apiKey}&number=10`);
          //https://api.spoonacular.com/recipes/random?apiKey=&number=10
          setRecipes(response.data);
        } catch (error) {
          // Error al momento de ejecutar la petición a la API
          setError(true);
        }
    }

    const handlerSearch = () =>{
      if (!search) {
        setSearchError(true)
      }else
      {
        navigation.navigate("recipesSearchScreen", {search})
      }
    }
    
    useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getRecipes();
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
        <View style={styles.logo}>
          <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
        </View>
        <Header searchBar style={{backgroundColor: '#F5F5F5',}}>
          <Item style={styles.itemlogo}>
            <Input placeholder="Buscar" value={search} onChangeText={setSearch}/>
          </Item>
          <Right style={styles.searchButton}>
              <Button icon transparent onPress={() => handlerSearch}>
                <Icon><AntDesign name="search1" size={24} color="red" /></Icon>
              </Button>
            </Right>
      </Header>
      <FlatList 
        data={recipes.recipes}
        keyExtractor ={item => item.id.toString()}
        ListEmptyComponent={<Text>can't find recipes T_T!</Text>}
        renderItem={({item}) => {
          return(
            <View>
              <Card transparent style={styles.mainCard}>
                <View style={styles.mainContainer}>
                  <View style={styles.leftContainer}>
                    <View style={styles.image}>
                      <Image source={{uri: `${apiImageUrl}${item.id}-${apiImageSize}.${item.imageType}`}} style={styles.recipeImage}/> 
                    </View>
                  </View>
                  <View style={styles.rightContainer}>

                    <H3>{item.title}</H3>
                    <H3>Score: {item.spoonacularScore}</H3>
                    <View style={{height: height/4.5}}>
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate("recipeInfoScreen", {id: item.id, imageType: item.imageType})}}>
                      <View style={styles.showDetails}>
                        <H3>Details</H3>
                        <Button icon transparent>
                          <Icon><AntDesign name="arrowright" size={24} color="red" /></Icon>
                        </Button>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={styles.description}>
                    <HTML html={item.summary}/>
                  </ScrollView>
                </View>
              </Card>
            </View>
          )
        }}
      />
      </Container>
      );

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },

    logoApp: {
      width: width,
      height: height * 0.08,
      resizeMode: "contain",
    },

    itemlogo:{
      flex: 1,
      borderRadius: 35,
      paddingLeft: 10,
    },

    searchButton:{
      flex: 0.19,
      borderRadius: 15,
      color: 'red',
    },

    logo:{
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },

    mainContainer:{
      flexDirection: 'row',
      flex: 1,
      borderRadius: 15,
      backgroundColor: 'white',
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

    image:{
      borderRadius: 15,
    },

    rightContainer:{
      flex: 3,
      padding: 10,
    },

    showDetails:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    description:{
      position: 'absolute',
      backgroundColor: 'white',
      width: width/1.50,
      height: height /6,
      top: 120,
      left:50,
      borderRadius: 15,
      padding: 10,
      borderWidth: 0.75,
    },

    recipeImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      borderColor: 'white',
      borderWidth: 3,
    },

    mainCard:{
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
    }
  }
)

export default homeScreen;