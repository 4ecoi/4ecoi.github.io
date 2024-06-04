import { CharData, CondMod, DefBonus, Power, Transaction, Weapon } from "@/types/global"

export const K_ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
export const K_DEFENSES = ["AC", "FOR", "REF", "WIL"]
export const K_SKILLS = [
  "Acrobatic",
  "Arcana",
  "Athletics",
  "Bluff",
  "Diplomacy",
  "Dungeoneer",
  "Endurance",
  "Heal",
  "History",
  "Insight",
  "Intimidate",
  "Nature",
  "Perception",
  "Religion",
  "Stealth",
  "Streetwise",
  "Thievery",
]

export const K_DEFENSE_BONUSES = [
    "Armor",
    "Class",
    "Race",
    "Ench",
    "Feat",
    "Item",
    "Untyped",
]

// export const K_SKILLS = [
//   {name: "Acrobatic", ability: "DEX"},
//   {name: "Arcana", ability: "INT"},
//   {name: "Athletics", ability: "STR"},
//   {name: "Bluff", ability: "CHA"},
//   {name: "Diplomacy", ability: "CHA"},
//   {name: "Dungeoneer", ability: "WIS"},
//   {name: "Endurance", ability: "CON"},
//   {name: "Heal", ability: "WIS"},
//   {name: "History", ability: "INT"},
//   {name: "Insight", ability: "WIS"},
//   {name: "Intimidate", ability: "CHA"},
//   {name: "Nature", ability: "WIS"},
//   {name: "Perception", ability: "WIS"},
//   {name: "Religion", ability: "INT"},
//   {name: "Stealth", ability: "DEX"},
//   {name: "Streetwise", ability: "DEX"},
//   {name: "Thievery", ability: "DEX"},
// ]

export const K_ABILITIES_BY_DEFENSES: {[def: typeof K_DEFENSES[number]]: string[]} = {
  "AC": ["DEX", "INT"],
  "FOR": ["CON", "STR"],
  "REF": ["DEX", "INT"],
  "WIL": ["WIS", "CHA"]
}

export const K_DEFAULT_POWER: Power = {
  "name": "",
  "ability": "STR",
  "weapon": 0,
  "atkRoll": 'd20',
  "freq": 'ATWILL',
  "dmgBonus": '0',
  "wpnMult": 0,
  "desc": "power description",
  "target": "ac"
}

export const K_DEFAULT_CONDITION: CondMod = {
  "name": "",
  "atkBonus": "",
  "dmgBonus": "",
  "isActive": false,
}

export const K_POWER_FREQUENCY = ["ATWL", "ENC", "DLY"]
export const K_DEFAULT_FEAT = {
  "name": "",
  "desc": "",
  "source": ""
}
export const K_DEFAULT_TRANS: Transaction = {
  "time": "0.00",
  "gp": 0,
  "item": "",
  "amt": 0
}
export const K_DEFAULT_WEAPON: Weapon = {
  "name": "",
  "atkBonus": 0,
  "enhc": 0,
  "profBonus": 0,
  "dmgDice": "",
  "dmgBonus": 0,
  "desc": ""
}
export const K_DEFAULT_DEF_BONUS_ARRAY: DefBonus[] = [
  {type: "Armor", value: 0},
  {type: "Class", value: 0},
  {type: "Race", value: 0},
  {type: "Ench", value: 0},
  {type: "Feat", value: 0},
  {type: "Item", value: 0},
  {type: "Untyped", value: 0},
]

export const K_DEFAULT_CHAR_DATA: CharData = {
  "name": "Name", 
  "class": "Class",
  "background": "Background",
  "hpBase": 10,
  "hpPerLevel": 4,
  "baseHs": 0,
  "ausp": false,
  "level": 1,
  "levelBonus": 1, 
  "defBonus": {
    "AC": [
      {type: "Armor", value: 0},
      {type: "Class", value: 0},
      {type: "Race", value: 0},
      {type: "Ench", value: 0},
      {type: "Feat", value: 0},
      {type: "Item", value: 0},
      {type: "Untyped", value: 0},
    ],
    "FOR": [
      {type: "Armor", value: 0},
      {type: "Class", value: 0},
      {type: "Race", value: 0},
      {type: "Ench", value: 0},
      {type: "Feat", value: 0},
      {type: "Item", value: 0},
      {type: "Untyped", value: 0},
    ],
    "REF": [
      {type: "Armor", value: 0},
      {type: "Class", value: 0},
      {type: "Race", value: 0},
      {type: "Ench", value: 0},
      {type: "Feat", value: 0},
      {type: "Item", value: 0},
      {type: "Untyped", value: 0},
    ],
    "WIL": [
      {type: "Armor", value: 0},
      {type: "Class", value: 0},
      {type: "Race", value: 0},
      {type: "Ench", value: 0},
      {type: "Feat", value: 0},
      {type: "Item", value: 0},
      {type: "Untyped", value: 0},
    ],
  },
  "race": "Race",
  "abilities": {
    "STR": {
      "value": 10,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
    "DEX": {
      "value": 10,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
    "CON": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
    "INT": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
    "WIS": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
    "CHA": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 0,
        "asi": 0
      }
    },
  },
  "skills": {
    "Acrobatic": {
      "ability": "DEX",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Arcana": {
      "ability": "INT",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Athletics": {
      "ability": "STR",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Bluff": {
      "ability": "CHA",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Diplomacy": {
      "ability": "CHA",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Dungeoneer": {
      "ability": "WIS",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Endurance": {
      "ability": "CON",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Heal": {
      "ability": "WIS",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "History": {
      "ability": "INT",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Insight": {
      "ability": "WIS",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Intimidate": {
      "ability": "CHA",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Nature": {
      "ability": "WIS",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Perception": {
      "ability": "CHA",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Religion": {
      "ability": "WIS",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Stealth": {
      "ability": "DEX",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Streetwise": {
      "ability": "CHA",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
    "Thievery": {
      "ability": "DEX",
      "trained": false,
      "feat": 0,
      "item": 0,
      "untyped": 0,
    },
  },
  "feats": [{...K_DEFAULT_FEAT}],
  "powers": [{...K_DEFAULT_POWER}],
  "weapons": [{...K_DEFAULT_WEAPON}],
  "transactions": [],
  "condMod": []
}

export const K_INPUT_CLASSNAME = "text-center bg-gray-600 p-2"