import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions, Image, FlatList, ScrollView, SafeAreaView} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import {Spinner, 
        Header,
        Item,
        Input,
        Button,
        Icon,
        Right,
        H3,
        Card
      } from "native-base";
import backend from "../api/backend"
import getEnvVars from "../../enviroment"
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
          // Consultar la API
          const response = await backend.get(`random?apiKey=${apiKey}&number=10`);
          //https://api.spoonacular.com/recipes/random?apiKey=&number=10
          setRecipes(response.data);
        } catch (error) {
          // Error al momento de ejecutar la petición a la API
          setError(true);
        }
    };

    //Función encargada de limpiar las busquedas al momento de regresar a la pantalla de inicio
    const handlerSearch = () =>{
      if (!search) {
        setSearchError(true)
      }else
      {
        navigation.navigate("recipesSearchScreen", {search})
        setSearch("");
        setSearchError(false);
      }
    };
    
    useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getRecipes();
    }, []);

    //mostramos un spiner mientras se ejecuta el hook de efecto
    if (!recipes) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="red" />
          </View>
        )
    };

    //se diseña la pantalla a retornar
    return (
      <View style={{backgroundColor: '#DBDBDB'}}>
        <View style={styles.logo}>
          <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
        </View>
        <Header searchBar transparent androidStatusBarColor='#F92626' style={styles.headerStyle}>
          <Item style={styles.itemlogo}>
            <Input placeholder="Search" value={search} onChangeText={setSearch}/>
          </Item>
          <Right style={styles.searchButton}>
              <Button icon transparent onPress={() => handlerSearch()}>
                <Icon><AntDesign name="search1" size={24} color="red" /></Icon>
              </Button>
            </Right>
      </Header>
      <FlatList
        style={styles.flatList}
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
                      <Image source={
                        item.image ?
                        ({ uri: `${apiImageUrl}${item.id}-${apiImageSize}.${item.imageType}`})
                        : require("../../assets/pizza.png")
                      }
                      style={styles.recipeImage}/>
                    </View>
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.titleContainer} >{item.title}</Text>
                    </View>
                    <H3>Score: {item.spoonacularScore}</H3>
                    <SafeAreaView style={{flex:1}}>
                    <ScrollView style={styles.description} contentContainerStyle={{flex: 1}} horizontal={true} >
                      <HTML html={item.summary}/>
                    </ScrollView>
                    </SafeAreaView>
                    <TouchableOpacity onPress={() => {navigation.navigate("recipeInfoScreen", {id: item.id, imageType: item.imageType})}}>
                      <View style={styles.showDetails}>
                        <H3>Details</H3>
                        <Button icon transparent>
                          <Icon><AntDesign name="arrowright" size={24} color="red" /></Icon>
                        </Button>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )
        }}
      />
      </View>
      );

    
};

///se crean los estilos a utilizar
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
      marginTop: 30
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
      backgroundColor: 'white',
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
      zIndex: 1,
      backgroundColor: 'white',
      width: width/1.20,
      height: height /6,
      borderRadius: 15,
      padding: 10,
      borderWidth: 0.75,
      marginLeft: -120,
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
    },
    
    titleContainer: {
      height: 100,
      fontSize: 17,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    headerStyle:{
      backgroundColor: '#DBDBDB',
      height: height / 15,
      borderWidth: 0.23,
      borderColor: "black"
    },
    flatList: {
      height: height / 1.28,
      marginTop: 15,
      zIndex:2
    },

  }
)

export default homeScreen;