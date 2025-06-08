'use client'

import { useEffect, useRef, useState } from "react";

interface FieldProps {
  fieldName: string;
  fieldInfo: string;
  fieldInfoSize?: number;
}

export function Field({ fieldName, fieldInfo, fieldInfoSize }: FieldProps) {
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth)
    }
  }, [fieldInfoSize])

  return (
    <div className="text-white flex items-center gap-2">
      {fieldName}:
      <div className="relative inline-block">
        <div 
        ref={contentRef}
        className={`bg-white text-black font-medium p-1.5 rounded w-full ${expanded ? '' : 'truncate whitespace-nowrap overflow-hidden'}`}
        style={fieldInfoSize ? {width: `${fieldInfoSize}px`} : {}}
        >
          {fieldInfo}
        </div>

        {!expanded && isOverflowing && (
          <button
            onClick={() => setExpanded(true)}
            className="absolute top-1 right-1 bg-white text-black font-bold px-1 select-none z-10"
          >
            …
          </button>
        )}

        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="mt-1 text-sm text-blue-300 hover:underline"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  )
}