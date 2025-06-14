import Image from 'next/image'

export function SuccesModal({message}: {message: string}) {

    return (
        <div className={`flex h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed justify-center items-center left-0 top-0`}>
            <div className="bg-white h-[230px] w-[450px] relative flex justify-center items-center rounded flex-col -translate-y-10">
                <Image alt='' src={'check_circle_32_green.svg'} width={100} height={100}/>
                <h1 className='font-bold text-2xl text-[rgb(31,210,36)]'>{message}</h1>
            </div>
        </div>
    )
}