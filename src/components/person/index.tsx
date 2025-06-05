
interface PersonProps {
  n: number
}

export function Person({ n }: PersonProps) {
  return (
    <div className="flex justify-center w-full gap-3 items-center">

      <div className="flex justify-center items-center bg-white rounded-full w-[40px] h-[40px]">
        <span className="material-symbols-outlined text-4xl">
          person
        </span>
      </div>
      <div className="font-bold">
        Pessoa {n}
      </div>
    </div>
  )
}