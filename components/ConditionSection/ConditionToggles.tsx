import { CharContext } from "@/app/context";
import React, { LegacyRef, useContext } from "react";


const ConditionToggles = React.forwardRef((_, forwardedRef) => {
  const {charData, setCharData} = useContext(CharContext)
  const {condMod} = charData
  const onClickCond = (index: number) => {
    const updatedChar = {...charData}
    updatedChar.condMod[index].isActive = !updatedChar.condMod[index].isActive
    setCharData({...updatedChar})
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      conditions:
      <div className="flex px-2 w-full flex-row flex-wrap">
        {
          condMod.map((cond, index) => {return(
            <div 
              key={index} 
              className={`${cond.isActive ? "parchment-input" : "darkwood"} rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickCond(index)}
            >
              {cond.name ? cond.name : "unnamed"}
            </div>
          )})
        }
      </div>
    </div>
  )
})

ConditionToggles.displayName = "ConditionToggles"

export default ConditionToggles
