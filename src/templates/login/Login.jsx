import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../SupaClient";

export default function Login() {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    const [message, setMessage] = useState('');

    const supabase = useSupabase();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const loginData = Object.fromEntries(new FormData(e.target));
        const { e_mail, password } = loginData;

        try {
            const { error, user } = await supabase.auth.signInWithPassword({
                email: e_mail,
                password: password,
            });

            if (error) {
                if (error.message.includes("Email not confirmed")) {
                    setMessage("Email adresiniz doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.");
                } else {
                    console.error("Hata:", error.message);
                }
                return;
            }

            if (user && user.confirmed_at) {
                navigate('/dashboard');
            } else {
                setMessage("Email adresiniz doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.");
                alert("Doğrulama e-postası gönderilmiş olabilir. Lütfen e-posta adresinizi kontrol edin, veya doğrulamışsanız devam edebilirsiniz");
            }
        } catch (error) {
            console.error("Beklenmedik bir hata oluştu:", error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const registerData = Object.fromEntries(new FormData(e.target));
        const { name_surname, e_mail, password } = registerData;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: e_mail,
                password: password,
                options: {
                    data: {
                        name_surname: name_surname,
                    },
                },
            });

            if (error) {
                console.error("Hata:", error.message);
                return;
            }

            const { user } = data;
            if (!user) {
                console.error("Kullanıcı oluşturulamadı.");
                return;
            }

            setMessage("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
            e.target.reset();
        } catch (error) {
            console.error("Beklenmedik bir hata oluştu:", error.message);
        }
    };

    return (
        <div className="w-full h-screen bg-[#635fc7] flex justify-center items-center">
        <div className="w-[1320px] h-[60vh] bg-white rounded-3xl p-[30px] flex items-center shadow-2xl">
            <div className="loginForm basis-2/4">
                <h2 className="text-2xl font-bold font-poppins">Kanban İş Takip Uygulamasına Hoş Geldiniz!</h2>
                <div className="flex justify-start mt-[10px]">
                    <button
                        className={login ? "font-bold text-[15px] font-poppins mr-[10px]" : "text-[15px] font-poppins mr-[10px]"}
                        onClick={() => {
                            setLogin(true);
                            setRegister(false);
                        }}
                    >
                        Giriş Yap!
                    </button>
                    <button
                        className={register ? "font-bold text-[15px] font-poppins mr-[10px]" : "text-[15px] font-poppins mr-[10px]"}
                        onClick={() => {
                            setLogin(false);
                            setRegister(true);
                        }}
                    >
                        Kayıt Ol!
                    </button>
                </div>
                {login && (
                    <div className="mt-[40px]">
                        <h2 className="text-3xl">Giriş Yap</h2>
                        <form onSubmit={handleLoginSubmit} className="w-2/3 flex flex-col gap-[15px] mt-[20px] ">
                            <input
                                type="email"
                                name="e_mail"
                                placeholder="E-mail Adresiniz"
                                className="border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color-[#635fc7]"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Şifreniz"
                                className="border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color-[#635fc7]"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                Giriş Yap
                            </button>
                        </form>
                    </div>
                )}

                {register && (
                    <div className="mt-[40px]">
                        <h2 className="text-3xl">Kayıt ol</h2>
                        <form onSubmit={handleRegisterSubmit} className="w-2/3 flex flex-col gap-[15px] mt-[20px] ">
                            <input
                                type="text"
                                name="name_surname"
                                placeholder="Adınız Soyadınız"
                                className="border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color-[#635fc7]"
                                required
                            />
                            <input
                                type="email"
                                name="e_mail"
                                placeholder="E-mail Adresiniz"
                                className="border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color-[#635fc7]"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Belirlemek İstediğiniz şifre"
                                className="border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color-[#635fc7]"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                Kayıt Ol
                            </button>
                        </form>
                    </div>
                )}
                {message && <p>{message}</p>}
            </div>
            <div className="loginImage basis-2/4">
                <div className="flex justify-center items-center h-full">
                    <img src="../../public/checklist.jpg" alt=""  />
                </div>
            </div>
        </div>
    </div>
    );
}