import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

function StudentTasks() {
  const tasks = [
    {
      id: 1,
      titulo: "Ficha de Exercícios sobre Equações",
      disciplina: "Matemática",
      prazo: "12 Abr 2026",
      estado: "Pendente",
      prioridade: "Alta",
    },
    {
      id: 2,
      titulo: "Resumo sobre o Sistema Digestivo",
      disciplina: "Ciências Naturais",
      prazo: "14 Abr 2026",
      estado: "Em Progresso",
      prioridade: "Média",
    },
    {
      id: 3,
      titulo: "Leitura e interpretação do texto",
      disciplina: "Português",
      prazo: "16 Abr 2026",
      estado: "Concluída",
      prioridade: "Baixa",
    },
    {
      id: 4,
      titulo: "Mapa sobre as províncias de Moçambique",
      disciplina: "Geografia",
      prazo: "18 Abr 2026",
      estado: "Pendente",
      prioridade: "Alta",
    },
    {
      id: 5,
      titulo: "Questionário sobre a independência",
      disciplina: "História",
      prazo: "20 Abr 2026",
      estado: "Em Progresso",
      prioridade: "Média",
    },
  ];

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.estado === "Pendente").length;
  const inProgressTasks = tasks.filter(
    (task) => task.estado === "Em Progresso"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.estado === "Concluída"
  ).length;

  const stats = [
    {
      title: "Total de Tarefas",
      value: totalTasks,
      icon: ClipboardList,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pendentes",
      value: pendingTasks,
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Em Progresso",
      value: inProgressTasks,
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Concluídas",
      value: completedTasks,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Minhas Tarefas
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhamento das actividades e trabalhos por disciplina
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <input
            type="text"
            placeholder="Pesquisar tarefa..."
            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 min-w-0"
          />

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Todas as disciplinas</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências Naturais</option>
            <option>História</option>
            <option>Geografia</option>
          </select>

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Todos os estados</option>
            <option>Pendente</option>
            <option>Em Progresso</option>
            <option>Concluída</option>
          </select>
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
          {/* Lista de tarefas */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Lista de Tarefas
            </h3>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>

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
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.estado === "Pendente"
                            ? "bg-red-100 text-red-700"
                            : task.estado === "Em Progresso"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.estado}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.prioridade === "Alta"
                            ? "bg-red-100 text-red-700"
                            : task.prioridade === "Média"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {task.prioridade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo lateral */}
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo das Tarefas
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Tarefa mais urgente</p>
                <h4 className="text-base font-bold text-red-600 mt-2">
                  Ficha de Exercícios sobre Equações
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Próximo prazo</p>
                <h4 className="text-base font-bold text-slate-800 mt-2">
                  12 Abr 2026
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Disciplina com mais tarefas</p>
                <h4 className="text-base font-bold text-slate-800 mt-2">
                  Matemática
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Estado geral</p>
                <h4 className="text-base font-bold text-blue-600 mt-2">
                  Organização moderada
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentTasks;