import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });

  const allCondominums = await prisma.condominium.findMany();

  return {
    props: {
      currentUser,
      allCondominums,
    },
  };
}

const Home = (props: {
  currentUser: {
    email: String;
    name: String;
    password: String;
    id: String;
    condominiums: [];
  };
  allCondominums: [];
}) => {
  const { data: session } = useSession();
  const { push } = useRouter();

  console.log(session?.user!);
  console.log(props.currentUser);

  console.log(props.allCondominums);

  if (session) {
    return (
      <div>
        <Header></Header>
        <div className="text-2xl p-8 font-bold w-screen text-center">
          <h2>Seus condomínios</h2>
        </div>
        <div className="grid grid-cols-3">
          {props.currentUser.condominiums.map((condominioDoUsuario) => (
            <div>
              {props.allCondominums.map(
                (dataCondominio: {
                  address: String;
                  name: String;
                  city: String;
                  id: String;
                  participants: [];
                }) => (
                  <div>
                    {condominioDoUsuario == dataCondominio.id ? (
                      <div className="border border-violet-600 w-fit m-auto p-8 rounded  box-s  shadow-xl">
                        <div className="text-2xl font-bold">{dataCondominio.name}</div>
                        <div className="mt-2">
                          <div className="text-gray-500">{dataCondominio.city}</div>
                          <div className="text-gray-500">{dataCondominio.address}</div>
                        </div>
                        <div className="text-center mt-4">
                          <button className="bg-violet-500 px-3 py-1 rounded border border-violet-500 text-white font-bold duration-300 hover:bg-transparent hover:text-violet-500">
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <div>
          {props.currentUser.condominiums.length == 0 ? <div>Você não está em nenhum condominio!</div> : <div></div> }
        </div>

       
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="text-red-500 font-bold text-2xl mb-5">
          Você não está logado!
        </div>
        <button
          className="bg-slate-700 px-4 py-2 rounded text-white text-md font-semibold"
          onClick={() => push("/")}
        >
          Clique aqui para realizar o seu login
        </button>
      </div>
    );
  }
};

export default Home;
