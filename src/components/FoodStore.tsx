import { useFoodStore } from "../store/foodStore"

export default function FoodStore() {

  const {fish, addOneFish, removeOneFish, removeAllFish} = useFoodStore();

  return (
    <div>
      <h2>FoodStore</h2>
      <h1>Fish: {fish}</h1>
      <button onClick={addOneFish}>Add a fish</button>
      <button onClick={removeOneFish}>Remove a fish</button>
      <button onClick={removeAllFish}>Remove all fish</button>
    </div>
  )
}
