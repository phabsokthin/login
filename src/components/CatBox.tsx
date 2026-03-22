
import { useCatStore } from "../store/catStore";

export default function CatBox() {
  const { cats, increaseBigCats, increaseSmallCats, sumary } = useCatStore();

  console.log(sumary());

  return (
    <div>
      <h2>CatBox</h2>
      <p>Big Cats: {cats.bigCats}</p>
      <p>Small Cats: {cats.smallCats}</p>
      <button onClick={increaseBigCats}>Add a big cat</button>
      <button onClick={increaseSmallCats}>Add a small cat</button>
    </div>
  );
}
