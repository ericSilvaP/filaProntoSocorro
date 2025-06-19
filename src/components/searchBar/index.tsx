
export function SearchBar() {
  return (
    <label className="p-1.5 bg-white rounded-2xl flex items-center gap-1 focus-within:outline-2 focus-within:outline-indigo-100 border-2 border-[rgb(56,163,165)]">
        
        <span>
            <input 
              type="text" 
              placeholder="Pesquisar paciente" 
              className="focus:outline-none"
            />
        </span>
    </label>
  )
}