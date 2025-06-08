
interface FieldProps {
  fieldName: string;
  fieldInfo: string;
  fieldInfoSize?: number;
}

export function Field({ fieldName, fieldInfo, fieldInfoSize }: FieldProps) {
  return (
    <div className="text-white flex items-center gap-2">
      {fieldName}:
      <div 
      className={`bg-white text-black font-medium p-1.5 rounded w-full overflow-hidden`}
      style={fieldInfoSize ? {width: `${fieldInfoSize}px`} : {}}
      >
        {fieldInfo}
      </div>
    </div>
  )
}