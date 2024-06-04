import { Ability, CharData } from "@/types/global"
import { Dispatch, SetStateAction, useState } from "react"
import ReactModal from "react-modal"
import { K_ABILITIES } from "../Constants"

interface Props {
  abiName: string
  ability: Ability
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
  showAbiDetail: boolean
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
  },
};

export default function AbilityScore({abiName, ability, setCharState, charState, showAbiDetail}: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const changeSourceVal = (value: string, source: string) => {
    const updatedChar = {...charState}
    updatedChar.abilities[abiName].sources[source] = Number(value)
    updatedChar.abilities[abiName].value = Object.keys(updatedChar.abilities[abiName].sources).reduce((a,v) => a = a + updatedChar.abilities[abiName].sources[v], 0)
    updatedChar.abilities[abiName].mod = Math.floor((updatedChar.abilities[abiName].value-10)/2)
    setCharState({...updatedChar})
  }

  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
      <p className="m-0 cursor-pointer max-w-[30ch] text-sm opacity-50" onClick={() => openModal()}>
        {ability.value}
      </p>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className=" max-w-60 bg-gray-600 p-2">
        {
          Object.keys(ability.sources).map((source) => 
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
      </ReactModal>
    </div>
  )
}