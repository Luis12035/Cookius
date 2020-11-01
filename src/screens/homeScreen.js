import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions, StatusBar, Image, FlatList} from "react-native";
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

const { apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const homeScreen = ({ navigation }) => {

    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    const DATA=[
      {
        title: "Pizza con cebolla",
        spoonacularScore: "25",
        summary: "asdasfasfasufhasffhaosdhaosuhfoaishfoaihodiasdoiasdoasdsfasfas",
      }
    ]

    // const getRecipes = async () => {
    //     try {
    //       // Consultar la API de TheMovieDB
    //       const response = await backend.get(`random?apiKey=${apiKey}&number=10`);
    
    //       setRecipes(response.data);
    //     } catch (error) {
    //       // Error al momento de ejecutar la petición a la API
    //       setError(true);
    //     }
    // }
    
    // useEffect(() => {
    // // Efecto secundario realizar la petición a la API
    // getRecipes();
    // }, []);

    // if (!recipes) {
    //     return (
    //       <View style={{flex: 1, justifyContent: "center"}}>
    //         <Spinner color="red" />
    //       </View>
    //     )
    // }

    return (
      <Container>
        <View style={styles.logo}>
          <Image source={require("../../assets/Logo_Cookius.png")} style={styles.logoApp  }></Image>
        </View>
        <Header searchBar>
          <Item style={styles.itemlogo}>
            <Input placeholder="Buscar" value={search}/>
          </Item>
          <Right style={styles.searchButton}>
              <Button light icon>
                <Icon name="search"></Icon>
              </Button>
            </Right>
      </Header>
      <H3 style={styles.tituloCualquiera}>Titulo cualquiera</H3>
      <FlatList 
        data={DATA}
        keyExtractor ={(item) => item.id}
        ListEmptyComponent={<Text>¡No se han encontrado recetas T_T!</Text>}
        renderItem={({item}) => {
          return(
            <View>
              <TouchableOpacity>
                <Card>
                  <View style={styles.mainContainer}>
                    <View style={styles.leftContainer}>
                      <View style={styles.image}>
                        <Image source={require("../../assets/pizza.png")} style={styles.recipeImage}/> 
                      </View>
                    </View>
                    <View style={styles.rightContainer}>

                      <H3>{item.title}</H3>
                      <H3>{item.spoonacularScore}</H3>
                      <View style={{borderWidth: 3, height: 75,}}>

                      </View>
                      <View style={styles.showDetails}>
                        <H3>Detalles</H3>
                        <Button icon>
                          <Icon name="search"></Icon>
                        </Button>
                      </View>
                    </View>
                    <View style={styles.description}>
                        <Text>
                          {item.summary}
                        </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
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
    },

    searchButton:{
      flex: 0.19,
    },

    logo:{
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
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
      padding: 10,
    },

    showDetails:{
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },

    description:{
      borderWidth: 3,
      position: 'absolute',
      backgroundColor: 'grey',
      width: width/1.50,
      top: 59,
      left:25,
    },

    recipeImage: {
      width: 128,
      height: 128,
    },
  }
)

export default homeScreen;