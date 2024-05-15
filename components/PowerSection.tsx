import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { K_DEFAULT_POWER } from "./Constants";
import PowerCard from "./PowerCard";
import WeaponCard from "./WeaponCard";

interface Props{
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function PowerSection({charState, setCharState}: Props){
  const addPower = () => {
    setCharState({
      ...charState,
      powers: [...charState.powers, {...K_DEFAULT_POWER}]
    })
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="w-full text-center"> Weapons </h2>
        {charState.weapons.map((weap, index) => (
          <WeaponCard index={index} key={index} setCharState={setCharState} charState={charState}/>
        ))}
        <h2 className="w-full text-center"> Powers </h2>
        {
          charState.powers.map((_, index) =>(
            <PowerCard charState={charState} setCharState={setCharState} index={index} key={index}/>
          ))
        }
        <div className="flex flex-col items-center text-center grid-cols-1">
          <button className="text-xl py-2 my-1 cursor-pointer text-center w-60 rounded-lg border transition-colors border-neutral-700 bg-gray-600" onClick={addPower}>Add Power</button>
        </div>
      </div>
    </>
  )
}