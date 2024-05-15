"use client";
import AbilityScore from "@/components/AbilityScore/AbilityScore";
import { K_ABILITIES, K_DEFAULT_CHAR_DATA } from "@/components/Constants";
import PowerSection from "@/components/PowerSection";
import SkillSection from "@/components/Skills/SkillSection";
// import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [charState, setCharState] = useState(K_DEFAULT_CHAR_DATA)
  const [isReady, setIsReady] = useState(0)
  const [showAbiDetail, setShowAbiDetail] = useState(false)
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
  const setCharClass = (val: string) => {
    setCharState({
      ...charState,
      class: val
    })
  }
  const setCharLevel = (val: number) => {
    setCharState({
      ...charState,
      level: val,
      levelBonus: Math.ceil(val/2)
    })
  } 

  const setFeat = (val: string) => {
    setCharState({
      ...charState,
      feats: val
    })
  }

  const copyCharState = () =>  {navigator.clipboard.writeText(JSON.stringify(charState))}

  useEffect(() => {
    const charData = {...K_DEFAULT_CHAR_DATA}
    K_ABILITIES.forEach((abi) => {
      charData.abilities[abi].value = Object.keys(charData.abilities[abi].sources).reduce((a,v) => a = a + charData.abilities[abi].sources[v], 0)
      charData.abilities[abi].mod = Math.ceil((charData.abilities[abi].value-10)/2)
    })
    charData.levelBonus = Math.ceil(charData.level/2)
    setCharState({...charData})
    setIsReady(1)
  },[])
  const [ac, setAc] = useState(10)
  const [ref, setRef] = useState(10)
  const [will, setWill] = useState(10)
  const [fort, setFort] = useState(10)

  if(!isReady) return <></>
  
  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <input
        value={charState.name}
        className=" bg-transparent p-4 text-center text-4xl"
        onChange={(e) => setCharName(e.target.value)}
      />
      <div className="grid max-w-sm grid-cols-2">
        <input
          value={charState.race}
          className=" bg-transparent text-center text-md mx-2"
          onChange={(e) => setCharRace(e.target.value)}
        />
        <input
          value={charState.background}
          className=" bg-transparent text-center text-md mx-2"
          onChange={(e) => setCharBg(e.target.value)}
        />
      </div>
      <div className="grid max-w-sm grid-cols-2">
      <input
          value={charState.class}
          className=" bg-transparent text-right text-md mx-2"
          onChange={(e) => setCharClass(e.target.value)}
        />
        <input
          value={charState.level}
          className=" bg-transparent text-left text-md mx-2"
          onChange={(e) => setCharLevel(Number(e.target.value))}
        />
      </div>
      <div
        className="cursor-pointer group text-centerrounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className="m-0 text-2xl font-semibold text-center">HP</h2>
        <input className="m-0 rounded-md max-w-[30ch] w-20 text-2xl opacity-100 text-center bg-gray-600" onChange={(e) => setAc(Number(e.target.value))}/>
      </div>
      <div className="grid grid-cols-4 max-w-6xl">
        <div
          className="cursor-pointer group text-centerrounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="m-0 text-2xl font-semibold text-center">AC</h2>
          <input className="m-0 rounded-md max-w-[30ch] w-20 text-2xl opacity-100 text-center bg-gray-600" onChange={(e) => setAc(Number(e.target.value))}/>
        </div>
        <div
          className="cursor-pointer group text-centerrounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="m-0 text-2xl font-semibold text-center">Fort</h2>
          <input className="m-0 rounded-md max-w-[30ch] w-20 text-2xl opacity-100 text-center bg-gray-600" onChange={(e) => setFort(Number(e.target.value))}/>
        </div>
        <div
          className="cursor-pointer group text-centerrounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="m-0 text-2xl font-semibold text-center">Ref</h2>
          <input className="m-0 rounded-md max-w-[30ch] w-20 text-2xl opacity-100 text-center bg-gray-600" onChange={(e) => setRef(Number(e.target.value))}/>
        </div>
        <div
          className="cursor-pointer group text-centerrounded-lg border border-transparent py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="m-0 text-2xl font-semibold text-center">Will</h2>
          <input className="m-0 rounded-md max-w-[30ch] w-20 text-2xl opacity-100 text-center bg-gray-600" onChange={(e) => setWill(Number(e.target.value))}/>
        </div>
      </div>
      <div className="grid text-center max-w-6xl grid-cols-6">
        {Object.keys(charState.abilities).map((key) => (
          <AbilityScore 
            key={key} 
            abiName={key} 
            ability={charState.abilities[key]}
            setCharState={setCharState} 
            charState={charState}
            showAbiDetail={showAbiDetail}
          />
        ))}
      </div>
      <PowerSection charState={charState} setCharState={setCharState}/>
      <textarea value={charState.feats} className="w-full h-20 max-w-6xl bg-gray-600" onChange={e => setFeat(e.target.value)}/>
      <SkillSection charState={charState} setCharState={setCharState}/>
      <button onClick={copyCharState}>CLICK ME</button>
    </main>
  );
}
