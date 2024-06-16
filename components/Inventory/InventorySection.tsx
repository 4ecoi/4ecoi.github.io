import React from "react";
import { CharContext } from "@/app/context";
import { useContext, useMemo } from "react";
import { K_DEFAULT_TRANS } from "../Constants";
import CollapsibleSection from "../Shared/CollapsibleSection";
import InvSearch from "./InventorySearch";
import TransCard from "./TransactionCard";



export default function InvSection(){
  const {charData, setCharData} = useContext(CharContext)
  const addTrans = () => {
    setCharData({
      ...charData,
      transactions: [...charData.transactions, {...K_DEFAULT_TRANS}]
    })
  }

  const gp = useMemo(() => charData.transactions.reduce((a, trans) => a + trans.gp, 0 ), [charData])

  return (
    <CollapsibleSection headerTitle="Inventory/Transactions">
      <h2 className="w-full text-center mb-1"> GP: {gp}</h2>
        <InvSearch />
      <h2 className="w-full text-center mb-1"> Transactions
        <span>
          <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addTrans}>＋</button>
        </span> 
      </h2>
      <div className="flex flex-wrap justify-center">
        {charData.transactions.map((_, index) => (
          <TransCard index={index} key={index} />
        ))}
      </div>
    </CollapsibleSection>
    // <div className="my-6">
      // <h2 className="w-full text-center mb-1"> GP: {gp}</h2>
      // <InvSearch />
      // <h2 className="w-full text-center mb-1"> Transactions
      //   <span>
      //     <button className="mx-2 px-1 cursor-pointer text-center rounded-full border border-white text-sm" onClick={addTrans}>＋</button>
      //   </span> 
      // </h2>
      // <div className="flex flex-wrap justify-center">
      //   {charData.transactions.map((_, index) => (
      //     <TransCard index={index} key={index} />
      //   ))}
      // </div>
    // </div>
  )
}