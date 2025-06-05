import { Person } from "@/components/person";

export default function Tela1() {

    return (
        <div className="">
            <main className="flex pt-32 px-10 gap-10 justify-center">
                <section className="flex flex-col gap-5">
                    <div>
                        <h3 className="text-center font-bold">Fila de Prioridade</h3>
                        <div className="flex flex-col w-[300px] bg-[rgb(56,163,165)] rounded p-5 gap-5">
                            <div className="p-1.5 bg-white rounded-2xl flex items-center gap-1">
                                <span className="material-symbols-outlined ">
                                    search
                                </span>
                                <span>
                                    <input type="text" name="" id="" placeholder="Pesquisar paciente"/>
                                </span>
                            </div>
                            <div className="p-1.5 bg-white rounded-2xl px-4">
                                Paciente 1 <br /> Paciente 2 <br /> Paciente 3
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-center font-bold">Pacientes Cadastrados</h3>
                        <div className="flex flex-col w-[300px] bg-[rgb(56,163,165)] rounded p-5 gap-5">
                            <div className="p-1.5 bg-white rounded-2xl flex items-center gap-1">
                                <span className="material-symbols-outlined ">
                                    search
                                </span>
                                <span>
                                    <input type="text" name="" id="" placeholder="Pesquisar paciente"/>
                                </span>
                            </div>
                            <div className="p-1.5 px-4 justify-center flex">
                                <button className="bg-[rgb(128,237,153)] p-1.5 rounded font-bold cursor-pointer">
                                    Cadastrar paciente
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className="text-center font-bold">Atendidos Recentemente</h3>
                    <div className="flex flex-col p-5 justify-center items-center bg-[rgb(128,237,153)] gap-8">
                        {[1,2,3,4,5].map(n => (
                            <div key={n} className="flex justify-center w-full gap-3 items-center">
                              <Person n={n}/>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="">
                    <h3 className="font-bold text-center">Próximo</h3>
                    <div className="bg-[rgb(56,163,165)] p-5 items-center justify-between rounded flex gap-3">
                      
                      <Person n={1}/>
                      
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </div>
                </section>
            </main>
        </div>
    )
}