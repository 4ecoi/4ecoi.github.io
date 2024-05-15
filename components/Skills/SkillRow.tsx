import { CharData, Skill } from "@/types/global"
import { Dispatch, SetStateAction, useMemo } from "react"
import { K_ABILITIES } from "../Constants"

interface Props {
  skillName: string
  skill: Skill
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
}

export default function SkillRow({skillName, skill, setCharState, charState}: Props) {
  const changeAbility = (value: string) => {
    const updatedChar = {...charState}
    updatedChar.skills[skillName].ability = value
    setCharState({...updatedChar})
  }
  const changeTrained = () => {
    const updatedChar = {...charState}
    updatedChar.skills[skillName].trained = !updatedChar.skills[skillName].trained
    setCharState({...updatedChar})
  }
  const changeFeat = (value: number) => {
    const updatedChar = {...charState}
    updatedChar.skills[skillName].feat = value
    setCharState({...updatedChar})
  }
  const changeItem = (value: number) => {
    const updatedChar = {...charState}
    updatedChar.skills[skillName].item = value
    setCharState({...updatedChar})
  }
  const changeUntyped = (value: number) => {
    const updatedChar = {...charState}
    updatedChar.skills[skillName].untyped = value
    setCharState({...updatedChar})
  }
  const skillMod = useMemo(() => (
    skill.trained ?
    (charState.abilities[skill.ability].mod + charState.levelBonus + skill.feat + skill.item + skill.untyped + 5) :
    (charState.abilities[skill.ability].mod + charState.levelBonus + skill.feat + skill.item + skill.untyped)
  ), [charState])
  const skillCheck = () => {navigator.clipboard.writeText(`[[d20+${skillMod} ${skillName} check]]`)}
  
  return (
    <div className="grid mb-1 text-center grid-cols-7 cursor-pointer" onClick={skillCheck}>
      <div className="w-40 mx-2 rounded-md">{skillName}</div>
      <select 
        className="w-40 mx-2 rounded-md bg-gray-600"
        value={skill.ability}
        onChange={(e) => changeAbility(e.target.value)}
      >
        {K_ABILITIES.map((ability)=> <option key={ability} value={ability} className="text-center"> {ability} </option>)}
      </select>
      <input type="checkbox" className="w-40 mx-2 rounded-md" onChange={changeTrained} checked={skill.trained}/>
      <input className="w-40 mx-2 rounded-md bg-gray-600 text-center" onChange={(e) => changeFeat(Number(e.target.value))} value={skill.feat} />
      <input className="w-40 mx-2 rounded-md bg-gray-600 text-center" onChange={(e) => changeItem(Number(e.target.value))} value={skill.item} />
      <input className="w-40 mx-2 rounded-md bg-gray-600 text-center" onChange={(e) => changeUntyped(Number(e.target.value))} value={skill.untyped} />
      <div className="w-40 mx-2 rounded-md">{skillMod}</div>
    </div>
  )
}
