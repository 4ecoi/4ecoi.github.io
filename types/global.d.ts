import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY, K_SKILLS } from "@/components/Constants"
import { Interface } from "readline"


export interface DefBonus {type: string, value: number}
// {
//   armor: number
//   class: number
//   race: number
//   ench: number
//   feat: number
//   item: number
//   untyped: number
// }

export interface Transaction {
  time: string
  gp: number
  item: string
  amt: number
}

export interface Feat {
  name: string
  source: string
  desc: string
}

export interface CondMod {
  name: string
  atkBonus: string
  dmgBonus: string
  isActive: boolean 
}

export interface Power {
  "name": string
  "ability": typeof K_ABILITIES[number]
  "weapon": number
  "freq": typeof K_POWER_FREQUENCY[number]
  "target": typeof K_DEFENSES[number]
  "atkRoll": string
  "desc": string
  "dmgBonus": string
  "wpnMult": number
}

export interface CharData {
  name: string
  race: string
  background: string
  hpBase: number
  hpPerLevel: number
  ausp: boolean
  baseHs: number
  class: string
  level: number
  defBonus: {[key: typeof K_DEFENSES[number]]: DefBonus[] }
  levelBonus: number
  abilities: {[key: typeof K_ABILITIES[number]] : Ability}
  skills: {[key:typeof K_SKILLS[number]] : Skill}
  feats: Feat[]
  weapons: Weapon[]
  powers: Power[]
  transactions: Transaction[]
  condMod: CondMod[]
}

// Mod	½ Lv	Armor	Class	Race	Ench.	Feat	Item	Untypd

export interface Ability {
  "value": number
  "mod": number
  "sources": {[key: string] : number}
}

export interface Skill {
  "ability": string,
  "trained": boolean,
  "feat": number,
  "item": number,
  "untyped": number,
}

export interface Weapon {
  "name": string
  "profBonus": number
  "enhc": number
  "atkBonus": number
  "desc": string
  "dmgDice": string
  "dmgBonus" : number
}