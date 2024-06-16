import React from "react";
import { Dispatch, SetStateAction, useContext } from "react"
import { DefBonus } from "@/types/global"
import { K_DEFENSES } from "../Constants"
import DialogDefault from "../Shared/Dialog";
import { CharContext } from "@/app/context";
import { isNumString } from "../Shared/Functions";
interface Props {
  defName: typeof K_DEFENSES[number]
  defBonusArray: DefBonus[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}


export default function DefenseModal({defName, defBonusArray, setIsOpen, isOpen}: Props) {
  const {charData, setCharData} = useContext(CharContext)

  const changeBonusVal = (val: number, index: number) => {
    if(!isNumString(val)) return
    const updatedChar = {...charData}
    updatedChar.defBonus[defName][index].value=val
    setCharData({...updatedChar})
  }

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={defName}
      >
        <div className="flex flex-col items-center max-w-60 parchment-bg p-2 mx-auto">
          {
            defBonusArray.map((bonus, index) => 
            <div className="grid grid-cols-2 text-right" key={index}>
              <div
                className=" parchment-bg p-2"
              >
                {bonus.type}:
              </div>
              <input
                value={bonus.value}
                className=" parchment-bg p-2 border-none"
                onChange={(e) => changeBonusVal(Number(e.target.value), index)}
              />
            </div>)
          }
        </div>
      </DialogDefault>
    </>
  );
}