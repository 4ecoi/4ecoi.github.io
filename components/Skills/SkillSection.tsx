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