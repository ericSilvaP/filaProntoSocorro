import { Person } from "@/components/person";
import { SearchBar } from "@/components/searchBar";
import Link from "next/link";

export default function Tela1() {

    return (
        <div className="">
            <main className="flex mt-[5rem] px-10 gap-17 justify-center flex-col md:flex-row text-2xl">
                <section className="flex flex-col gap-5">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-center font-bold">Fila de Prioridade</h3>
                        <div className="flex flex-col bg-[rgb(56,163,165)] rounded p-8 gap-5">
                            <SearchBar />
                            <div className="p-1.5 bg-white rounded-2xl px-4">
                                Paciente 1 <br /> Paciente 2 <br /> Paciente 3
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-center font-bold">Pacientes Cadastrados</h3>
                        <div className="flex flex-col bg-[rgb(56,163,165)] rounded p-8 gap-5">
                            <SearchBar />
                            <div className="p-1.5 px-4 justify-center flex">
                                <Link href="./homeRecepcionista/tela2/">
                                    <button className="bg-[rgb(110,146,118)] p-1.5 rounded font-bold cursor-pointer">
                                    Cadastrar paciente
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center">
                    <h3 className="text-center font-bold">Atendidos Recentemente</h3>
                    <div className="flex flex-col p-8 justify-center items-center bg-[rgb(128,237,153)] gap-8 md:w-auto">
                        {[1,2,3,4,5].map(n => (
                            <div key={n} className="flex justify-center w-full gap-3 items-center">
                                <Person name={`Pessoa ${n}`}/>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="flex flex-col items-center">
                    <h3 className="font-bold text-center">Próximo</h3>
                    <div className="bg-[rgb(56,163,165)] p-8 items-center justify-between rounded flex gap-3 md:w-auto">
                        <Person name={`Pessoa 1`}/>
                    </div>
                </section>
            </main>
        </div>
    )
}