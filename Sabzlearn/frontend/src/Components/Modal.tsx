import React from 'react'

interface IModal {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const Modal = ({ show, setShow, children }: IModal) => {
    return (
        <>
            {
                show ? (
                    <>
                        <div className="fixed z-0 w-screen h-screen min-h-screen backdrop-blur-sm bg-black/75" onClick={() => setShow(false)}></div>
                        <div className="flex justify-center items-center">
                            <div className="bg-white w-4/6 rounded-lg fixed z-10 flex justify-center text-center py-3 pb-5">
                                {children}
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    )
}

export default Modal