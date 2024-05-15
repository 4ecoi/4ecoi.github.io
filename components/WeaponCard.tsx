import { CharData, Power } from "@/types/global";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY } from "./Constants";


interface Props{
  index: number
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}
export default function WeaponCard({index, setCharState, charState}: Props){
  const changeWeaponName = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].name = e
    setCharState({...updatedChar})
  }
  const changeWeaponEnc = (e: number) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].enhc = e
    setCharState({...updatedChar})
  }
  const changeWeaponBonus = (e: number) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].bonus = e
    setCharState({...updatedChar})
  }
  const changeWeaponDesc = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].desc = e
    setCharState({...updatedChar})
  }
  const changeWeaponProf = (e: number) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].profBonus = e
    setCharState({...updatedChar})
  }
  const weap = charState.weapons[index]

  return (
    <div
      className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 grid grid-cols-3"
    >
      <div className="w-60 mx-1">
        <input className="text-center rounded-md mb-1 w-full bg-gray-600" onChange={(e) => changeWeaponName(e.target.value)} value={weap.name} />
        <div className="grid grid-cols-2 w-60">
          <p>P.Bonus:</p>
          <input className="text-center rounded-md bg-gray-600" onChange={(e) => changeWeaponProf(Number(e.target.value))} value={weap.profBonus} />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 mb-1 w-60">
          Enc: <input value={weap.enhc} className="text-center rounded-md bg-gray-600" onChange={(e) => changeWeaponEnc(Number(e.target.value))}/>
        </div>
        <div className="grid grid-cols-2 w-60">
          Bonus: <input value={weap.enhc} className="text-center rounded-md bg-gray-600" onChange={(e) => changeWeaponBonus(Number(e.target.value))}/>
        </div>
      </div>
      <textarea className="mx-1 bg-gray-600 h-full text-sm text-center rounded-md w-60" onChange={(e) => changeWeaponDesc(e.target.value)} value={weap.desc}/>
    </div>
  )
}