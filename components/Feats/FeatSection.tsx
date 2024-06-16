import React from "react";
import { CharContext } from "@/app/context";
import { useContext } from "react";
import { K_DEFAULT_FEAT } from "../Constants";
import CollapsibleSection from "../Shared/CollapsibleSection";
import FeatCard from "./FeatCard";

export default function FeatSection(){
  const {charData, setCharData} = useContext(CharContext)
  const addFeat = () => {
    setCharData({
      ...charData,
      feats: [...charData.feats, {...K_DEFAULT_FEAT}]
    })
  }

  return (
    <CollapsibleSection headerTitle="Feats" appendFunction={addFeat}>
      <div className="flex flex-wrap justify-center">
        {charData.feats.map((_, index) => (
          <FeatCard index={index} key={index} />
        ))}
      </div>
    </CollapsibleSection>
  )
}