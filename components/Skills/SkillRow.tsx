import React from "react";
import { CharContext } from "@/app/context"
import { useContext, useMemo, useState } from "react"
import ReactModal from "react-modal"
import { K_ABILITIES } from "../Constants"


interface Props {
  skillName: string
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

export default function SkillRow({skillName}: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {charData, setCharData} = useContext(CharContext)

  const skill = charData.skills[skillName]

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const changeAbility = (value: string) => {
    const updatedChar = {...charData}
    updatedChar.skills[skillName].ability = value
    setCharData({...updatedChar})
  }
  const changeTrained = () => {
    const updatedChar = {...charData}
    updatedChar.skills[skillName].trained = !updatedChar.skills[skillName].trained
    setCharData({...updatedChar})
  }
  const changeFeat = (value: number) => {
    const updatedChar = {...charData}
    updatedChar.skills[skillName].feat = value
    setCharData({...updatedChar})
  }
  const changeItem = (value: number) => {
    const updatedChar = {...charData}
    updatedChar.skills[skillName].item = value
    setCharData({...updatedChar})
  }
  const changeUntyped = (value: number) => {
    const updatedChar = {...charData}
    updatedChar.skills[skillName].untyped = value
    setCharData({...updatedChar})
  }
  const skillMod = useMemo(() => (
    skill.trained ?
    (charData.abilities[skill.ability].mod + charData.levelBonus + skill.feat + skill.item + skill.untyped + 5) :
    (charData.abilities[skill.ability].mod + charData.levelBonus + skill.feat + skill.item + skill.untyped)
  ), [charData, skill])
  const skillCheck = () => {navigator.clipboard.writeText(`[[d20+${skillMod} ${skillName} check]]`)}
  
  return (
    <div className="grid mb-1 text-center grid-cols-2" onClick={skillCheck}>
      <div className="mx-2">{skillName}</div>
      <div className="mx-2 flex cursor-pointer items-center" onClick={openModal}>
        {skillMod}
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className=" max-w-60 parchment-bg text-center p-2">
          <div className="grid grid-cols-2">
            <div>
              Ability
            </div>
            <select 
              className="mx-2  parchment-bg"
              value={skill.ability}
              onChange={(e) => changeAbility(e.target.value)}
            >
              {K_ABILITIES.map((ability)=> <option key={ability} value={ability} className="text-center"> {ability} </option>)}
            </select>
          </div>
          <div className="grid grid-cols-2">
            <div>
              Trained
            </div>
            <input type="checkbox" className="mx-2 " onChange={changeTrained} checked={skill.trained}/>
          </div>
          <div className="grid grid-cols-2">
            <div>
              Feat
            </div>
            <input className="mx-2  parchment-bg text-center" onChange={(e) => changeFeat(Number(e.target.value))} value={skill.feat} />
          </div>
          <div className="grid grid-cols-2">
            <div>
              Item
            </div>
            <input className="mx-2  parchment-bg text-center" onChange={(e) => changeItem(Number(e.target.value))} value={skill.item} />
          </div>
          <div className="grid grid-cols-2">
            <div>
              Etc
            </div>
            <input className="mx-2  parchment-bg text-center" onChange={(e) => changeUntyped(Number(e.target.value))} value={skill.untyped} />
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
