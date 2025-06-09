'use client'

import { useState } from "react"

interface SelectProps {
  selectName: string;
  options: string[][];
}

export function Select({ selectName, options }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState("")
  

  return (
    <div className="flex text-white gap-2 items-center">
      {selectName}
      <select name="" id="" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="flex items-center gap-2 p-1.5 rounded bg-white text-black">
        
      </select>
    </div>
  )
}