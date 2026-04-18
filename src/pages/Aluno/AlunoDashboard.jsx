import {
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Bell,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

function StudentDashboard() {
  const stats = [
    {
      title: "Disciplinas",
      value: "8",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Tarefas Pendentes",
      value: "5",
      icon: ClipboardList,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Presença",
      value: "92%",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Média Geral",
      value: "14.3",
      icon: GraduationCap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const tasks = [
    {
      titulo: "Ficha de Exercícios de Matemática",
      disciplina: "Matemática",
      prazo: "12 Abr 2026",
      estado: "Pendente",
    },
    {
      titulo: "Resumo de Ciências Naturais",
      disciplina: "Ciências Naturais",
      prazo: "14 Abr 2026",
      estado: "Em Progresso",
    },
    {
      titulo: "Leitura e interpretação",
      disciplina: "Português",
      prazo: "16 Abr 2026",
      estado: "Pendente",
    },
  ];

  const subjects = [
    { nome: "Matemática", nota: 15, cor: "bg-blue-500" },
    { nome: "Português", nota: 13, cor: "bg-green-500" },
    { nome: "Ciências Naturais", nota: 14, cor: "bg-purple-500" },
    { nome: "História", nota: 16, cor: "bg-orange-500" },
  ];

  const notices = [
    "Teste de Matemática marcado para sexta-feira",
    "Entrega de trabalho de Português até 16 Abr 2026",
    "Reunião de turma na próxima semana",
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className=" p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard do Aluno
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhamento das notas, tarefas e frequência
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

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Minhas Tarefas
            </h3>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {task.titulo}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {task.disciplina}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Prazo: {task.prazo}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                        task.estado === "Pendente"
                          ? "bg-red-100 text-red-700"
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

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Avisos
            </h3>

            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>

                  <p className="text-slate-700 text-sm">{notice}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Desempenho por Disciplina
            </h3>

            <div className="space-y-5">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700 font-medium">
                      {subject.nome}
                    </span>
                    <span className="text-slate-800 font-bold">
                      {subject.nota}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`${subject.cor} h-full rounded-full`}
                      style={{ width: `${(subject.nota / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo Académico
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Disciplina</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  História
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Disciplina a Melhorar</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  Português
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Próxima Aula</p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  Matemática
                </h4>
                <p className="text-sm text-slate-500 mt-1">Hoje, 10:30</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Próximo prazo</p>
                  <h4 className="text-base font-semibold text-slate-800 mt-1">
                    Exercícios de Matemática
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">12 Abr 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentDashboard;