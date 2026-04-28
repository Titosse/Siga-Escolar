import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import AdicionarTarefa from "../../components/Teacher/Task/AdicionarTask";
import VerTarefa from "../../components/Teacher/Task/InfoTasks";
import EditarTarefa from "../../components/Teacher/Task/EditarTasks";

function TeacherTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [openModal, setOpenModal] = useState(false);

  const [openConf, setOpenConf] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("Todas as turmas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [selectedDisciplina, setSelectedDisciplina] = useState(
    "Todas as disciplinas",
  );

  function handleRemoveTasks(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setOpenConf(false);
    setTaskToRemove(null);
  }

  const filteredTasks = tasks.filter((task) => {
    const stutMacth = (task.estado || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const turmaMatch =
      selectedTurma === "Todas as turmas" || task.turma === selectedTurma;

    const estadoMatch =
      selectedEstado === "Todos" || task.estado === selectedEstado;

    const disciplinaMatch =
      selectedDisciplina === "Todas as disciplinas" ||
      task.disciplina === selectedDisciplina;

    return stutMacth && turmaMatch && estadoMatch && disciplinaMatch;
  });

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => task.estado === "Activa").length;
  const pendingTasks = tasks.filter(
    (task) => task.estado === "Pendente",
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.estado === "Concluída",
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
      title: "Tarefas Activas",
      value: activeTasks,
      icon: Clock3,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pendentes",
      value: pendingTasks,
      icon: AlertCircle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Concluídas",
      value: completedTasks,
      icon: CheckCircle2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Tarefas
            </h1>
            <p className="text-slate-500 mt-1">
              Criação, organização e acompanhamento das tarefas das turmas
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition whitespace-nowrap flex items-center gap-2"
          >
            <PlusSquare className="w-5 h-5" />
            Nova Tarefa
          </button>
        </div>

        {openModal && (
          <div className="w-full h-full fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-y-auto p-4">
            <div className="w-full max-w-3xl p-6 relative bg-white rounded-2xl">
              <AdicionarTarefa
                onClose={() => setOpenModal(false)}
                onAddTask={(novaTarefa) => {
                  setTasks((prev) => [...prev, novaTarefa]);
                }}
              />
            </div>
          </div>
        )}

        {openConf && taskToRemove && (
          <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-2xl p-6 flex flex-col items-center bg-white rounded-2xl">
              <h1 className="font-semibold text-2xl text-center">
                Tens a certeza que queres remover esta tarefa?
              </h1>

              <p className="text-slate-500 mt-2 text-center">
                {taskToRemove.titulo} - {taskToRemove.turma} -{" "}
                {taskToRemove.disciplina}
              </p>

              <div className="space-x-4 py-6">
                <button
                  onClick={() => handleRemoveTasks(taskToRemove.id)}
                  className="w-40 h-10 rounded-3xl text-white bg-green-400 hover:bg-green-600 transition"
                >
                  Sim
                </button>

                <button
                  onClick={() => {
                    setOpenConf(false);
                    setTaskToRemove(null);
                  }}
                  className="w-40 h-10 rounded-3xl text-white bg-red-400 hover:bg-red-600 transition"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTask && (
          <VerTarefa
            tarefa={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}

        {editTask && (
          <EditarTarefa
            tarefa={editTask}
            onClose={() => setEditTask(null)}
            onUpdate={(updated) => {
              setTasks((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t)),
              );
            }}
          />
        )}

        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <input
            type="text"
            placeholder="Pesquisar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 min-w-0"
          />

          <select
            value={selectedTurma}
            onChange={(e) => setSelectedTurma(e.target.value)}
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          >
            <option>Todas as turmas</option>
            <option>1ª Ano A</option>
            <option>2ª Ano B</option>
            <option>3ª Ano A</option>
          </select>

          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          >
            <option value="Todos">Todos os estados</option>
            <option value="Activa">Activa</option>
            <option value="Pendente">Pendente</option>
            <option value="Encerrada">Encerrada</option>
          </select>

          <select
            value={selectedDisciplina}
            onChange={(e) => setSelectedDisciplina(e.target.value)}
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          >
            <option>Todas as disciplinas</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências Naturais</option>
          </select>
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Lista de Tarefas
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      ID
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Título
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Turma
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Disciplina
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Prazo
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Estado
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Acções
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="py-4 px-4 text-slate-700">{task.id}</td>

                      <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                        {task.titulo}
                      </td>

                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                        {task.turma}
                      </td>

                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                        {task.disciplina}
                      </td>

                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                        {task.prazo}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.estado === "Activa"
                              ? "bg-green-100 text-green-700"
                              : task.estado === "Pendente"
                                ? "bg-yellow-100 text-yellow-700"
                                : task.estado === "Encerrada"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {task.estado}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex gap-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="px-3 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => setEditTask(task)}
                            className="px-3 py-2 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => {
                              setTaskToRemove(task);
                              setOpenConf(true);
                            }}
                            className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
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

          <div className="bg-white rounded-3xl shadow-sm p-5 w-[950px]">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Próximos Prazos
            </h3>

            <div className="space-y-4 flex flex-auto gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                >
                  <h4 className="font-semibold text-slate-800">
                    {task.titulo}
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    {task.turma} • {task.disciplina}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    Prazo: {task.prazo}
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                      task.estado === "Activa"
                        ? "bg-green-100 text-green-700"
                        : task.estado === "Pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.estado === "Encerrada"
                            ? "bg-red-100 text-red-700"
                            : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {task.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherTasks;
