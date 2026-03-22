import { useEffect, useState } from "react";
import { useBearStore } from "../store/bearStore";
import { useFoodStore } from "../store/foodStore";

export default function BearBox() {
  //   const bears = useBearStore((state) => state.bears);
  //   const increasePopulation = useBearStore((state) => state.increasePopulation);
  //   const removeAllBears = useBearStore((state) => state.removeAllBears);
  //   const descreasePopulation = useBearStore((state) => state.descreasePopulation);

  const { bears, increasePopulation, removeAllBears, descreasePopulation } =
    useBearStore();
  // const { fish } = useFoodStore();

  const [bgColor, setBgColor] = useState<"blue" | "red">("blue");

  useEffect(() => {
    const unsub = useFoodStore.subscribe((state, prev) => {
      if(prev.fish <= 5  && state.fish > 5){
        setBgColor("red")
      }
      else if(prev.fish > 5  && state.fish <= 5){ 
        setBgColor("blue")
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    // <div style={{ background: fish > 5 ? "green" : "white" }}>

    <div style={{ background: bgColor }}>
      <h2>BearBox</h2>
      <h3>{bears}</h3>
      <button onClick={increasePopulation}>Add a bear</button>
      <button onClick={descreasePopulation}>Remove a bear</button>
      <button onClick={removeAllBears}>Remove all bears</button>
      <button onClick={useBearStore.persist.clearStorage}>Clear All</button>
    </div>
  );
}
