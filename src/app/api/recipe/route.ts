import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Configure the OpenAI API client

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


// server side
// serverless function aka lambda
export const POST = async (request : NextRequest) => {
    if (!openai.apiKey) {
        return NextResponse.json({ error: "OpenAI API key not configured." }, {status:500});
    }

    // getting json ingredients from client
    const payload = await request.json()

    const promptIngredients = prepareIngredientsForPrompt(payload)

    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": "You are a master chef recipe creator assistant who provides recipes with detailed ingredients, quantities and instructions which users can follow to create." },
        { "role": "user", "content": `Provide a unique recipe based off of the following ingredients: ${promptIngredients}` }],
        model: "gpt-3.5-turbo",
    });

    return NextResponse.json({message: payload}, {status: 200})
}

const prepareIngredientsForPrompt = (ingredients: any) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return "No ingredients provided."
    }

    const formattedIngredients = ingredients.map(ingredient => {
        if (ingredient.quantity && ingredient.ingredient) {
            return `${ingredient.quantity} of ${ingredient.ingredient}`
        } else if (ingredient.ingredient) {
            // In case quantity is not specified
            return ingredient.ingredient
        }

        return ''

    }).filter(Boolean); // Filter out any empty strings

    return formattedIngredients.join(', ')
}