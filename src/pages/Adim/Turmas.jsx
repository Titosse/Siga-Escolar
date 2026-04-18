function Classes() {
  const classes = [
    {
      id: 1,
      nome: "Turma A",
      classe: "1ª Ano",
      turno: "Manhã",
      sala: "Sala 03",
      director: "Helena José",
      estudantes: 42,
      estado: "Activa",
    },
    {
      id: 2,
      nome: "Turma B",
      classe: "2ª Ano",
      turno: "Tarde",
      sala: "Sala 05",
      director: "João Manuel",
      estudantes: 38,
      estado: "Activa",
    },
    {
      id: 3,
      nome: "Turma C",
      classe: "3ª Ano",
      turno: "Manhã",
      sala: "Sala 02",
      director: "Carlos Alberto",
      estudantes: 35,
      estado: "Pendente",
    },
    {
      id: 4,
      nome: "Turma D",
      classe: "2ª Ano",
      turno: "Noite",
      sala: "Sala 07",
      director: "Lídia Ernesto",
      estudantes: 29,
      estado: "Activa",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Turmas
            </h1>
            <p className="text-slate-500">
              Lista e controlo das turmas registadas no sistema
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition">
            + Nova Turma
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Pesquisar por nome da turma..."
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            <option>Todos os anos</option>
            <option>1ª Ano</option>
            <option>2ª Ano</option>
            <option>3ª Ano</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            <option>Todos os turnos</option>
            <option>Manhã</option>
            <option>Tarde</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400">
            <option>Todos os estados</option>
            <option>Activa</option>
            <option>Pendente</option>
            <option>Inactiva</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-3">
          <div className="w-full overflow-x-auto ">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="py-3 px-4 text-slate-600">ID</th>
                  <th className="py-3 px-4 text-slate-600">Turma</th>
                  <th className="py-3 px-4 text-slate-600">Classe</th>
                  <th className="py-3 px-4 text-slate-600">Turno</th>
                  <th className="py-3 px-4 text-slate-600">Sala</th>
                  <th className="py-3 px-4 text-slate-600">Director</th>
                  <th className="py-3 px-4 text-slate-600">Estudantes</th>
                  <th className="py-3 px-4 text-slate-600">Estado</th>
                  <th className="py-3 px-4 text-slate-600">Acções</th>
                </tr>
              </thead>

              <tbody>
                {classes.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 text-slate-700">{item.id}</td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {item.nome}
                    </td>
                    <td className="py-4 px-4 text-slate-700">{item.classe}</td>
                    <td className="py-4 px-4 text-slate-700">{item.turno}</td>
                    <td className="py-4 px-4 text-slate-700">{item.sala}</td>
                    <td className="py-4 px-4 text-slate-700">
                      {item.director}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {item.estudantes}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.estado === "Activa"
                            ? "bg-green-100 text-green-700"
                            : item.estado === "Pendente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                          Ver
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition">
                          Editar
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition">
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">
            A mostrar <span className="font-semibold">1-4</span> de{" "}
            <span className="font-semibold">4</span> turmas
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              Anterior
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white">
              1
            </button>
            <button className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              2
            </button>
            <button className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classes;
