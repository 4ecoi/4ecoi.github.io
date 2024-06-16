import React, { useState } from "react"
import { CharContext } from "@/app/context"
import { useContext } from "react"
import { K_ABILITIES } from "../Constants"
import { isNumString } from "../Shared/Functions"
import DialogDefault from "../Shared/Dialog"

export default function HpSection() {
  const [hpModalVisible, setHpModalvisible] = useState(false)
  const [hsModalVisible, setHsModalvisible] = useState(false)
  const [initModalVisible, setInitModalVisible] = useState(false)
  const {charData, setCharData} = useContext(CharContext)
  const [hsAmt, setHsAmt] = useState(0)
  const {initiative} = charData
  
  const hp = charData.hpBase + charData.hpPerLevel*(charData.level-1) + (charData.ausp ? Math.max(...K_ABILITIES.map(abi => charData.abilities[abi].value)) : charData.abilities["CON"].value)
  const setHpBase = (val:number) => {if(isNumString(val)) setCharData({...charData, hpBase: val})}
  const setHpPerLevel = (val:number) => {if(isNumString(val)) setCharData({...charData, hpPerLevel: val})}
  const setBaseHs = (val:number) => {if(isNumString(val)) setCharData({...charData, baseHs: val})}
  const setAusp = (val:boolean) => {setCharData({...charData, ausp: val})}
  const setInitAbi = (val:string) => {setCharData({...charData, initiative: {...initiative, ability: val}})}
  const setInitFeat = (val:number) => {if(isNumString(val))setCharData({...charData, initiative: {...initiative, feat: val}})}
  const setInitItem = (val:number) => {if(isNumString(val))setCharData({...charData, initiative: {...initiative, item: val}})}
  const setInitEtc = (val:number) => {if(isNumString(val))setCharData({...charData, initiative: {...initiative, untyped: val}})}

  const initVal = charData.abilities[initiative.ability].mod + charData.levelBonus + charData.initiative.feat + charData.initiative.item + charData.initiative.untyped

  return (
  <div className="grid grid-cols-3 my-2">
    <div
      className="text-center group w-20 text-centerrounded-lg border border-transparent cursor-pointer"
      onClick={() => setHpModalvisible(true)}
    >
      <h2 className="m-0 text-2xl font-semibold text-center">HP</h2>
      <h2 className="m-0 text-4xl font-semibold text-center">{hp}</h2>
    </div>
    <div
      className="text-center group w-20 text-centerrounded-lg border border-transparent"
    >
      <h2 className="m-0 text-2xl font-semibold text-center cursor-pointer" onClick={() => setHsModalvisible(true)}>HS</h2>
      <div className="grid grid-cols-2">
        <h2 className="m-0 text-4xl font-semibold text-center cursor-pointer" onClick={() => setHsModalvisible(true)}>{Math.floor(hp/4)}</h2>
        <div className="my-auto mx-auto text-xs">
          <input className="w-8" value={hsAmt} onChange={(e) => {if(isNumString(e.target.value))setHsAmt(Number(e.target.value))}}/>
          <p>/{charData.baseHs + charData.abilities["CON"].mod}</p>
        </div>
      </div>
    </div>
    <div
      className="text-center group w-20 text-centerrounded-lg border border-transparent cursor-pointer"
      onClick={() => setInitModalVisible(true)}
    >
      <h2 className="m-0 text-2xl font-semibold text-center">Init</h2>
      <h2 className="m-0 text-4xl font-semibold text-center">{initVal}</h2>
    </div>
    <DialogDefault headerTitle="HP" isOpen={hpModalVisible} setOpen={setHpModalvisible}>
      <div className="m-1 grid grid-cols-2 text-center">
        <p>Base:</p>
        <input value={charData.hpBase} onChange={(e) => {if(isNumString(e.target.value))setHpBase(Number(e.target.value))}}/>
      </div>
      <div className="m-1 grid grid-cols-2 text-center">
        <p>Hp/Level:</p>
        <input value={charData.hpPerLevel} onChange={(e) => {if(isNumString(e.target.value))setHpPerLevel(Number(e.target.value))}}/>
      </div>
      <div className="m-1 grid grid-cols-2 text-center">
        <p>AUSP:</p>
        <input type="checkbox" checked={charData.ausp} onChange={() => setAusp(!charData.ausp)}/>
      </div>
    </DialogDefault>
    <DialogDefault headerTitle="Healing Surge" isOpen={hsModalVisible} setOpen={setHsModalvisible}>
      <div className="m-1 grid grid-cols-2 text-center">
        <p>Base Amount:</p>
        <input value={charData.baseHs} onChange={(e) => {if(isNumString(e.target.value))setBaseHs(Number(e.target.value))}}/>
      </div>
    </DialogDefault>
    <DialogDefault headerTitle="Initiative" isOpen={initModalVisible} setOpen={setInitModalVisible}>
      <div className="grid grid-cols-2">
        <div>
          Ability
        </div>
        <select 
          className="mx-2  parchment-bg"
          value={initiative.ability}
          onChange={(e) => setInitAbi(e.target.value)}
        >
          {K_ABILITIES.map((ability)=> <option key={ability} value={ability} className="text-center"> {ability} </option>)}
        </select>
      </div>
      <div className="grid grid-cols-2">
        <div>
          Feat
        </div>
        <input className="mx-2  parchment-bg text-center" onChange={(e) => setInitFeat(Number(e.target.value))} value={initiative.feat} />
      </div>
      <div className="grid grid-cols-2">
        <div>
          Item
        </div>
        <input className="mx-2  parchment-bg text-center" onChange={(e) => setInitItem(Number(e.target.value))} value={initiative.item} />
      </div>
      <div className="grid grid-cols-2">
        <div>
          Etc
        </div>
        <input className="mx-2  parchment-bg text-center" onChange={(e) => setInitEtc(Number(e.target.value))} value={initiative.untyped} />
      </div>
    </DialogDefault>
  </div>
  )
}
