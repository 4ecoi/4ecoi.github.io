import { CharData, DefBonus } from "@/types/global"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { K_ABILITIES_BY_DEFENSES, K_DEFENSES } from "../Constants"
import DefenseModal from "./DefenseModal"


interface Props {
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
  defName: typeof K_DEFENSES[number]
  defBonusArray: DefBonus[]
}
export default function DefenseCard({setCharState, charState, defName, defBonusArray}: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modBonus = (defBonusArray.find(def => def.type === "Armor")?.value as Number > 5) ? 
    0 :
    Math.max(...K_ABILITIES_BY_DEFENSES[defName].map(def => charState.abilities[def].mod))

  let defTotal = defBonusArray.reduce((a,v) => a+v.value, 10) + modBonus
  let tooltip = `Mod: ${modBonus}\n${defBonusArray.reduce((a,v) => `${a+v.type+`: `+v.value+`\n`}`, '')}`
  return (
    <div>
      <div
        className="group relative flex justify-center cursor-pointer rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
        <div style={{whiteSpace: "pre-wrap"}} className="absolute top-20 scale-0 rounded bg-gray-600/50 p-2 w-24 text-xs text-white group-hover:scale-100">{tooltip}</div>
      </div>
      {
        modalIsOpen ?
        <DefenseModal setCharState={setCharState} charState={charState} defName={defName} defBonusArray={defBonusArray} closeModal={closeModal}/> :
        null
      }
    </div>
  )
}