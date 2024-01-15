'use client'
import React, { useState } from "react";

interface IngredientField {
    quantity: string;
    ingredient: string;
}

export default function IngredientsForm() {
    const [ingredients, setIngredients] = useState<IngredientField[]>([
        { quantity: "", ingredient: "" },
    ]);

    const handleAddField = () => {
        setIngredients([...ingredients, { quantity: "", ingredient: "" }]);
    };

    // const handleRemoveField = (index: number) => {
    //     const newIngredients = ingredients.filter((_, i) => i !== index);
    //     setIngredients(newIngredients);
    // };

    const handleChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newIngredients = ingredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [event.target.name]: event.target.value };
            }
            return ingredient;
        });

        setIngredients(newIngredients);
    };

    const handleSubmit = (
    ) => {
        console.log('Form submitted.')
        ingredients.forEach(ingredient => {
            console.log(`Ingredient: ${ingredient.ingredient}, Quantity: ${ingredient.quantity}`)
        })

        fetch('/api/recipe', {method: 'POST', body: JSON.stringify(ingredients)})

    }

    return (
        <form>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <div>
                        <input
                            className="input-field"
                            name="ingredient"
                            value={ingredient.ingredient}
                            onChange={(event) => handleChange(index, event)}
                            placeholder="Ingredient"
                        />
                        <input
                            className="input-field"
                            name="quantity"
                            value={ingredient.quantity}
                            onChange={(event) => handleChange(index, event)}
                            placeholder="Quantity"
                        />
                    </div>
                </div>
            ))}
            <div>
                <button type="button" onClick={handleAddField} className="add-button">
                    +
                </button>
            </div>
            <div>
                <button type="button" onClick={handleSubmit} className="submit-button">
                    Submit
                </button>
            </div>
        </form>

    );
}

