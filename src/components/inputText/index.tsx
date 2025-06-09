
interface InputProps {
  inputName: string;
  placeholder?: string;
  width?: number;
}

export function InputText({ inputName, placeholder, width }: InputProps) {

  return (
    <div className="text-white flex items-center gap-2">
      {inputName}:
      <div className="relative inline-block">

        <input type="text"
        className={`bg-white text-black font-medium p-1.5 rounded w-full truncate whitespace-nowrap overflow-hidden`}
        style={width ? {width: `${width}px`} : {}} placeholder={placeholder}/>

      </div>
    </div>
  )
}