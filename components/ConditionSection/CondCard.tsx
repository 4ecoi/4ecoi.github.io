import { CharContext } from "@/app/context";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";


interface Props{
  index: number
}
export default function CondCard({index}: Props){
  const {charData, setCharData} = useContext(CharContext)

  const changeCondName = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.condMod[index].name = e
    setCharData({...updatedChar})
  }
  const changeCondActive = () => {
    const updatedChar = {...charData}
    updatedChar.condMod[index].isActive = !updatedChar.condMod[index].isActive
    setCharData({...updatedChar})
  }
  const changeCondAtkBonus = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.condMod[index].atkBonus = Number(e)
    setCharData({...updatedChar})
  }
  const changeCondDmgBonus = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.condMod[index].dmgBonus = e
    setCharData({...updatedChar})
  }

  const cond = charData.condMod[index]

  const removeCond = () => {
    const updatedConMod = [...charData.condMod]
    updatedConMod.splice(index, 1)
    setCharData({
      ...charData,
      condMod: [...updatedConMod]
    })
  }

  return (
    <div
      className="flex relative flex-col p-2 m-2 w-60 group rounded-lg border parchment-bg border-transparent transition-color"
    >
      <div className="grid grid-cols-3 mb-1">
        <input className="text-center justify-between col-span-2 mb-1 parchment-bg mx-2" placeholder="Mod Name" onChange={(e) => changeCondName(e.target.value)} value={cond.name} />
        <input type="checkbox" checked={cond.isActive} className="text-center justify-center mx-auto my-auto w-5 h-5 parchment-bg text-sm" onChange={changeCondActive}/>
      </div>
      <div className="text-center grid grid-cols-2 pb-2">
        <div className="mx-2">
          <p>Atk+</p>
          <input className="w-full text-center  parchment-bg" onChange={(e) => changeCondAtkBonus(e.target.value)} value={cond.atkBonus} />
        </div>
        <div className="mx-2">
          <p>Dmg+</p> 
          <input value={cond.dmgBonus} className="w-full text-center  parchment-bg" onChange={(e) => changeCondDmgBonus(e.target.value)}/>
        </div>
      </div>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeCond} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border p-2 text-xs parchment-bg opacity-40 group-hover:scale-100"><FaTrash/></div>
    </div>
  )
} 

