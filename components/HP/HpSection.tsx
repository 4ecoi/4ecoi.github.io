import { CharData } from "@/types/global"
import { Dispatch, SetStateAction } from "react"
import { K_ABILITIES } from "../Constants"

interface Props {
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
}
export default function HpSection({setCharState, charState}: Props) {
  const hp = charState.hpBase + charState.hpPerLevel*(charState.level-1) + (charState.ausp ? Math.max(...K_ABILITIES.map(abi => charState.abilities[abi].value)) : charState.abilities["CON"].value)
  const setHpBase = (val:number) => setCharState({...charState, hpBase: val})
  const setHpPerLevel = (val:number) => setCharState({...charState, hpPerLevel: val})
  const setBaseHs = (val:number) => setCharState({...charState, baseHs: val})

  return (
  <div className="grid grid-cols-2">
    <div
      className="text-center group w-40 text-centerrounded-lg border border-transparent py-4 transition-colorsborder-neutral-700 bg-neutral-800/30"
    >
      <h2 className="m-0 text-2xl font-semibold text-center">HP</h2>
      <h2 className="m-0 text-2xl font-semibold text-center">{hp}</h2>
      <div className="grid grid-cols-2">
        <div>
          <p>Base</p>
          <input value={charState.hpBase} type="number" className="text-center bg-transparent w-10" onChange={(e) => setHpBase(Number(e.target.value))}/>
        </div>
        <div>
          <p>/level</p>
          <input value={charState.hpPerLevel} type="number" className="text-center bg-transparent w-10" onChange={(e) => setHpPerLevel(Number(e.target.value))}/>
        </div>
      </div>
    </div>
    <div
      className="text-center group w-40 text-centerrounded-lg border border-transparent py-4 transition-colorsborder-neutral-700 bg-neutral-800/30"
    >
      <h2 className="m-0 text-2xl font-semibold text-center">HS</h2>
      <h2 className="m-0 text-2xl font-semibold text-center">{Math.floor(hp/4)}</h2>
      <div className="grid grid-cols-2">
        <div>
          <p>Base amt</p>
          <input value={charState.baseHs} type="number" className="text-center bg-transparent w-10" onChange={(e) => setBaseHs(Number(e.target.value))}/>
        </div>
        <div>
          <p>Total amt</p>
          <input value={charState.baseHs + charState.abilities["CON"].mod} type="number" className="text-center bg-transparent w-10" disabled />
        </div>
      </div>
    </div>
  </div>
  )
}
