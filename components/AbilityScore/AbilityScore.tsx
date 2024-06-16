import React from "react"
import { CharContext } from "@/app/context"
import { Ability } from "@/types/global"
import { useContext, useState } from "react"
import { isNumString } from "../Shared/Functions"
import DialogDefault from "../Shared/Dialog"

interface Props {
  abiName: string
  ability: Ability
  showAbiDetail: boolean
}

export default function AbilityScore({abiName, ability}: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {charData, setCharData} = useContext(CharContext)

  const changeSourceVal = (value: string, source: string) => {
    if (!isNumString(value)) return
    const updatedChar = {...charData}
    updatedChar.abilities[abiName].sources[source] = Number(value)
    updatedChar.abilities[abiName].value = Object.keys(updatedChar.abilities[abiName].sources).reduce((a,v) => a = a + updatedChar.abilities[abiName].sources[v], 0)
    updatedChar.abilities[abiName].mod = Math.floor((updatedChar.abilities[abiName].value-10)/2)
    setCharData({...updatedChar})
  }

  return (
    <div
      className="group parchment-bg rounded-lg border border-transparent m-2 p-2 transition-colors text-center items-center cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <h2 className="m-0 text-2xl font-semibold">
        {abiName}
      </h2>
      <p className="m-0 mx-auto text-2xl opacity-100">
        {ability.mod > 0 ? "+" : null }{ability.mod}
      </p>
      <p className="m-0 mx-auto text-sm opacity-100">
        check: {ability.mod+Math.floor(charData.level/2)}
      </p>
      <p className="m-0 cursor-pointer mx-auto text-sm opacity-50">
        {ability.value}
      </p>
      <DialogDefault headerTitle={abiName} isOpen={modalIsOpen} setOpen={setIsOpen}>
        <div className=" max-w-60 parchment-bg p-2">
          {
            Object.keys(ability.sources).map((source) => 
              <div className="grid grid-cols-2" key={source}>
                <div
                  className="p-2"
                >
                  {source}:
                </div>
                <input
                  value={ability.sources[source]}
                  className="p-2 border-none"
                  onChange={(e) => changeSourceVal(e.target.value, source)}
                />
              </div>
            )
          }
        </div>
      </DialogDefault>
    </div>
  )
}