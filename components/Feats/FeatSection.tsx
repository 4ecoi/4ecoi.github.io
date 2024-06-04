import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { K_DEFAULT_FEAT, K_DEFAULT_POWER, K_DEFAULT_WEAPON } from "../Constants";
import FeatCard from "./FeatCard";

interface Props{
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function FeatSection({charState, setCharState}: Props){
  const addFeat = () => {
    setCharState({
      ...charState,
      feats: [...charState.feats, {...K_DEFAULT_FEAT}]
    })
  }

  return (
    <div className="mb-6">
      <h2 className="w-full text-center mb-1"> Feats
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addFeat}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {charState.feats.map((_, index) => (
          <FeatCard index={index} key={index} setCharState={setCharState} charState={charState}/>
        ))}
      </div>
      <div className="flex flex-col items-center text-center grid-cols-1">
        
      </div>
    </div>
  )
}