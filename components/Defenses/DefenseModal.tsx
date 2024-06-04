import { Dispatch, SetStateAction, useState } from "react"
import Modal from 'react-modal';
// import CatalogCarousel from "./CatalogCarousel";
import { CharData, DefBonus } from "@/types/global"
import { K_DEFENSES } from "../Constants"

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

interface Props {
  setCharState: Dispatch<SetStateAction<CharData>>
  charState: CharData
  defName: typeof K_DEFENSES[number]
  defBonusArray: DefBonus[]
  closeModal: () => void
}


export default function DefenseModal({setCharState, charState, defName, defBonusArray, closeModal}: Props) {

  const changeBonusVal = (val: number, index: number) => {
    const updatedChar = {...charState}
    updatedChar.defBonus[defName][index].value=val
    setCharState({...updatedChar})
  }

  return (
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className=" max-w-60 bg-gray-600 p-2">
          {
            defBonusArray.map((bonus, index) => 
            <div className="grid grid-cols-2 text-right" key={index}>
              <div
                className=" bg-gray-600 p-2"
              >
                {bonus.type}
              </div>
              <input
                value={bonus.value}
                type="number"
                className=" bg-gray-600 p-2"
                onChange={(e) => changeBonusVal(Number(e.target.value), index)}
              />
            </div>
          )
          }
        </div>
      </Modal>
  );
}