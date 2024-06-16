import React from "react";
import { CharContext } from "@/app/context";
import { useContext, useState } from "react";
import { Item } from "@/types/global";

export default function InvSearch(){
  const [searchString, setSearchString] = useState("")
  const [searchArr, setSearchArr] = useState<Item[]>([])

  const {charData} = useContext(CharContext)

  const onChangeSearchString = (str: string) => {
    setSearchString(str)
    const searchRes: {[key: string]: number} = {}
    const filteredItems = charData.transactions.filter(trans => trans.item.toLowerCase().indexOf(str.toLowerCase()) > -1)
    filteredItems.forEach((trans) => {
      if (!searchRes[trans.item]) {searchRes[trans.item] = trans.amt}
      else (searchRes[trans.item] += trans.amt)
    })

    setSearchArr([...Object.keys(searchRes).map((item) => {return {name: item, amt: searchRes[item]}})])
  }

  return (
    <div className="my-2">
      <input value={searchString} placeholder="Item Search" onChange={(e) => onChangeSearchString(e.target.value)} className="text-center parchment-bg border border-white"/>
      {
        searchString ? 
        searchArr.map((item, n) => <p key={n}>{item.name} x {item.amt}</p>) :
        null
      }
    </div>
  )
}