import React from "react";
import { CharContext } from "@/app/context";
import { useContext } from "react";


interface Props{
  index: number
}

export default function TransCard({index}: Props){
  const {charData, setCharData} = useContext(CharContext)

  const trans = charData.transactions[index]

  const removeTrans = () => {
    const updatedCharTrans = [...charData.transactions]
    updatedCharTrans.splice(index, 1)
    setCharData({
      ...charData,
      transactions: [...updatedCharTrans]
    })
  }

  const changeTransTime = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.transactions[index].time = e
    setCharData({...updatedChar})
  }

  const changeTransItem = (e: string) => {
    const updatedChar = {...charData}
    updatedChar.transactions[index].item = e
    setCharData({...updatedChar})
  }

  const changeTransGp = (e: number) => {
    if (isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.transactions[index].gp = e
    setCharData({...updatedChar})
  }
  const changeTransAmt = (e: number) => {
    if (isNaN(e)) return
    const updatedChar = {...charData}
    updatedChar.transactions[index].amt = e
    setCharData({...updatedChar})
  }

  return (
    <div
      className="flex relative flex-col px-4 w-96 group rounded-lg border border-transparent py-4 transition-colors hover:border-neutral-700 parchment-bg m-1"
    >
      <div className="grid grid-cols-3 mb-1 text-center">
        <div className="mx-1 text-center">
          <p>Session:</p>
          <input className="text-center parchment-bg w-full" value={trans.time} onChange={e => changeTransTime(e.target.value)}/>
        </div>
        <div className="mx-1 text-center">
          <p>gp:</p>
          <input className="text-center parchment-bg w-full" value={trans.gp} onChange={e => changeTransGp(Number(e.target.value))}/>
        </div>
        <div className="mx-1 text-center">
          <p>amt:</p>
          <input className="text-center parchment-bg w-full" value={trans.amt} onChange={e => changeTransAmt(Number(e.target.value))}/>
        </div>
      </div>
      <input className=" parchment-bg h-8 text-sm text-center w-full mb-1" placeholder="Item Name" onChange={(e) => changeTransItem(e.target.value)} value={trans.item}/>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeTrans} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
} 

