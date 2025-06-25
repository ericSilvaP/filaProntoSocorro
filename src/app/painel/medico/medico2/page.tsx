import Image from 'next/image'

export default function FichaPaciente() {
  return (
    <div className="flex justify-center mt-[3rem] font-[family-name:var(--font-gabarito)]">
      <div className="bg-[rgb(56,163,165)] h-[50rem] w-[35rem] text-white p-6">
        <h1 className="text-center w-full font-extrabold text-2xl mb-5">Informações Pessoais</h1>
        <div className="flex gap-2 flex-3">
          <div className="flex-3 flex justify-center items-center">
            <div className="rounded-full size-[6rem] bg-white flex justify-center items-center">
              <Image src={'/person_40_black.svg'} alt="" height={60} width={60} />
            </div>
          </div>
          <div className="flex-7 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div>Nome:</div>
              <div className="custom-input w-full">Eric</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>Sexo:</div>
              <div className="custom-input w-full">Masculino</div>
              <div>Idade:</div>
              <div className="custom-input w-full">19</div>
            </div>
            <div className="flex gap-2 items-center justify-center bg-white p-2 text-black">
              Pouco Urgente (verde)
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div></div>
        </div>

        <div>3</div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <button>Editar</button>
        </div>
      </div>

      <div></div>
    </div>
  )
}
