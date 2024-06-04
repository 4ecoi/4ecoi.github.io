import { CharData, Power } from "@/types/global";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY } from "../Constants";


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
    updatedChar.powers[index].weapon = val
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
  const changeDiceRoll = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].atkRoll = val
    setCharState({...updatedChar})
  }
  const changeWpnMult = (val: number) => {
    if (isNaN(val)) return
    const updatedChar = {...charState}
    updatedChar.powers[index].wpnMult = val
    setCharState({...updatedChar})
  }
  const changeDmgBonus = (val: string) => {
    const updatedChar = {...charState}
    updatedChar.powers[index].dmgBonus = val
    setCharState({...updatedChar})
  }
  const powerWeapon = useMemo(() => (
    charState.weapons[power.weapon]
  ), [charState])

  const wpnBonus = useMemo(() => (
    powerWeapon.enhc + powerWeapon.atkBonus + powerWeapon.profBonus + charState.levelBonus + charState.abilities[power.ability].mod
  ), [charState])

  const tooltip = useMemo(() => `${charState.abilities[power.ability].mod} ${power.ability}\n
  ${charState.levelBonus} Level\n
  ${powerWeapon.enhc} Enchant\n
  ${powerWeapon.atkBonus} Bonus\n
  ${powerWeapon.profBonus} Prof`, [charState])

  const usePower = () => {
    let text = ""
    const activeConditions = charState.condMod.filter(cond => cond.isActive)
    const condAtkBonus = activeConditions.reduce((a,{atkBonus}) => atkBonus ? atkBonus[0] == "-" ? `${a+atkBonus}` : `${a}+${atkBonus}` : a, "")
    const condDmgBonus = activeConditions.reduce((a,{dmgBonus}) => dmgBonus ? dmgBonus[0] == "-" ? `${a+dmgBonus}` : `${a}+${dmgBonus}` : a, "")
    
    
    const targetArray = targets.split(",")
    targetArray.forEach((tar:string) => {
      text += `[[d20+${wpnBonus}`
      if(condAtkBonus) text+= condAtkBonus
      if(tar.slice(-1) === "+") text += (`+2 vs ${power.target} ${tar.substring(0, tar.length -1)}`)
      else text += (` vs ${power.target} ${tar}`)
      text += `]]\n`
    })

    if (power.wpnMult || (power.dmgBonus && power.dmgBonus !== "0")) {
      text += `[[`
      if (power.wpnMult){
        const wpnDieArr = powerWeapon.dmgDice.split("d")
        const wponDmgString = `${Number(wpnDieArr[0]) * power.wpnMult}d${Number(wpnDieArr[1])}`
        text += wponDmgString
      }
      text += `+${wpnDamageBonus}+${power.dmgBonus}`
      if(condDmgBonus) text+= condDmgBonus
      text += `]]`
    }
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

  const wpnDamageBonus = powerWeapon.dmgBonus + powerWeapon.enhc

  return (
    <div
      className="group relative flex flex-col items-center text-center px-4 w-96 rounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div>
        <div className="grid grid-cols-3">
        <div>
          <select 
            className=" bg-gray-600 w-full mx-1"
            value={power.freq}
            onChange={(e) => changePowerFreq(e.target.value)}
          >
            {K_POWER_FREQUENCY.map((freq, index)=> <option key={index} value={freq} className="text-center"> {freq} </option>)}
          </select> 
        </div>
        <input value={power.name} className=" bg-gray-600 col-span-2  mx-4 px-2 w-56" onChange={(e) => changePowerName(e.target.value)}/>
        </div>
        <div className="grid grid-cols-2 my-1">
          <select 
            className=" bg-gray-600 mx-1"
            value={power.weapon}
            onChange={(e) => changePowerWeapon(Number(e.target.value))}
          >
            {charState.weapons.map((weap, index)=> <option key={index} value={index} className="text-center"> {weap.name} </option>)}
          </select>
          <div className="grid text-center grid-cols-3">
            <select 
              className=" bg-gray-600 w-full"
              value={power.ability}
              onChange={(e) => changePowerAbi(e.target.value)}
            >
              {K_ABILITIES.map((abi, index)=> <option key={index} value={abi} className="text-center"> {abi} </option>)}
            </select>
            <p>vs</p>
            <select 
              className=" bg-gray-600 w-full"
              value={power.target}
              onChange={(e) => changePowerTarget(e.target.value)}
            >
              {K_DEFENSES.map((def, index)=> <option key={index} value={def} className="text-center"> {def} </option>)}
            </select>          
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 mb-1 text-center w-80">
          <div className="grid grid-cols-3">
            <input value={power.atkRoll} className="text-center col-span-2  bg-gray-600" onChange={(e) => changeDiceRoll(e.target.value)}/>
            <div className="relative group/wpnmod flex justify-center">
              <button className="rounded w-full text-sm text-white shadow-sm">+{wpnBonus}</button>
              <div style={{whiteSpace: "pre-wrap"}} className="absolute bottom-10 scale-0 rounded bg-gray-800 p-2 w-24 text-xs text-white group-hover/wpnmod:scale-100">{tooltip}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 w-full mr-1">
            <>tgt:</>
            <input value={targets} className="text-center col-span-2  bg-gray-600 mr" onChange={(e) => setTargets(e.target.value)}/>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 mx-1 w-80 mb-1 text-center">
          <input value={power.wpnMult} className="text-center bg-gray-600" onChange={(e) => changeWpnMult(Number(e.target.value))}/>
          <div className="relative group/wpnmod flex col-span-2  justify-center">
            <button className="rounded w-full text-sm text-white shadow-sm">{`[W]+${wpnDamageBonus}+`}</button>
          </div>
          <input value={power.dmgBonus} className="text-center col-span-2 bg-gray-600" onChange={(e) => changeDmgBonus(e.target.value)}/>
        </div>
      </div>
      <div className="grid">
      </div>
      <textarea className="mx-1 w-72 bg-gray-600 h-full text-sm text-center rounded-md p-2" onChange={(e) => changePowerDesc(e.target.value)} value={power.desc}/>
      <button className="p-2 mx-1 bg-gray-600 h-8 text-sm text-center  my-1 w-60" onClick={usePower}>copy to clipboard</button>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removePower} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded-full transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
}