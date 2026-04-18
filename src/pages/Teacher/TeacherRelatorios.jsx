import {
  FileBarChart2,
  Users,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function TeacherReports() {
  const performanceData = [
    { nome: "8ª A", media: 14 },
    { nome: "8ª B", media: 12 },
    { nome: "9ª A", media: 16 },
    { nome: "9ª B", media: 11 },
  ];

  const attendanceData = [
    { name: "Presentes", value: 78 },
    { name: "Faltas", value: 15 },
    { name: "Atrasados", value: 7 },
  ];

  const tableData = [
    {
      turma: "8ª A",
      media: 14,
      aprovados: "80%",
      reprovados: "20%",
      presenca: "92%",
    },
    {
      turma: "8ª B",
      media: 12,
      aprovados: "71%",
      reprovados: "29%",
      presenca: "88%",
    },
    {
      turma: "9ª A",
      media: 16,
      aprovados: "90%",
      reprovados: "10%",
      presenca: "95%",
    },
    {
      turma: "9ª B",
      media: 11,
      aprovados: "65%",
      reprovados: "35%",
      presenca: "84%",
    },
  ];

  const stats = [
    {
      title: "Turmas Analisadas",
      value: "4",
      icon: FileBarChart2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Média Geral",
      value: "13.3",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Aprovação Média",
      value: "76%",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Presença Média",
      value: "90%",
      icon: ClipboardCheck,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const pieColors = ["#10B981", "#EF4444", "#F59E0B"];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Relatórios do Professor
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhamento do desempenho, presença e aproveitamento das turmas
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition whitespace-nowrap">
            Exportar Relatório
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Turma</option>
            <option>8ª Classe A</option>
            <option>8ª Classe B</option>
            <option>9ª Classe A</option>
          </select>

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Disciplina</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências Naturais</option>
          </select>

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Período</option>
            <option>1º Trimestre</option>
            <option>2º Trimestre</option>
            <option>3º Trimestre</option>
          </select>

          <input
            type="date"
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          />
        </div>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-sm flex items-start justify-between"
              >
                <div>
                  <p className="text-slate-500 text-sm">{item.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-3">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.iconBg}`}
                >
                  <Icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
              </div>
            );
          })}
        </section>

        {/* Gráficos */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Desempenho por Turma
              </h3>
              <span className="text-sm text-slate-500">
                Média de 0 a 20 valores
              </span>
            </div>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} barSize={45}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nome" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Bar dataKey="media" radius={[10, 10, 0, 0]}>
                    {performanceData.map((entry, index) => {
                      let color = "#F59E0B";
                      if (entry.media >= 15) color = "#10B981";
                      else if (entry.media >= 10) color = "#3B82F6";

                      return <Cell key={index} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Presença da Turma
            </h3>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={index} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Tabela */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Resumo por Turma
          </h3>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Turma
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Média
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Aprovados
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Reprovados
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Presença
                  </th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                      {item.turma}
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      {item.media}
                    </td>

                    <td className="py-4 px-4 text-green-600 font-medium">
                      {item.aprovados}
                    </td>

                    <td className="py-4 px-4 text-red-500 font-medium">
                      {item.reprovados}
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      {item.presenca}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel final */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Observações Gerais
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Turma</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  9ª Classe A
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Turma com Mais Faltas</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  9ª Classe B
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Recomendações
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  Reforçar acompanhamento da 9ª Classe B devido à média e presença mais baixas.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  Manter estratégias aplicadas na 9ª Classe A, que apresenta melhor aproveitamento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherReports;