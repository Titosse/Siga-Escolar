function Reports() {
  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">

        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Relatórios
            </h1>
            <p className="text-slate-500">
              Análise de desempenho académico e frequência
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition">
            Exportar PDF
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <input
            type="date"
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="date"
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none"
          />

          <select className="border border-slate-300 rounded-xl px-4 py-3 outline-none">
            <option>Todas as turmas</option>
            <option>Turma A</option>
            <option>Turma B</option>
          </select>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
            Filtrar
          </button>
        </div>

        {/* Cards resumo */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Média Geral</p>
            <h3 className="text-3xl font-bold mt-2">14.2</h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Aprovados</p>
            <h3 className="text-3xl font-bold mt-2">78%</h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Reprovados</p>
            <h3 className="text-3xl font-bold mt-2">22%</h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Frequência Média</p>
            <h3 className="text-3xl font-bold mt-2">91%</h3>
          </div>
        </section>

        {/* Gráficos */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Gráfico principal */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Desempenho por Turma
            </h3>

            <div className="h-80 flex items-center justify-center text-slate-400">
              Aqui entra teu gráfico (Recharts)
            </div>
          </div>

          {/* Gráfico lateral */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Presença vs Ausência
            </h3>

            <div className="h-80 flex items-center justify-center text-slate-400">
              Gráfico circular
            </div>
          </div>
        </section>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-3 px-4">Turma</th>
                  <th className="py-3 px-4">Média</th>
                  <th className="py-3 px-4">Aprovados</th>
                  <th className="py-3 px-4">Reprovados</th>
                  <th className="py-3 px-4">Frequência</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Turma A</td>
                  <td className="py-4 px-4">15</td>
                  <td className="py-4 px-4 text-green-600">80%</td>
                  <td className="py-4 px-4 text-red-500">20%</td>
                  <td className="py-4 px-4">92%</td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Turma B</td>
                  <td className="py-4 px-4">13</td>
                  <td className="py-4 px-4 text-green-600">75%</td>
                  <td className="py-4 px-4 text-red-500">25%</td>
                  <td className="py-4 px-4">89%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reports;