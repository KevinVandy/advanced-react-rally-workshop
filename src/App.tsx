import "./App.css";
import { useFoods } from "./queries/useFoods";

function App() {
  const { data: foods, error, isLoading } = useFoods();

  function renderFoods() {
    return (
      <ul>
        {foods?.map((food) => {
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
