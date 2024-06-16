import React from "react";
import AbilityScore from "./AbilityScore";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { useContext } from "react";
import { CharContext } from "@/app/context";


export default function AbilitySection(){

  const {charData} = useContext(CharContext)

  return (
    <CollapsibleSection headerTitle="Ability Score" openDefault>
      <div className="grid text-center mx-auto grid-cols-3">
        {Object.keys(charData.abilities).map((key) => (
          <AbilityScore 
            key={key} 
            abiName={key} 
            ability={charData.abilities[key]}
            showAbiDetail={true}
          />
        ))}
      </div> 
    </CollapsibleSection>
  )
}