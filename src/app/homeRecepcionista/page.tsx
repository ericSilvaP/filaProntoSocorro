import { Person } from "@/components/person";
import { SearchBar } from "@/components/searchBar";

export default function Tela1() {

  let patients = ['Paciente 1', 'Paciente 2', 'Paciente 3', 'Paciente 4', 'Paciente 5', 'Paciente 6', 'Paciente 7', 'Paciente 8', 'Paciente 9', 'Paciente 10',]

    return (
        <div className="">
            <main className="flex mt-[5rem] px-10 gap-17 justify-center flex-col md:flex-row text-2xl font-[family-name:var(--font-gabarito)]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-center font-bold">Fila de Prioridade</h3>
                        <div className="flex flex-col bg-[rgb(56,163,165)] rounded p-8 gap-5 shadow-2xl">
                            <SearchBar />
                            <div className="flex flex-col p-1.5 bg-white rounded-2xl px-4 gap-2">
                                {patients.map((p, i) => (i === 0 ?
                                  <div key={i} className="font-bold">
                                    <div className="text-center text-2xl">Próximo</div>
                                    <div className="text-[20px]">
                                      {p}
                                    </div>
                                  </div> : 
                                  <div key={i} className="text-[20px]">{p}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <h3 className="text-center font-bold">Atendidos Recentemente</h3>
                    <div className="flex flex-col p-8 justify-center items-center bg-[rgb(128,237,153)] gap-8 md:w-auto h-full shadow-2xl">
                        {[1,2,3,4,5].map(n => (
                            <div key={n} className="flex justify-center w-full gap-3 items-center">
                                <Person name={`Pessoa ${n}`}/>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}