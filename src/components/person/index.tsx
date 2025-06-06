
interface PersonProps {
  n: number
}

export function Person({ n }: PersonProps) {
  return (
    <div className="flex  w-full gap-3">

      <div className="flex justify-center items-center bg-white rounded-full w-[40px] h-[40px]">
        <span className="material-symbols-outlined text-4xl">
          person
        </span>
      </div>
      <div className="font-bold flex justify-center items-center">
        Pessoa {n}
      </div>
    </div>
  )
}