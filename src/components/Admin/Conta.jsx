import { admin } from "../../Data/mockData";

function Conta() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Conta do Administrador
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Nome:</h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            {admin.nome}
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Email:</h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            {admin.email}
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Telefone:</h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            {admin.telefone}
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Cargo:</h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            {admin.cargo}
          </p>
        </div>

        <div>
          <h1 className="block text-sm text-slate-600 mb-2">Permissoes:</h1>
          <p className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            {admin.permissoes.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conta;
