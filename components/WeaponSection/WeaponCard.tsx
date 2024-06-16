import React from "react";
import { CharContext } from "@/app/context";
import { useContext } from "react";
import { isDiceString } from "../Shared/Functions";


interface Props{
  index: number
}
export default function WeaponCard({index}: Props){
  const {charData, setCharData} = useContext(CharContext)
  const changeWeaponName = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.weapons[index].name = e
    setCharData({...updatedChar})
  }
  const changeWeaponEnc = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.weapons[index].enhc = e
    setCharData({...updatedChar})
  }
  const changeWeaponBonus = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.weapons[index].atkBonus = e
    setCharData({...updatedChar})
  }
  const changeWeaponDesc = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.weapons[index].desc = e
    setCharData({...updatedChar})
  }
  const changeWeaponProf = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.weapons[index].profBonus = e
    setCharData({...updatedChar})
  }
  const changeWeaponDice = (e: string) => {
    if(!isDiceString(e)) return
    const updatedChar = {...charData}
    updatedChar.weapons[index].dmgDice = e
    setCharData({...updatedChar})
  }
  const changeWeaponDmg = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.weapons[index].dmgBonus = e
    setCharData({...updatedChar})
  }
  const weap = charData.weapons[index]

  const removeWeapon = () => {
    const updatedCharWeapons = [...charData.weapons]
    updatedCharWeapons.splice(index, 1)
    setCharData({
      ...charData,
      weapons: [...updatedCharWeapons]
    })
  }

  return (
    <div
      className="flex relative flex-col m-2 px-4 group rounded-lg parchment-bg border border-transparent py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
    >
      <div className="grid grid-cols-2 mb-1">
        <input className="text-center border-none mb-1 parchment-bg mx-2" onChange={(e) => changeWeaponName(e.target.value)} value={weap.name} placeholder="Weapon Name" />
        <div className="grid grid-cols-2 mb-1 mx-2">
          Enc: <input value={weap.enhc} className="text-center  parchment-bg" onChange={(e) => changeWeaponEnc(Number(e.target.value))}/>
        </div>
      </div>
      <div className="text-center grid grid-cols-4 pb-2">
        <div className="mx-2">
          <p>Prof</p>
          <input className="w-full text-center  parchment-bg" onChange={(e) => changeWeaponProf(Number(e.target.value))} value={weap.profBonus} />
        </div>
        <div className="mx-2">
          <p>Atk+</p> 
          <input value={weap.atkBonus} className="w-full text-center  parchment-bg" onChange={(e) => changeWeaponBonus(Number(e.target.value))}/>
        </div>
        <div className="mx-2">
          <p>Dmg</p> 
          <input value={weap.dmgDice} className="w-full text-center  parchment-bg" onChange={(e) => changeWeaponDice(e.target.value)}/>
        </div>
        <div className="mx-2">
          <p>Dmg+</p> 
          <input value={weap.dmgBonus} className="w-full text-center  parchment-bg" onChange={(e) => changeWeaponDmg(Number(e.target.value))}/>
        </div>
      </div>
      <textarea className="mx-1 parchment-bg h-full text-sm text-center  mb-1" onChange={(e) => changeWeaponDesc(e.target.value)} value={weap.desc}/>
      {
        charData.weapons.length > 1 ?
        <div style={{whiteSpace: "pre-wrap"}} onClick={removeWeapon} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>:
        null
      }
    </div>
  )
} 

