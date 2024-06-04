import { CharData } from "@/types/global";
import { Dispatch, SetStateAction, useMemo } from "react";
import { K_DEFAULT_TRANS } from "../Constants";
import InvSearch from "./InventorySearch";
import TransCard from "./TransactionCard";

interface Props{
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function InvSection({charState, setCharState}: Props){
  const addTrans = () => {
    setCharState({
      ...charState,
      transactions: [...charState.transactions, {...K_DEFAULT_TRANS}]
    })
  }

  const gp = useMemo(() => charState.transactions.reduce((a, trans) => a + trans.gp, 0 ), [charState])

  return (
    <div className="my-6">
      <h2 className="w-full text-center mb-1"> GP: {gp}</h2>
      <InvSearch setCharState={setCharState} charState={charState}/>
      <h2 className="w-full text-center mb-1"> Transactions
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addTrans}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {charState.transactions.map((_, index) => (
          <TransCard index={index} key={index} setCharState={setCharState} charState={charState}/>
        ))}
      </div>
    </div>
  )
}