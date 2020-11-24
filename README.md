<p align="center">
  <img src="assets/Logo_Cookius.png">
</p>


# Cookius
Es una aplicacion que permite obtener informacion de recetas por medio de la APi de [`spoonacular`](https://spoonacular.com/food-api), realizar busquedas y ver los pasos
para las pereparaciones de las recetas que mas te guste.

## Pantallas

<div style="flex-direction: row" align="center">
  <table>
    <tr>
      <td align="center">
      <img src="https://cdn.discordapp.com/attachments/427197735247020073/780638990272692254/Screenshot_20201123_204953_host.exp.exponent.jpg" height=400 width=200>
      <h6>Pantalla de inicio de la aplicación</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/427197735247020073/780638988854624286/Buscando.gif" height=400 width=200>
        <h6>Proceso de busqueda de recetas</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/427197735247020073/780638989237223484/Screenshot_20201123_205110_host.exp.exponent.jpg" height=400 width=200>
        <h6>Pantalla de la información detallada de la receta</h6>
      </td>
    </tr>
  </table>
</div>

## Tecnologías utilizadas
- React native
- Expo
- React navigation
- NativeBase
- Axios
- Expo vector icons
- React native render html
- React native web view

## Instrucciones para la instalación

Clona este repositorio. Necesitas tener instalado <code>node</code>, <code>npm</code> y <code>expo-cli</code> de manera global en tu computadora.

spoonacular api key: <br>
Para que la aplicación pueda funcionar, requieres de una API key válida para poder comunicarte con la API de spoonacular. Cookius.
Para obtenerla visita [`obtener API key spoonacular`](https://spoonacular.com/food-api/console#Dashboard)

Una vez que obtengas tu API key, debes crear el archivo <code>enviroment.js</code> en la raíz del directorio y configurarlo de la siguiente manera:
<br>
<br>

```js
import Constants from "expo-constants"

const ENV = {
    dev: {
        apiUrl: "https://api.spoonacular.com/recipes/",
        apiKey: "Tu api key",
        apiImageUrl: "https://spoonacular.com/recipeImages/",
        apiImageSize: "636x393",
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev;
    }
};

export default getEnvVars;
```
<br>

Instalación:<br>
<code>npm install</code>

Iniciar Expo Metro:<br>
<code>expo start</code>

