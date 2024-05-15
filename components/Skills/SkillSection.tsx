import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { K_SKILLS } from "../Constants";
import SkillRow from "./SkillRow";

interface Props{
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function SkillSection({charState, setCharState}: Props){
  return (
    <>
      <div className="grid mb-1 text-center grid-cols-7 cursor-pointer">
        <div className="w-40 mx-2">Skill</div>
        <div className="w-40 mx-2">Ability</div>
        <div className="w-40 mx-2">Trained</div>
        <div className="w-40 mx-2">Feat</div>
        <div className="w-40 mx-2">Item</div>
        <div className="w-40 mx-2">Untyped</div>
        <div className="w-40 mx-2">Mod</div>
      </div>
      {K_SKILLS.map((key) => (
        <SkillRow
          key={key} 
          skillName={key}
          skill={charState.skills[key]}
          setCharState={setCharState}
          charState={charState}
        />
      ))}
    </>
  )
}