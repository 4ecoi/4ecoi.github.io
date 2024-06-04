import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";


interface Props{
  index: number
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}
export default function FeatCard({index, setCharState, charState}: Props){
  const feat = charState.feats[index]

  const removeFeat = () => {
    const updatedCharFeats = [...charState.feats]
    updatedCharFeats.splice(index, 1)
    setCharState({
      ...charState,
      feats: [...updatedCharFeats]
    })
  }

  const changeFeatDesc = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.feats[index].desc = e
    setCharState({...updatedChar})
  }

  const changeFeatName = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.feats[index].name = e
    setCharState({...updatedChar})
  }
  const changeFeatSrc = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.feats[index].source = e
    setCharState({...updatedChar})
  }

  return (
    <div
      className="flex relative flex-col px-4 w-96 group rounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div className="grid grid-cols-3 mb-1 text-center">
        <div className="mx-1 text-center">
          <p>Source:</p>
          <input className="text-center bg-gray-600 w-full" value={feat.source} onChange={e => changeFeatSrc(e.target.value)}/>
        </div>
        <div className="col-span-2 text-center">
          <p>Name:</p>
          <input className="text-center mx-1 bg-gray-600 w-full" value={feat.name} onChange={e => changeFeatName(e.target.value)}/>
        </div>
      </div>
      <textarea className="mx-1 bg-gray-600 h-full text-sm text-center w-full mb-1" onChange={(e) => changeFeatDesc(e.target.value)} value={feat.desc}/>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeFeat} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
} 

