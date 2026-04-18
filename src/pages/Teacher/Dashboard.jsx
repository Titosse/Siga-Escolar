import {
  Users,
  ClipboardList,
  BookOpenCheck,
  FilePenLine,
  PlusSquare,
  CheckCheck,
} from "lucide-react";

function TeacherDashboard() {
  const stats = [
    {
      title: "Turmas",
      value: "4",
      icon: BookOpenCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Estudantes",
      value: "138",
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Tarefas Activas",
      value: "7",
      icon: ClipboardList,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Notas Pendentes",
      value: "12",
      icon: FilePenLine,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const classes = [
    {
      turma: "8ª Classe A",
      disciplina: "Matemática",
      estudantes: 35,
      proximaAula: "Hoje, 10:30",
    },
    {
      turma: "9ª Classe B",
      disciplina: "Matemática",
      estudantes: 32,
      proximaAula: "Hoje, 13:00",
    },
    {
      turma: "10ª Classe A",
      disciplina: "Matemática",
      estudantes: 36,
      proximaAula: "Amanhã, 08:00",
    },
  ];

  const tasks = [
    {
      titulo: "Ficha de Exercícios - Equações",
      turma: "8ª Classe A",
      prazo: "10 Abr 2026",
      estado: "Activa",
    },
    {
      titulo: "Trabalho sobre Frações",
      turma: "9ª Classe B",
      prazo: "12 Abr 2026",
      estado: "Activa",
    },
    {
      titulo: "Avaliação Mensal",
      turma: "10ª Classe A",
      prazo: "15 Abr 2026",
      estado: "Pendente",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className=" p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard do Professor
            </h1>
            <p className="text-slate-800 mt-1">
              Gestão de notas, tarefas e acompanhamento das turmas
            </p>
          </div>
        </div>

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

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Minhas Turmas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600">Turma</th>
                    <th className="py-3 px-4 text-slate-600">Disciplina</th>
                    <th className="py-3 px-4 text-slate-600">Estudantes</th>
                    <th className="py-3 px-4 text-slate-600">Próxima Aula</th>
                    <th className="py-3 px-4 text-slate-600">Acção</th>
                  </tr>
                </thead>

                <tbody>
                  {classes.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="py-4 px-4 font-medium text-slate-800">
                        {item.turma}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {item.disciplina}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {item.estudantes}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {item.proximaAula}
                      </td>
                      <td className="py-4 px-4">
                        <button className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Tarefas Recentes
            </h3>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {task.titulo}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {task.turma}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Prazo: {task.prazo}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.estado === "Activa"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel de notas */}
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Pendências de Notas
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800">
                  8ª Classe A - Matemática
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  5 estudantes sem nota lançada
                </p>
                <button className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                  Lançar Agora
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800">
                  9ª Classe B - Matemática
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  3 estudantes com avaliação pendente
                </p>
                <button className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                  Ver Notas
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800">
                  10ª Classe A - Matemática
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Todas as notas lançadas
                </p>
                <button className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
                  Ver Relatório
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
