// Importerar React hooks
import { useState, useEffect } from "react";
import axios from "axios";

// Skapar en hook som hämtar recept
const useRecipes = (ingredients) => {
    // Sparar recept och laddningsstatus
    const [recipes, setRecipes] = useState([]); 
    const [loading, setLoading] = useState(false);
  
    // Kör när ingredients ändras
    useEffect (() => {
     // Om inga ingredienser, gör inget
      if (!ingredients) return; 

      // Börjar hämta data
      setLoading(true); 

      // Anropar Spoonacular API
      axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
        params: {
            ingredients: ingredients,
            number: 5, 
            apiKey: "893747d593ca4d56ada26778bcbf9b48"
        }
    })
     // När vi får data, spara i recipes
    .then((res) =>  setRecipes(res.data))
    // Om det blir fel, skriv ut i konsolen
    .catch((err) => console.error("Fel vid hämtning:", err))
    // När det är klart, sluta ladda
    .finally(() => setLoading (false));
 }, [ingredients]);
  
 return {recipes, loading};
};

export default useRecipes; 

