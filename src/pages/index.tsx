import { FormEvent, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const { push } = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      console.log(res);
      if (res!.ok === false) {
        window.alert("Dados incorresotos");
      }
    });
  };

  if (session) {
    push("/home");
  }

  return (
    <>
      <div className="flex flex-col-reverse justify-between bg-slate-800 lg:flex-row ">
        <div className="bg-slate-800 w-screen h-screen flex justify-center items-start lg:h-screen lg:items-center lg:justify-center lg:w-2/5">
          <div>
            <h1 className="text-xl font-bold text-white uppercase">
              faça seu Login
            </h1>

            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col mt-4">
                <label htmlFor="" className="text-white font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded bg-transparent text-white border border-white py-1 px-2"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="" className="text-white font-bold">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded bg-transparent text-white border border-white py-1 px-2"
                />
              </div>
              <button type="submit" className="mt-4 bg-white py-2 px-6 rounded">
                Entrar
              </button>
            </form>
          </div>
        </div>

        <div className="bg-violet-800 w-1/1 h-96  default-clip flex justify-center items-center  lg:clip-your-needful-style lg:w-3/5 lg:h-screen">
          <div className="flex flex-col">
            <h1 className="font-bold text-5xl text-white">CondoMy,</h1>
            <p className="mt-3 text-lg text-white text-center">
              Seu condomínio inteligente
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
