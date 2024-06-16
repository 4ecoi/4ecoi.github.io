import React from "react";
import { CondMod, Power } from "@/types/global";
import { useContext, useMemo, useState } from "react";
import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY } from "../Constants";
import { FaChevronRight, FaChevronDown, FaDiceD20 } from "react-icons/fa6";
import { isDiceString, isNumString } from "../Shared/Functions";
import { Transition } from "@headlessui/react";
import { CharContext } from "@/app/context";
import ConditionToggles from "../ConditionSection/ConditionToggles";

interface Props{
  index: number
  activeConditions: CondMod[]
  toggleCondActive: (condIndex: number) => void
}
export default function PowerCard({index, activeConditions}: Props){
  const {charData, setCharData} = useContext(CharContext)

  const power: Power = charData.powers[index]
  const [targets, setTargets] = useState("")
  const [showDetail, setShowDetail] = useState(false)
  const [isAvail, setIsAvail] = useState(true)
  const [showTooltip, setShowTooltip]= useState(false)
  const changePowerName = (val: string) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].name = val
    setCharData({...updatedChar})
  }
  const changePowerDesc = (val: string) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].desc = val
    setCharData({...updatedChar})
  }
  const changePowerWeapon = (val: number) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].weapon = val
    setCharData({...updatedChar})
  }
  const changePowerTarget = (val: string) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].target = val
    setCharData({...updatedChar})
  }
  const changePowerFreq = (val: string) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].freq = val
    setCharData({...updatedChar})
  }
  const changePowerAbi = (val: string) => {
    const updatedChar = {...charData}
    updatedChar.powers[index].ability = val
    setCharData({...updatedChar})
  }
  const changeAtkBonus = (val: number) => {
    if(!isNumString(val)) return
    const updatedChar = {...charData}
    updatedChar.powers[index].atkBonus = val
    setCharData({...updatedChar})
  }
  const changeWpnMult = (val: number) => {
    if(!isNumString(val)) return
    const updatedChar = {...charData}
    updatedChar.powers[index].wpnMult = val
    setCharData({...updatedChar})
  }
  const changeDmgBonus = (val: string) => {
    if(!isDiceString(val)) return
    const updatedChar = {...charData}
    updatedChar.powers[index].dmgBonus = val
    setCharData({...updatedChar})
  }
  const powerWeapon = useMemo(() => (
    charData.weapons[power.weapon]
  ), [charData, power])

  const extAtkBonus = useMemo(() => {
    let res = 0
    res += Number(powerWeapon.atkBonus + powerWeapon.enhc)
    activeConditions.forEach(cond => {res += Number(cond.atkBonus)})
    return res
  }, [charData])

  const extDmgBonus = useMemo(() => {
    let staticBonus = 0
    let string = ''
    staticBonus += powerWeapon.dmgBonus + powerWeapon.enhc
    activeConditions.forEach(cond => {
      if(isNumString(cond.dmgBonus)) {staticBonus += Number(cond.dmgBonus)}
      else string += `+${cond.dmgBonus}`
    })
    return `${staticBonus+string}`
  }, [charData]) 

  const usePower = () => {
    let text = ""
    
    const targetArray = targets.split(",")
    targetArray.forEach((tar:string) => {
      if(tar.includes("^")) text += "[[2d20kh1"
      else text+="[[d20"

      text += extAtkBonus + power.atkBonus

      if(tar.includes("+")) text += (`+2 vs ${power.target} ${tar.substring(0, tar.length -1)}`)
      
      text += ` vs ${power.target} ${tar.replace(/[^a-z0-9-]/g, '')}]]`
    })

    if (power.wpnMult || (power.dmgBonus && power.dmgBonus !== "0")) {
      text += `[[`
      if (power.wpnMult){
        const wpnDieArr = powerWeapon.dmgDice.split("d")
        const wponDmgString = `${Number(wpnDieArr[0]) * power.wpnMult}d${Number(wpnDieArr[1])}`
        text += wponDmgString
      }
      text += `+${extDmgBonus}+${power.dmgBonus}`
      text += `]]`
    }
    text += (`\n ${power.desc}`)
    navigator.clipboard.writeText(text)
    if(power.freq == "ENC" || power.freq == "DLY") setIsAvail(!isAvail)
    fetch('https://discord.com/api/webhooks/1251017102568198275/s5LuV6PMHglvYKGqP3VABn4KXCkhW0_J_26ga2igrDccRo3tYELLSVx3kEVZbqDBQCaR', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: 'ahoy'
      })
    })
  }

  const removePower = () => {
    const updatedCharPowers = [...charData.powers]
    updatedCharPowers.splice(index, 1)
    setCharData({
      ...charData,
      powers: [...updatedCharPowers]
    })
  }

  return (
    <div
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
      className={`group m-4`}
    >
      <div className={`my-auto relative flex flex-col text-center px-4 rounded-lg border py-4 transition-colors max-w-80 hover:border-neutral-700 ${isAvail? "parchment-bg" : "goldwood"}`}>
        <div className="mx-1 text-left flex">
          <select 
            className="parchment-bg opacity-70"
            value={power.freq}
            onChange={(e) => changePowerFreq(e.target.value)}
          >
            {K_POWER_FREQUENCY.map((freq, index)=> <option key={index} value={freq} className="text-center"> {freq} </option>)}
          </select> 
          <input value={power.name} className="border-none bg-transparent w-full px-2" placeholder="Power Name" onChange={(e) => changePowerName(e.target.value)}/>
          <div className="flex justify-end w-12 items-center">
            {showDetail ? 
            <FaChevronDown className="py-0 mb-0" onClick={() => setShowDetail(!showDetail)}/> 
            : <FaChevronRight className="py-0 mb-0" data-fa-transform="down-4" onClick={() => setShowDetail(!showDetail)} />}
          </div>
        </div>
        
        <div className="grid my-1 mx-1 grid-cols-8 text-center">
          <div className="flex col-span-3">
            <p>{`d20+${extAtkBonus}+`}</p>
            <input value={power.atkBonus} className="mx-1 w-8" onChange={(e) => changeAtkBonus(Number(e.target.value))}/>
          </div>
          <div className="grid col-span-4 grid-cols-3 w-full mr-1">
            <>tgt:</>
            <input value={targets} className="text-center col-span-2  parchment-bg" onChange={(e) => setTargets(e.target.value)}/>
          </div>
          <div className="flex my-auto justify-end w-full items-center cursor-pointer col-span-1">
              <FaDiceD20 onClick={usePower}/>
          </div>
        </div>
        <div className="flex mx-1 mb-1 text-center">
          <input value={power.wpnMult} className="w-8 col-span-1" onChange={(e) => changeWpnMult(Number(e.target.value))}/>
          <span className="my-auto w-8 rounded col-span-1 mx-1 text-sm">{`[W]+`}</span>
          <input value={power.dmgBonus} className="text-center col-span-1 parchment-bg w-8" onChange={(e) => changeDmgBonus(e.target.value)}/>
          <div className="col-span-2 mx-1">{`+${extDmgBonus}`}</div>
        </div>
        {showDetail ? 
        <div className="items-center text-center flex flex-col">
          <div className="grid grid-cols-2 my-1">
            <select 
              className="bg mx-1"
              value={power.weapon}
              onChange={(e) => changePowerWeapon(Number(e.target.value))}
            >
              {charData.weapons.map((weap, index)=> <option key={index} value={index} className="text-center"> {weap.name} </option>)}
            </select>
            <div className="grid text-center grid-cols-3">
              <select 
                className=" parchment-bg w-full"
                value={power.ability}
                onChange={(e) => changePowerAbi(e.target.value)}
              >
                {K_ABILITIES.map((abi, index)=> <option key={index} value={abi} className="text-center"> {abi} </option>)}
              </select>
              <p>vs</p>
              <select 
                className=" parchment-bg w-full"
                value={power.target}
                onChange={(e) => changePowerTarget(e.target.value)}
              >
                {K_DEFENSES.map((def, index)=> <option key={index} value={def} className="text-center"> {def} </option>)}
              </select>          
            </div>
          </div>
          <textarea className="mx-1 w-72 parchment-bg h-full text-sm text-center rounded-md p-2" onChange={(e) => changePowerDesc(e.target.value)} value={power.desc}/>
          <button className="mx-1 parchment-bg h-8 text-sm text-center  my-1 w-60" onClick={removePower}>Delete</button>
        </div>
        : null
        }
        <Transition
          show={showTooltip}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-300 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-12"
        >
          <ConditionToggles />
        </Transition>
      </div>
    </div>
  )
}