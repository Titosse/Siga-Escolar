import { useState } from "react";

function DadosDaEscola() {
const [theme, setTheme] = useState("Claro");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Dados da Escola
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="block text-sm text-slate-600 mb-2">
            Nome da Escola
          </h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            Escola Estadual de Ensino Médio
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">
            Email Institucional
          </h1>
          <p
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            admin@siga.com
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Telefone</h1>
          <p
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            (258) 84 000 0000
          </p>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-2">
            Tema do Sistema
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option>Claro</option>
            <option>Escuro</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DadosDaEscola;
