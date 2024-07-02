import { useState } from "react"

export default function Login(){
        const [login, setLogin] = useState(true)
        const [register, setRegister] = useState(false)

    return(
            <div className="w-[1320px] h-[80vh] bg-white rounded-3xl p-[30px] flex">
                <div className="loginForm basis-2/4">
                    <h2 className="text-2xl font-bold font-poppins">Kanban İş Takip Uygulamasına Hoş Geldiniz!</h2>
                    <div className="flex justify-start mt-[10px]">
                        <button className={login ? "font-bold text-[15px] font-poppins mr-[10px]" : "text-[15px] font-poppins mr-[10px]"}
                        onClick={() => {setLogin(true);
                                        setRegister(false)}}>Giriş Yap!</button>
                         <button className={register ? "font-bold text-[15px] font-poppins mr-[10px]" : "text-[15px] font-poppins mr-[10px]"} onClick={() => {setLogin(false);
                            setRegister(true)}}>Kayıt Ol!</button>
                    </div>

                    {login && (
                    <div className="mt-[40px]">
                        <h2 className="text-3xl">Giriş Yap</h2>
                    </div>
                    )}

                    {register && (
                    <div className="mt-[40px]">
                        <h2 className="text-3xl">Kayıt ol</h2>
                    </div>
                    )}
                </div>
                <div className="loginImage basis-2/4">
                    <div className="flex justify-center items-center h-full">
                        <img src="../../public/kanban-logo.png" alt="" className="w-[50%] h-[200px] object-contain" />
                    </div>
                </div>
            </div>
    )
}