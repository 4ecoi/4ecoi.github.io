"use client";
import React from "react";
import AbilitySection from "@/components/AbilityScore/AbilitySection";
import ConditionSection from "@/components/ConditionSection/ConditionSection";
import { K_DEFAULT_CHAR_DATA } from "@/components/Constants";
import DefenseSection from "@/components/Defenses/DefenseSection";
import FeatSection from "@/components/Feats/FeatSection";
import HpSection from "@/components/HP/HpSection";
import InvSection from "@/components/Inventory/InventorySection";
import PowerSection from "@/components/Powers/PowerSection";
import { isNumString } from "@/components/Shared/Functions";
import SkillSection from "@/components/Skills/SkillSection";
import WeaponSection from "@/components/WeaponSection/WeaponSection";
import { CharData } from "@/types/global";


// import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { CharContext } from "./context";

export default function Home() {
  const [charData, setCharData] = useState<CharData>(K_DEFAULT_CHAR_DATA)
  const [isAutoSave, setIsAutosave] = useState(false)
  // const [isReady, setIsReady] = useState(0)
  useEffect(() => {
    const string = global?.localStorage?.getItem("charData")
      if(string) setCharData(JSON.parse(string))
      setIsAutosave(true)
    }, [isAutoSave])

  const setCharName = (val: string) => {
    setCharData({
      ...charData,
      name: val
    })
  } 
  const setCharClass = (val: string) => {
    setCharData({
      ...charData,
      class: val
    })
  } 
  const setCharBg = (val: string) => {
    setCharData({
      ...charData,
      background: val
    })
  } 

  const setCharLevel = (val: string) => {
    if(!isNumString(val)) return
    const valNum = Number(val)
    setCharData({
      ...charData,
      level: valNum,
      levelBonus: Math.floor(valNum/2)
    })
  } 

  useEffect(
    () => {if(isAutoSave) global?.localStorage?.setItem("charData", JSON.stringify(charData))}, 
    [charData, isAutoSave]
  )

  const downloadFile = () => {
    const fileName = charData.name;
    const json = JSON.stringify(charData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  // if(!isReady) return <></>
  const handleUpload = (e:ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const {files} = e.target
    if (!files) return
    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = ev => {
      if (!ev) return
      if (!ev.target) return
      if (!ev.target.result) return
      setCharData({...JSON.parse(ev.target.result as string)})
    };
  };

  return (
    <CharContext.Provider value={{charData, setCharData}}>
      <main className="parchment-bg flex flex-col items-center py-2 [&>*]:rounded-lg [&>1]:rounded">
        <input onChange={handleUpload} className=" my-2 block w-42 text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none darkwood border-gray-600 placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
        <input
          value={charData.name}
          className="parchment-bg text-center text-2xl border-none w-11/12"
          placeholder="Character Name"
          onChange={(e) => setCharName(e.target.value)}
        />
        <input
          value={charData.background}
          placeholder="Race/Background/Theme"
          className="parchment-bg text-center text-md mx-2 border-none w-96"
          onChange={(e) => setCharBg(e.target.value)}
        />
        <input
          value={charData.class}
          placeholder="Class"
          className="w-40 parchment-bg text-center text-md mx-2 border-none"
          onChange={(e) => setCharClass(e.target.value)}
        />
        <div className="max-w-sm">
          <input
            value={charData.level}
            className="w-8 parchment-bg text-center text-md mx-2 border-none"
            onChange={(e) => setCharLevel(e.target.value)}
          />
        </div>
        <HpSection/>
        <DefenseSection/>
        <AbilitySection/>
        <PowerSection/>
        <WeaponSection />
        <ConditionSection/>
        <FeatSection/>
        <SkillSection/>
        <InvSection/>
        <button onClick={downloadFile} className="parchment-input p-2">Download Data</button>
        {/* <button onClick={onClickSaveChar}>Save</button> */}
      </main>
    </CharContext.Provider>
  );
}
