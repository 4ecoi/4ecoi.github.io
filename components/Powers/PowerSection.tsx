import React from "react";
import { useCallback, useContext, useMemo } from "react";
import { K_DEFAULT_POWER } from "../Constants";
import PowerCard from "./PowerCard";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { CharContext } from "@/app/context";

export default function PowerSection(){
  const {charData, setCharData} = useContext(CharContext)

  const addPower = () => {
    console.log(charData.powers)
    setCharData({
      ...charData,
      powers: [...charData.powers, {...K_DEFAULT_POWER}]
    })
  }

  const activeConditions = useMemo(() => charData.condMod.filter(cond => cond.isActive), [charData])
  const toggleCondActive = useCallback((condIndex: number) => {
    const updatedChar = {...charData}
    updatedChar.condMod[condIndex].isActive = !updatedChar.condMod[condIndex].isActive
    setCharData({...updatedChar})
  }, [charData, setCharData])

  return (
    <CollapsibleSection headerTitle="Powers" appendFunction={addPower} openDefault>
      <div className="flex flex-wrap justify-center">
        {charData.powers.map((_, index) => (
          <PowerCard index={index} key={index}  activeConditions={activeConditions} toggleCondActive={toggleCondActive} />
        ))}
      </div>
    </CollapsibleSection>
  )
}