import IngredientsForm from "./components/ingredients_form";

export default function Home() {
  return (
    <main className="main">
      <h1 className="title"> RecipeGPT</h1>
      <h2 className="subtitle">Create delicious recipes from any ingredients using artificial intelligence</h2>
      <h3 className="instruction"> Enter your ingredients below and press submit to generate a mouth-watering recipe.</h3>
      <section className="form-section">
        <IngredientsForm />
      </section>
    </main>
  )
}
