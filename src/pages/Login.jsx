import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../Data/mockData";

function Login() {
  const navigate = useNavigate();

  const studentsData = JSON.parse(localStorage.getItem("students")) || [];
  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const adminsData = JSON.parse(localStorage.getItem("admins")) || [];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function userCadastrado(Email, Senha) {
    const userFound = [...studentsData, ...teachersData, ...adminsData, ...users].find((user) => {
      if (user.email === Email && user.senha === Senha) {
        return true;
      }
      return false;
    });


    function categoriaUser(categoria) {
      if (userFound && categoria === "Estudante") {
        navigate(`/aluno?nome=${userFound.nome}&categoria=${userFound.categoria}`);
      } else if (userFound && categoria === "Professor") {
        navigate(`/teacher?nome=${userFound.nome}&categoria=${userFound.categoria}`);
      } else if (userFound && categoria === "Administrador") {
        navigate(`/admin?nome=${userFound.nome}&categoria=${userFound.categoria}`);
  
      }

      return true;
    }

    const vazio = (value) => value.trim() === "";
    if (vazio(email) || vazio(password)) {
        alert("Preencha todos os campos!");
        return false;
      } else if (!userFound) {
        alert("Email ou senha incorretos!");
        return false;
      } else {
        categoriaUser(userFound.categoria);
        return true;
      }
  }

  return (
    <div className="flex items-center  flex-col justify-center min-h-screen bg-blue-400">
      <div className=" p-6 rounded-md gap-4">
        <p className="text-white text-3xl font-bold">SIGA</p>
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-blue-300"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-blue-300"
            id="password"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 translate-y-1/2 text-slate-300"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full rounded-4xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => userCadastrado(email, password)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
