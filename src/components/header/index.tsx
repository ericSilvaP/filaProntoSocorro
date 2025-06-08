import Image from 'next/image'

export function Header() {

    return (
        <div>
            <header className='flex justify-between px-5 py-2 bg-[rgb(56,163,165)]'>
              
                <Image src="/sistemal.svg" alt="" width={60} height={60} className='text-white'/>

                <div className='flex gap-2 items-center relative'>
                    <div className='h-[45px] w-[45px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center'>
                        <span className="material-symbols-outlined text-white cursor-pointer transition ease-in-out duration-300">
                            home
                        </span>
                    </div>
                    <div className='h-[45px] w-[45px] -translate-y-1 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] transition ease-in-out duration-300 rounded-full flex items-center justify-center'>
                        <div className="h-[3px] w-[20px] block bg-white 
                    before:content-[''] before:h-[100%] before:w-[100%] before:bg-white before:translate-y-[-8px] before:block
                    after:content-[''] after:h-[100%] after:w-[100%] after:bg-white after:translate-y-[5px] after:block">
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}