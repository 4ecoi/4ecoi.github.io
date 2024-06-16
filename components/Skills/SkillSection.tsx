import React from "react";
import { K_SKILLS } from "../Constants";
import SkillRow from "./SkillRow";
import CollapsibleSection from "../Shared/CollapsibleSection";



export default function SkillSection(){
  return (
    <CollapsibleSection headerTitle="Skills">
      {K_SKILLS.map((key) => (
        <SkillRow
          key={key} 
          skillName={key}
        />
      ))}
    </CollapsibleSection>
  )
}