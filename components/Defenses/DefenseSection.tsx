import { Ability, CharData } from "@/types/global"
import { Dispatch, SetStateAction } from "react"
import { K_DEFENSES } from "../Constants"
import DefenseCard from "./DefenseCard"

interface Props {
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
}
export default function DefenseSection({setCharState, charState,}: Props) {

  return (
    <div className="rounded-lg border px-5 py-4 transition-colors border-neutral-700 bg-neutral-800/30">
      <div
        className="grid grid-cols-4"
      >
        {
          K_DEFENSES.map(def => (
            <DefenseCard key={def} setCharState={setCharState} charState={charState} defName={def} defBonusArray={charState.defBonus[def]}/>
          ))
        }
      </div>
    </div>
  )
}