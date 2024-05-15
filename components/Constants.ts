import { CharData } from "@/types/global"

export const K_ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
export const K_DEFENSES = ["AC", "FOR", "REF", "WILL"]
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

export const K_DEFAULT_POWER = {
  "name": "",
  "ability": "STR",
  "weapon": 0,
  "bonus": 0,
  "desc": "power description",
  "target": "ac"
}

export const K_POWER_FREQUENCY = ["ATWL", "ENC", "DLY"]
export const K_DEFAULT_FEAT = [
  {
    "name": "FeatName",
    "desc": "feat description",
    "source": ""
  }
]

export const K_DEFAULT_CHAR_DATA: CharData = {
  "name": "Name", 
  "class": "Class",
  "background": "Background",
  "level": 1,
  "levelBonus": 1, 
  "race": "Race",
  "abilities": {
    "STR": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 2,
        "asi": 0
      }
    },
    "DEX": {
      "value": 0,
      "mod": 0,
      "sources": {
        "base": 10,
        "race": 2,
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
  "feats": "",
  "powers": [{...K_DEFAULT_POWER}],
  "weapons": [
    {
      "name": "None",
      "bonus": 0,
      "enhc": 1,
      "profBonus": 0,
      "desc": "",
    },
  ],
}
