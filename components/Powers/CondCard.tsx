import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";


interface Props{
  index: number
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}
export default function CondCard({index, setCharState, charState}: Props){
  const changeCondName = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.condMod[index].name = e
    setCharState({...updatedChar})
  }
  const changeCondActive = () => {
    const updatedChar = {...charState}
    updatedChar.condMod[index].isActive = !updatedChar.condMod[index].isActive
    setCharState({...updatedChar})
  }
  const changeCondAtkBonus = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.condMod[index].atkBonus = e
    setCharState({...updatedChar})
  }
  const changeCondDmgBonus = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.condMod[index].dmgBonus = e
    setCharState({...updatedChar})
  }

  const cond = charState.condMod[index]

  const removeCond = () => {
    const updatedConMod = [...charState.condMod]
    updatedConMod.splice(index, 1)
    setCharState({
      ...charState,
      condMod: [...updatedConMod]
    })
  }

  return (
    <div
      className="flex relative flex-col px-4 w-60 group rounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div className="grid grid-cols-3 mb-1">
        <input className="text-center justify-between col-span-2 mb-1 bg-gray-600 mx-2" onChange={(e) => changeCondName(e.target.value)} value={cond.name} />
        <input type="checkbox" checked={cond.isActive} className="text-center justify-center mx-auto my-auto w-5 h-5 bg-gray-600 text-sm" onChange={changeCondActive}/>
      </div>
      <div className="text-center grid grid-cols-2 pb-2">
        <div className="mx-2">
          <p>Atk+</p>
          <input className="w-full text-center  bg-gray-600" onChange={(e) => changeCondAtkBonus(e.target.value)} value={cond.atkBonus} />
        </div>
        <div className="mx-2">
          <p>Dmg+</p> 
          <input value={cond.dmgBonus} className="w-full text-center  bg-gray-600" onChange={(e) => changeCondDmgBonus(e.target.value)}/>
        </div>
      </div>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeCond} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
} 

