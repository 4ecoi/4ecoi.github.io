import { CharData } from "@/types/global";
import { Dispatch, SetStateAction } from "react";


interface Props{
  index: number
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function TransCard({index, setCharState, charState}: Props){
  const trans = charState.transactions[index]

  const removeTrans = () => {
    const updatedCharTrans = [...charState.transactions]
    updatedCharTrans.splice(index, 1)
    setCharState({
      ...charState,
      transactions: [...updatedCharTrans]
    })
  }

  const changeTransTime = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.transactions[index].time = e
    setCharState({...updatedChar})
  }

  const changeTransItem = (e: string) => {
    const updatedChar = {...charState}
    updatedChar.transactions[index].item = e
    setCharState({...updatedChar})
  }

  const changeTransGp = (e: number) => {
    if (isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.transactions[index].gp = e
    setCharState({...updatedChar})
  }
  const changeTransAmt = (e: number) => {
    if (isNaN(e)) return
    const updatedChar = {...charState}
    updatedChar.transactions[index].amt = e
    setCharState({...updatedChar})
  }

  return (
    <div
      className="flex relative flex-col px-4 w-96 group rounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <div className="grid grid-cols-3 mb-1 text-center">
        <div className="mx-1 text-center">
          <p>Session:</p>
          <input className="text-center bg-gray-600 w-full" value={trans.time} onChange={e => changeTransTime(e.target.value)}/>
        </div>
        <div className="mx-1 text-center">
          <p>gp:</p>
          <input className="text-center bg-gray-600 w-full" value={trans.gp} onChange={e => changeTransGp(Number(e.target.value))}/>
        </div>
        <div className="mx-1 text-center">
          <p>amt:</p>
          <input className="text-center bg-gray-600 w-full" value={trans.amt} onChange={e => changeTransAmt(Number(e.target.value))}/>
        </div>
      </div>
      <input className=" bg-gray-600 h-8 text-sm text-center w-full mb-1" placeholder="Item Name" onChange={(e) => changeTransItem(e.target.value)} value={trans.item}/>
      <div style={{whiteSpace: "pre-wrap"}} onClick={removeTrans} className="absolute cursor-pointer -top-3 -right-3 scale-0 rounded transition-colors border border-neutral-700 bg-neutral-800/30 p-2 text-xs text-white group-hover:scale-100">🗑️</div>
    </div>
  )
} 

