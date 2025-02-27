import React from "react";
import { useCallback, useContext } from "react";
import { K_DEFAULT_WEAPON } from "../Constants";
import WeaponCard from "./WeaponCard";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { CharContext } from "@/app/context";

export default function WeaponSection(){
  const {charData, setCharData} = useContext(CharContext)
  const addWeapon = useCallback(() => {
    setCharData({
      ...charData,
      weapons: [...charData.weapons, {...K_DEFAULT_WEAPON}]
    })
  }, [charData, setCharData])
  return (
    <CollapsibleSection headerTitle="Weapons">
      <div className="flex flex-wrap justify-center m-8">
        {charData.weapons.map((_, index) => (
          <WeaponCard index={index} key={index} />
        ))}
      </div>
      <button className="darkwood p-2 rounded-md" onClick={addWeapon}> Add Weapon </button>
    </CollapsibleSection>
  )
}