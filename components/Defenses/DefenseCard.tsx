import React from "react"
import { CharContext } from "@/app/context"
import { useContext, useState } from "react"
import { K_ABILITIES_BY_DEFENSES, K_DEFENSES } from "../Constants"
import DefenseModal from "./DefenseModal"


interface Props {
  defName: typeof K_DEFENSES[number]
}
export default function DefenseCard({defName}: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {charData} = useContext(CharContext)

  const defBonusArray= charData.defBonus[defName]

  function openModal() {
    setIsOpen(true);
  }

  const modBonus = (defBonusArray.find(def => def.type === "Armor")?.value as number > 5) ? 
    0 :
    Math.max(...K_ABILITIES_BY_DEFENSES[defName].map(def => charData.abilities[def].mod))

  const defTotal = defBonusArray.reduce((a,v) => a+v.value, 10) + modBonus
  return (
    <div>
      <div
        className="group relative flex justify-center cursor-pointer rounded-lg border border-transparent px-5 transition-colors"
        onClick={() => openModal()}
      >
        <div>
          <h2 className="m-0 text-2xl font-semibold text-center">
            {defName}
          </h2>
          <p className="text-center m-0 max-w-[30ch] text-2xl opacity-100">
            {defTotal}
          </p>
        </div>
      </div>
      <DefenseModal defName={defName} defBonusArray={defBonusArray} isOpen={modalIsOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}