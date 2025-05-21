import React, { useState, useMemo } from "react";
import RecipePage from "./RecipePage";
import { recipes as unsortedRecipes } from "./data";

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Sort recipes alphabetically by name, memoized for performance
  const recipes = useMemo(() => {
    return [...unsortedRecipes].sort((a, b) => a.name.localeCompare(b.name));
  }, [unsortedRecipes]);

  if (selectedRecipe) {
    return (
      <RecipePage
        recipe={selectedRecipe}
        goBack={() => setSelectedRecipe(null)}
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Recipe Catalog</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {recipes.map((recipe, index) => (
          <button
            key={index}
            onClick={() => setSelectedRecipe(recipe)}
            style={{
              padding: "12px 16px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "#f9f9f9",
              textAlign: "left",
            }}
          >
            {recipe.name}
          </button>
        ))}
      </div>
    </div>
  );
}
