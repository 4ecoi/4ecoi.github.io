import { CharData, Power } from "@/types/global";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY } from "./Constants";


interface Props{
  index: number
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}
export default function PowerCard({index, setCharState, charState}: Props){
  const power: Power = charState.powers[index]
  const [targets, setTargets] = useState("")
  const changePowerName = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].name = val
    setCharState({...updatedChar})
  }
  const changePowerDesc = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].desc = val
    setCharState({...updatedChar})
  }
  const changePowerWeapon = (val: number) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].name = val
    setCharState({...updatedChar})
  }
  const changePowerTarget = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].target = val
    setCharState({...updatedChar})
  }
  const changePowerFreq = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].freq = val
    setCharState({...updatedChar})
  }
  const changePowerAbi = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].ability = val
    setCharState({...updatedChar})
  }
  const changePowerBonus = (val: number) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].bonus = val
    setCharState({...updatedChar})
  }
  const powerWeapon = useMemo(() => (
    charState.weapons[power.weapon]
  ), [charState])
  const totalMod = useMemo(() => (
    power.bonus + powerWeapon.enhc + powerWeapon.bonus + powerWeapon.profBonus + charState.levelBonus + charState.abilities[power.ability].mod
  ), [charState])

  const usePower = () => {
    let text = ""
    const targetArray = targets.split(",")
    targetArray.forEach((tar:string) => {
      if(tar.slice(-1) === "+") text += (`[[d20+${totalMod + 2} vs ${power.target} ${tar.substring(0, tar.length -1)}]] \n`)
      else text += (`[[d20+${totalMod} vs ${power.target} ${tar}]]\n`)
    })
    text += (`\n ${power.desc}`)
    navigator.clipboard.writeText(text)
  }

  const removePower = () => {
    const updatedCharPowers = [...charState.powers]
    updatedCharPowers.splice(index, 1)
    setCharState({
      ...charState,
      powers: [...updatedCharPowers]
    })
  }

  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 grid grid-cols-4"
      onClick={() => usePower()} 
    >
      <div className="w-60 mx-1">
        <input value={power.name} className="text-center w-full bg-gray-600 rounded-md" onChange={(e) => changePowerName(e.target.value)}/>
        <select 
          className="w-60 rounded-md bg-gray-600"
          value={power.weapon}
          onChange={(e) => changePowerWeapon(Number(e.target.value))}
        >
          {charState.weapons.map((weap, index)=> <option key={index} value={index} className="text-center"> {weap.name} </option>)}
        </select>
        <div className="grid text-center grid-cols-3">
          <select 
            className="rounded-md bg-gray-600"
            value={power.ability}
            onChange={(e) => changePowerAbi(e.target.value)}
          >
            {K_ABILITIES.map((abi, index)=> <option key={index} value={abi} className="text-center"> {abi} </option>)}
          </select>
          <p>vs</p>
          <select 
            className="rounded-md bg-gray-600"
            value={power.target}
            onChange={(e) => changePowerTarget(e.target.value)}
          >
            {K_DEFENSES.map((def, index)=> <option key={index} value={def} className="text-center"> {def} </option>)}
          </select>          
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 w-60">
          Bonus: <input value={power.bonus} className="text-center rounded-md bg-gray-600" onChange={(e) => changePowerBonus(Number(e.target.value))}/>
        </div>
        <div className="grid grid-cols-2 w-60">
          Type:  
          <select 
            className="rounded-md bg-gray-600 w-auto"
            value={power.freq}
            onChange={(e) => changePowerFreq(e.target.value)}
          >
            {K_POWER_FREQUENCY.map((freq, index)=> <option key={index} value={freq} className="text-center"> {freq} </option>)}
          </select> 
        </div>
        <div className="grid grid-cols-2 w-60">
          <>Targets:</>
          <input value={targets} className="text-center rounded-md bg-gray-600" onChange={(e) => setTargets(e.target.value)}/>
        </div>
      </div>
      <textarea className="mx-1 bg-gray-600 h-full text-sm text-center rounded-md w-60" onChange={(e) => changePowerDesc(e.target.value)} value={power.desc}/>
      <div>
        <button className="mx-1 bg-gray-600 h-8 text-sm text-center rounded-md my-1 w-60" onClick={usePower}>Copy to Clipboard</button>
        <button className="mx-1 bg-gray-600 h-8 text-sm text-center rounded-md w-60" onClick={removePower}>Delete</button>
      </div>
    </div>
  )
}