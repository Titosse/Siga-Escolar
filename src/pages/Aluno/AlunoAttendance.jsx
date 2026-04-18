import {
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarDays,
} from "lucide-react";

function StudentAttendance() {
  const attendanceSummary = {
    totalAulas: 120,
    presentes: 110,
    faltas: 6,
    atrasos: 4,
  };

  const attendanceBySubject = [
    {
      id: 1,
      disciplina: "Matemática",
      total: 20,
      presentes: 18,
      faltas: 1,
      atrasos: 1,
    },
    {
      id: 2,
      disciplina: "Português",
      total: 18,
      presentes: 17,
      faltas: 1,
      atrasos: 0,
    },
    {
      id: 3,
      disciplina: "Ciências Naturais",
      total: 16,
      presentes: 15,
      faltas: 0,
      atrasos: 1,
    },
    {
      id: 4,
      disciplina: "História",
      total: 14,
      presentes: 13,
      faltas: 1,
      atrasos: 0,
    },
    {
      id: 5,
      disciplina: "Geografia",
      total: 12,
      presentes: 11,
      faltas: 1,
      atrasos: 0,
    },
  ];

  const attendanceHistory = [
    {
      id: 1,
      data: "2026-04-08",
      disciplina: "Matemática",
      estado: "Presente",
    },
    {
      id: 2,
      data: "2026-04-07",
      disciplina: "Português",
      estado: "Atrasado",
    },
    {
      id: 3,
      data: "2026-04-06",
      disciplina: "Ciências Naturais",
      estado: "Presente",
    },
    {
      id: 4,
      data: "2026-04-05",
      disciplina: "História",
      estado: "Falta",
    },
    {
      id: 5,
      data: "2026-04-04",
      disciplina: "Geografia",
      estado: "Presente",
    },
  ];

  const attendanceRate = (
    (attendanceSummary.presentes / attendanceSummary.totalAulas) *
    100
  ).toFixed(0);

  const stats = [
    {
      title: "Total de Aulas",
      value: attendanceSummary.totalAulas,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Presentes",
      value: attendanceSummary.presentes,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Faltas",
      value: attendanceSummary.faltas,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Atrasos",
      value: attendanceSummary.atrasos,
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Minha Presença
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhamento de presenças, faltas e atrasos
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Todas as disciplinas</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências Naturais</option>
            <option>História</option>
            <option>Geografia</option>
          </select>

          <input
            type="month"
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          />

          <input
            type="text"
            placeholder="Pesquisar por disciplina..."
            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 min-w-0"
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

        {/* Conteúdo principal */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Presença por disciplina */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Presença por Disciplina
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Disciplina
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Total
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Presentes
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Faltas
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Atrasos
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Taxa
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceBySubject.map((item) => {
                    const taxa = ((item.presentes / item.total) * 100).toFixed(0);

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                          {item.disciplina}
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          {item.total}
                        </td>

                        <td className="py-4 px-4 text-green-600 font-medium">
                          {item.presentes}
                        </td>

                        <td className="py-4 px-4 text-red-600 font-medium">
                          {item.faltas}
                        </td>

                        <td className="py-4 px-4 text-yellow-600 font-medium">
                          {item.atrasos}
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            {taxa}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumo lateral */}
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo de Presença
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa Geral</p>
                <h4 className="text-2xl font-bold text-green-600 mt-2">
                  {attendanceRate}%
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Disciplina</p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  Português
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Disciplina com Mais Faltas</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  História
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Observação</p>
                  <h4 className="text-base font-semibold text-slate-800 mt-1">
                    Presença geral boa
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Atenção às faltas em História
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Histórico */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Histórico Recente
          </h3>

          <div className="space-y-4">
            {attendanceHistory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {item.disciplina}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{item.data}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                    item.estado === "Presente"
                      ? "bg-green-100 text-green-700"
                      : item.estado === "Falta"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;