export function SearchBarInteractive({
  value,
  onChange,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="">
      <span>
        <input
          type="text"
          placeholder="Pesquisar paciente"
          className="focus:outline-none p-3.5 bg-white rounded-2xl flex items-center gap-1 focus-within:outline-2 focus-within:outline-indigo-100 border-2 border-[rgb(56,163,165)] w-full"
          value={value}
          onChange={onChange}
        />
      </span>
    </label>
  )
}
