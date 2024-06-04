import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { K_DEFAULT_CONDITION, K_DEFAULT_POWER, K_DEFAULT_WEAPON } from "../Constants";
import CondCard from "./CondCard";
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
  const addWeapon = () => {
    setCharState({
      ...charState,
      weapons: [...charState.weapons, {...K_DEFAULT_WEAPON}]
    })
  }
  const addCond = () => {
    setCharState({
      ...charState,
      condMod: [...charState.condMod, {...K_DEFAULT_CONDITION}]
    })
  }

  return (
    <div className="mb-6">
      <h2 className="w-full text-center mb-1"> Weapons
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addWeapon}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {charState.weapons.map((_, index) => (
          <WeaponCard index={index} key={index} setCharState={setCharState} charState={charState}/>
        ))}
      </div>
      <h2 className="w-full text-center mb-1"> Conditions
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addCond}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {
          charState.condMod.map((_, index) =>(
            <CondCard charState={charState} setCharState={setCharState} index={index} key={index}/>
          ))
        }
      </div>
      <h2 className="w-full text-center mb-1"> Powers
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addPower}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {
          charState.powers.map((_, index) =>(
            <PowerCard charState={charState} setCharState={setCharState} index={index} key={index}/>
          ))
        }
      </div>
    </div>
  )
}