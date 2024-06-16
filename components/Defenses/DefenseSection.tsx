import React from "react"
import { K_DEFENSES } from "../Constants"
import DefenseCard from "./DefenseCard"

export default function DefenseSection() {

  return (
    <div className="rounded-lg border px-5 py-2 transition-colors">
      <div
        className="grid grid-cols-4"
      >
        {
          K_DEFENSES.map(def => (
            <DefenseCard key={def} defName={def} />
          ))
        }
      </div>
    </div>
  )
}