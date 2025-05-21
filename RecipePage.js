import React, { useState } from "react";

export default function RecipePage({ recipe, goBack }) {
  // State for ingredient quantities
  const [quantities, setQuantities] = useState(
    recipe.ingredients.map((ing) => ing.quantity)
  );

  // State for servings, default to recipe.servings or 1
  const [servings, setServings] = useState(recipe.servings || 1);

  // Update quantity for ingredient at index
  function updateQuantity(index, newQty) {
    if (newQty < 0) newQty = 0;
    setQuantities((q) => {
      const copy = [...q];
      copy[index] = newQty;
      return copy;
    });
  }

  // Update servings (minimum 1)
  function updateServings(newServings) {
    if (newServings < 1) newServings = 1;
    setServings(newServings);
  }

  // Calculate total macros based on current quantities
  const totalMacros = quantities.reduce(
    (totals, qty, i) => {
      const macros = recipe.ingredients[i].macros_per_unit;
      totals.calories += macros.calories * qty;
      totals.protein += macros.protein * qty;
      totals.fat += macros.fat * qty;
      totals.carbs += macros.carbs * qty;
      return totals;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}>
      <button
        onClick={goBack}
        style={{
          marginBottom: 20,
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: 6,
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        ← Back to catalog
      </button>

      <h2>{recipe.name}</h2>

      <h3>Ingredients</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recipe.ingredients.map((ingredient, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              gap: 8,
            }}
          >
            <button
              onClick={() => updateQuantity(i, quantities[i] - 1)}
              style={{ padding: "4px 8px" }}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              value={quantities[i]}
              onChange={(e) => updateQuantity(i, Number(e.target.value))}
              style={{ width: 60, textAlign: "center" }}
            />
            <button
              onClick={() => updateQuantity(i, quantities[i] + 1)}
              style={{ padding: "4px 8px" }}
            >
              +
            </button>
            <span>
              {ingredient.unit} {ingredient.name}
            </span>
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      {/* Servings input */}
      <div style={{ marginTop: 20 }}>
        <label htmlFor="servingsInput" style={{ fontWeight: "bold" }}>
          Servings:{" "}
        </label>
        <input
          id="servingsInput"
          type="number"
          min="1"
          value={servings}
          onChange={(e) => updateServings(Number(e.target.value))}
          style={{ width: 60, textAlign: "center" }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Macros per serving</h3>
        <p>Calories: {(totalMacros.calories / servings).toFixed(0)}</p>
        <p>Protein: {(totalMacros.protein / servings).toFixed(1)} g</p>
        <p>Fat: {(totalMacros.fat / servings).toFixed(1)} g</p>
        <p>Carbs: {(totalMacros.carbs / servings).toFixed(1)} g</p>
      </div>

      <div style={{ marginTop: 10 }}>
        <h3>Total macros</h3>
        <p>Calories: {totalMacros.calories.toFixed(0)}</p>
        <p>Protein: {totalMacros.protein.toFixed(1)} g</p>
        <p>Fat: {totalMacros.fat.toFixed(1)} g</p>
        <p>Carbs: {totalMacros.carbs.toFixed(1)} g</p>
      </div>
    </div>
  );
}
