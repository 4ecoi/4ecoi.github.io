import React from "react";
import { CharContext } from "@/app/context";
import { useContext } from "react";


interface Props{
  index: number
}
export default function FeatCard({index}: Props){
  const {charData, setCharData} = useContext(CharContext)
  const feat = charData.feats[index]

  const removeFeat = () => {
    const updatedCharFeats = [...charData.feats]
    updatedCharFeats.splice(index, 1)
    setCharData({
      ...charData,
      feats: [...updatedCharFeats]
    })
  }

  const changeFeatDesc = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.feats[index].desc = e
    setCharData({...updatedChar})
  }

  const changeFeatName = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.feats[index].name = e
    setCharData({...updatedChar})
  }
  const changeFeatSrc = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.feats[index].source = e
    setCharData({...updatedChar})
  }

  return (
    <div
      className="flex relative flex-col px-4 w-96 group rounded-lg border border-transparent py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
    >
      <div className="grid grid-cols-3 mb-1 text-center">
        <div className="mx-1 text-center">
          <p>Source:</p>
          <input className="text-center parchment-bg w-full" value={feat.source} onChange={e => changeFeatSrc(e.target.value)}/>
        </div>
        <div className="col-span-2 text-center">
          <p>Name:</p>
          <input className="text-center mx-1 parchment-bg w-full" value={feat.name} onChange={e => changeFeatName(e.target.value)}/>
        </div>
      </div>
      <textarea className="mx-1 parchment-bg h-full text-sm text-center w-full mb-1" onChange={(e) => changeFeatDesc(e.target.value)} value={feat.desc}/>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeFeat} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
} 

