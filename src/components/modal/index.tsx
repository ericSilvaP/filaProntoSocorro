'use client'

interface ModalProps {
    isOpen: boolean,
    toggleModal: () => void
}


export function Modal({ isOpen, toggleModal }: ModalProps) {

    return (
        <div className={`${isOpen ? "flex" : "hidden"} h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed justify-center items-center `} onClick={toggleModal}>
            <div className="bg-white h-[230px] w-[450px] relative flex justify-center items-center rounded">
                <button className="text-red-600 text-3xl cursor-pointer hover:text-4xl absolute right-[10px] transition-all duration-150 ease-in-out self-start" onClick={toggleModal}>&times;</button>
                <h1>Olha que legal!</h1>
            </div>
        </div>
    )
}