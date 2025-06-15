import Image from 'next/image'


export function Person({ name }: { name: string }) {
  return (
    <div className="flex w-full gap-3 justify-center">

      <div className="flex justify-center items-center bg-white rounded-full p-2">
        <Image src={"/person_black.svg"} alt='' height={40} width={40}/>
      </div>
      <div className="font-bold flex justify-center items-center">
        {name}
      </div>
    </div>
  )
}