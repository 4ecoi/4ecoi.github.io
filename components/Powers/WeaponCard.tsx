import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";


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
    if(isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.weapons[index].enhc = e
    setCharState({...updatedChar})
  }
  const changeWeaponBonus = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.weapons[index].atkBonus = e
    setCharState({...updatedChar})
  }
  const changeWeaponDesc = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].desc = e
    setCharState({...updatedChar})
  }
  const changeWeaponProf = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.weapons[index].profBonus = e
    setCharState({...updatedChar})
  }
  const changeWeaponDice = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.weapons[index].dmgDice = e
    setCharState({...updatedChar})
  }
  const changeWeaponDmg = (e: number) => {
    if(isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.weapons[index].dmgBonus = e
    setCharState({...updatedChar})
  }
  const weap = charState.weapons[index]

  const removeWeapon = () => {
    const updatedCharWeapons = [...charState.weapons]
    updatedCharWeapons.splice(index, 1)
    setCharState({
      ...charState,
      weapons: [...updatedCharWeapons]
    })
  }

  return (
    <div
      className="flex relative flex-col px-4 w-96 group rounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div className="grid grid-cols-2 mb-1">
        <input className="text-center  mb-1 bg-gray-600 mx-2" onChange={(e) => changeWeaponName(e.target.value)} value={weap.name} />
        <div className="grid grid-cols-2 mb-1 mx-2">
          Enchant: <input value={weap.enhc} className="text-center  bg-gray-600" onChange={(e) => changeWeaponEnc(Number(e.target.value))}/>
        </div>
      </div>
      <div className="text-center grid grid-cols-4 pb-2">
        <div className="mx-2">
          <p>Prof</p>
          <input className="w-full text-center  bg-gray-600" onChange={(e) => changeWeaponProf(Number(e.target.value))} value={weap.profBonus} />
        </div>
        <div className="mx-2">
          <p>Atk+</p> 
          <input value={weap.atkBonus} className="w-full text-center  bg-gray-600" onChange={(e) => changeWeaponBonus(Number(e.target.value))}/>
        </div>
        <div className="mx-2">
          <p>Damage</p> 
          <input value={weap.dmgDice} className="w-full text-center  bg-gray-600" onChange={(e) => changeWeaponDice(e.target.value)}/>
        </div>
        <div className="mx-2">
          <p>Damage+</p> 
          <input value={weap.dmgBonus} className="w-full text-center  bg-gray-600" onChange={(e) => changeWeaponDmg(Number(e.target.value))}/>
        </div>
      </div>
      <textarea className="mx-1 bg-gray-600 h-full text-sm text-center  mb-1" onChange={(e) => changeWeaponDesc(e.target.value)} value={weap.desc}/>
      {
        charState.weapons.length > 1 ?
        <div style={{whiteSpace: "pre-wrap"}} onClick={removeWeapon} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>:
        null
      }
    </div>
  )
} 

