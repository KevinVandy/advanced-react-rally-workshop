import "./App.css";
import { useEffect, useState } from "react";
import { type Food } from "./food";

function App() {
  const [foods, setFoods] = useState<Array<Food>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getFoods() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/foods");
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const json = (await response.json()) as Array<Food>;
        setFoods(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    getFoods();
  }, []);

  function renderFoods() {
    return (
      <ul>
        {foods.map((food) => {
          return <li key={food.id}>{food.name}</li>;
        })}
      </ul>
    );
  }

  return (
    <>
      <h1>Menu</h1>
      {error ? <p>{error.message}</p> : null}
      {isLoading ? <p>Loading...</p> : renderFoods()}
    </>
  );
}

export default App;
