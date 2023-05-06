import React from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-violet-800 p-6 flex items-center justify-around">
      <div className=" text-white  w-1/3 flex justify-center ">
        <h2 className="text-xl">Seja bem vindo, {session?.user?.name}</h2>
      </div>
      <ul className="w-1/3 text-lg flex gap-8 items-center justify-center  text-white">
        <li className="cursor-pointer duration-300 border-b border-b-transparent hover:border-b-white">Home</li>
        <li className="cursor-pointer duration-300 border-b border-b-transparent hover:border-b-white">Meus condomy's</li>
        <li className="cursor-pointer duration-300 border-b border-b-transparent hover:border-b-white">Suporte</li>
      </ul>
      <div className="w-1/3 flex justify-center">
        <button onClick={() => signOut()} className="border border-white px-5 py-1 rounded text-white duration-300 hover:bg-white hover:text-black
       ">Sair da conta</button>
      </div>
    </div>
  );
};

export default Header;
