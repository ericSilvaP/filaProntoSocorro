import Image from 'next/image'

export function SearchBar() {
  return (
     <div className="p-1.5 bg-white rounded-2xl flex items-center gap-1 focus-within:outline-2 focus-within:outline-indigo-100 border-2 border-[rgb(56,163,165)]">
        <Image src={"/search_black.svg"} alt='' height={40} width={40} />
        <span>
            <input type="text" name="" id="" placeholder="Pesquisar paciente" className="focus:outline-none"/>
        </span>
    </div>
  )
}