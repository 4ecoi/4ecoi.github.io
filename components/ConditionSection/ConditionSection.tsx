import React from "react";
import { useContext } from "react";
import { K_DEFAULT_CONDITION } from "../Constants";
import CondCard from "./CondCard";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { CharContext } from "@/app/context";

export default function ConditionSection(){
  const {charData, setCharData} = useContext(CharContext)
  const addCond = () => {
    setCharData({
      ...charData,
      condMod: [...charData.condMod, {...K_DEFAULT_CONDITION}]
    })
  }
  
  return (
    <CollapsibleSection headerTitle="Conditions" appendFunction={addCond}>
      <div className="flex flex-wrap justify-center m-8">
        {charData.condMod.map((_, index) => (
          <CondCard index={index} key={index} />
        ))}
      </div>
    </CollapsibleSection>
  )
}