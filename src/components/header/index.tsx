import Image from 'next/image'

export function Header() {

    return (
        <div>
            <header className='flex justify-between px-5 py-2 bg-[rgb(56,163,165)]'>
                <Image src="sistemal.svg" alt="" width={60} height={60} className='bg-[rgba(0,0,0,0)]'/>

                <div className='flex gap-5 items-center'>
                    <div>
                        <span className="material-symbols-outlined text-white cursor-pointer">
                            home
                        </span>
                    </div>
                    <div className='h-[25px] w-[20px] -translate-y-1 cursor-pointer hover:rotate-90 transition duration-150'>
                        <div className="h-[3px] w-[20px] block bg-white translate-y-3
                    before:content-[''] before:h-[100%] before:w-[100%] before:bg-white before:translate-y-[-8px] before:block
                    after:content-[''] after:h-[100%] after:w-[100%] after:bg-white after:translate-y-[5px] after:block">
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}