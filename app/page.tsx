"use client";
import AbilityScore from "@/components/AbilityScore/AbilityScore";
import { K_ABILITIES, K_DEFAULT_CHAR_DATA } from "@/components/Constants";
import DefenseSection from "@/components/Defenses/DefenseSection";
import FeatSection from "@/components/Feats/FeatSection";
import HpSection from "@/components/HP/HpSection";
import InvSection from "@/components/Inventory/InventorySection";
import PowerSection from "@/components/Powers/PowerSection";
import SkillSection from "@/components/Skills/SkillSection";


// import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {

  const [charState, setCharState] = useState(() => {
    const string = localStorage.getItem("charData")
    const data = string ? JSON.parse(string) : K_DEFAULT_CHAR_DATA
    return data
  })
  // const [isReady, setIsReady] = useState(0)

  const setCharName = (val: string) => {
    setCharState({
      ...charState,
      name: val
    })
  } 
  const setCharRace = (val: string) => {
    setCharState({
      ...charState,
      race: val
    })
  } 
  const setCharBg = (val: string) => {
    setCharState({
      ...charState,
      background: val
    })
  } 

  const setCharLevel = (val: number) => {
    setCharState({
      ...charState,
      level: val,
      levelBonus: Math.floor(val/2)
    })
  } 

  useEffect(
    () => localStorage.setItem("charData", JSON.stringify(charState)), 
    [charState]
  )

  const downloadFile = () => {
    const fileName = charState.name;
    const json = JSON.stringify(charState, null, 2);
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
      setCharState({...JSON.parse(ev.target.result as string)})
    };
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center py-12 [&>*]:rounded-lg [&>1]:rounded">
      <input onChange={handleUpload} className="block w-60 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
      <input
        value={charState.name}
        className=" bg-transparent p-4 text-center text-4xl"
        onChange={(e) => setCharName(e.target.value)}
      />
      <div className="my-1">
        <input
          value={charState.background}
          placeholder="Race/Background/Theme"
          className="w-60 bg-transparent text-center text-md mx-2"
          onChange={(e) => setCharBg(e.target.value)}
        />
      </div>
      <div className="my-1">
        <input
          value={charState.className}
          placeholder="Class"
          className="w-40 bg-transparent text-center text-md mx-2"
          onChange={(e) => setCharBg(e.target.value)}
        />
      </div>
      <div className="max-w-sm">
        <input
          value={charState.level}
          className="w-8 bg-transparent text-center text-md mx-2"
          onChange={(e) => setCharLevel(Number(e.target.value))}
        />
      </div>
      <HpSection charState={charState} setCharState={setCharState}/>
      <DefenseSection charState={charState} setCharState={setCharState}/>
      <div className="grid text-center max-w-6xl grid-cols-6">
        {Object.keys(charState.abilities).map((key) => (
          <AbilityScore 
            key={key} 
            abiName={key} 
            ability={charState.abilities[key]}
            setCharState={setCharState} 
            charState={charState}
            showAbiDetail={true}
          />
        ))}
      </div>
      <PowerSection charState={charState} setCharState={setCharState}/>
      {/* <textarea value={charState.feats} className="w-full h-20 max-w-6xl bg-gray-600" onChange={e => setFeat(e.target.value)}/> */}
      <FeatSection charState={charState} setCharState={setCharState}/>
      <SkillSection charState={charState} setCharState={setCharState}/>
      <InvSection charState={charState} setCharState={setCharState}/>
      <button onClick={downloadFile}>Download Data</button>
      {/* <button onClick={onClickSaveChar}>Save</button> */}
    </main>
  );
}
