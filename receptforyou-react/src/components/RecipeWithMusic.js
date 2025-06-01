import React from "react";

const musicMap = {
  tomato: "https://open.spotify.com/embed/playlist/37i9dQZF1DWU0ScTcjJBdj", // Exempel spotifyplaylist för tomat
  chicken: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1ck2oc2xAA0", // Kycklingmusik
  cheese: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2pSTOxoPbx9", // Ostmusik
  onion: "https://open.spotify.com/embed/playlist/37i9dQZF1DXa2PvUpywmrr", // Lökmusik
  "bell pepper": "https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt", // Paprika-musik
  rice: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt", // Rismusik (exempel)
  lettuce: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8VZPmy2i4r8", // Salladsmusik
  potato: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS", // Potatismusik
  default: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd", // Default musik
};

const RecipeWithMusic = ({ recipe, isFavorite, toggleFavorite }) => {
  const title = (recipe.strMeal || recipe.title || "").toLowerCase();

  // Kolla om någon ingrediens finns i titeln och välj första matchande musiken
  let spotifyUri = musicMap.default;
  for (const key in musicMap) {
    if (key !== "default" && title.includes(key)) {
      spotifyUri = musicMap[key];
      break;
    }
  }

  return (
    <div className="recipe-card">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(recipe);
        }}
        className="favorite-btn"
        aria-label={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {recipe.strMealThumb && (
        <img src={recipe.strMealThumb} alt={title} className="recipe-image" />
      )}

      <div className="recipe-card-content">
        <h3>{recipe.strMeal || recipe.title}</h3>
        <p>Redo på: {recipe.readyInMinutes || "Okänt"} minuter</p>
        <a
          href={recipe.sourceUrl || recipe.strSource || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Gå till recept
        </a>

        <iframe
          title="Spotify Playlist"
          src={spotifyUri}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          allowtransparency="true"
        ></iframe>
      </div>
    </div>
  );
};

export default RecipeWithMusic;
