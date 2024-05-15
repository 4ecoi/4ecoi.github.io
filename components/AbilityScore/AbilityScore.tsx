import { Ability, CharData } from "@/types/global"
import { Dispatch, SetStateAction } from "react"

interface Props {
  abiName: string
  ability: Ability
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
  showAbiDetail: boolean
}
export default function AbilityScore({abiName, ability, setCharState, charState, showAbiDetail}: Props) {
  const changeSourceVal = (value: string, source: string) => {
    const updatedChar = {...charState}
    updatedChar.abilities[abiName].sources[source] = Number(value)
    updatedChar.abilities[abiName].value = Object.keys(updatedChar.abilities[abiName].sources).reduce((a,v) => a = a + updatedChar.abilities[abiName].sources[v], 0)
    updatedChar.abilities[abiName].mod = Math.floor((updatedChar.abilities[abiName].value-10)/2)
    setCharState({...updatedChar})
  }
  const abilityCheck = () => {navigator.clipboard.writeText(`[[d20+${ability.mod+charState.levelBonus} ${abiName} check]]`)}

  return (
    <div
      className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      onClick={() => abilityCheck()}
    >
      <h2 className="m-0 text-2xl font-semibold">
        {abiName}
      </h2>
      <p className="m-0 max-w-[30ch] text-2xl opacity-100">
        {ability.mod}
      </p>
      <p className="m-0 max-w-[30ch] text-sm opacity-100">
        check: {ability.mod+Math.floor(charState.level/2)}
      </p>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {ability.value}
      </p>
      <div 
        className="rounded bg-gray-600 p-2 text-xs text-white hover"
      >
        {
          Object.keys(ability.sources).map( (source) => 
            <div className="grid grid-cols-2" key={source}>
              <div
                className=" bg-gray-600 p-2"
              >
                {source}
              </div>
              <input
                value={ability.sources[source]}
                className=" bg-gray-600 p-2"
                onChange={(e) => changeSourceVal(e.target.value, source)}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}