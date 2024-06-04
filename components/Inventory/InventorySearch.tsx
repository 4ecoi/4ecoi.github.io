import { CharData } from "@/types/global";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { K_DEFAULT_TRANS } from "../Constants";
import TransCard from "./TransactionCard";

interface Props{
  charState: CharData
  setCharState: Dispatch<SetStateAction<CharData>>
}

export default function InvSearch({charState, setCharState}: Props){
  const [searchString, setSearchString] = useState("")
  const [searchArr, setSearchArr] = useState<any[]>([])

  const onChangeSearchString = (str: string) => {
    setSearchString(str)
    const searchRes: {[key: string]: number} = {}
    const filteredItems = charState.transactions.filter(trans => trans.item.toLowerCase().indexOf(str.toLowerCase()) > -1)
    filteredItems.forEach((trans) => {
      if (!searchRes[trans.item]) {searchRes[trans.item] = trans.amt}
      else (searchRes[trans.item] += trans.amt)
    })

    setSearchArr([...Object.keys(searchRes).map((item) => {return {name: item, amt: searchRes[item]}})])
  }

  return (
    <div className="my-2">
      <input value={searchString} placeholder="Item Search" onChange={(e) => onChangeSearchString(e.target.value)} className="text-center bg-transparent border border-white"/>
      {
        searchString ? 
        searchArr.map(item => <p>{item.name} x {item.amt}</p>) :
        null
      }
    </div>
  )
}