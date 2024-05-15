import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY, K_SKILLS } from "@/components/Constants"
import { Interface } from "readline"

export interface CharData {
  name: string
  race: string
  background: string
  class: string
  level: number
  levelBonus: number
  abilities: {[key: typeof K_ABILITIES[number]] : Ability}
  skills: {[key:typeof K_SKILLS[number]] : Skill}
  feats: any
  weapons: Weapon[]
  powers: power[]
}

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

export interface Power {
  "name": string
  "ability": typeof K_ABILITIES[number]
  "weapon": number
  "freq": typeof K_POWER_FREQUENCY[number]
  "target": typeof K_DEFENSES[number]
  "bonus": number
  "desc": string
}

export interface Weapon {
  "name": string
  "profBonus": number
  "enhc": number
  "bonus": number
  "desc": string
}