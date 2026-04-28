import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Clock,
  Plus,
  Search,
} from "lucide-react";
import {
  subjects as mockSubjects
} from "../../Data/mockData";

function AdminSubjectsDashboard() {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : mockSubjects;
  });

  const teachers = JSON.parse(localStorage.getItem("teachers")) || teachers;
  const classes = JSON.parse(localStorage.getItem("classes")) || classes;


  const [search, setSearch] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  function getTeachersNames(subject) {
    const subjectTeachers = teachers.filter((teacher) =>
      subject.teacherIds?.includes(teacher.id),
    );

    if (subjectTeachers.length === 0) return "Sem professor";

    return subjectTeachers.map((teacher) => teacher.nome).join(", ");
  }

  function getClassesNames(subject) {
    const subjectClasses = classes.filter((classe) =>
      subject.turmaIds?.includes(classe.id),
    );

    if (subjectClasses.length === 0) return "Sem turma";

    return subjectClasses.map((classe) => classe.nome).join(", ");
  }

  const filteredSubjects = subjects.filter((subject) => {
    const nomeMatch = (subject.nome || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const estadoMatch =
      selectedEstado === "Todos" ||
      (subject.estado || "").toLowerCase() === selectedEstado.toLowerCase();

    return nomeMatch && estadoMatch;
  });

  const totalSubjects = subjects.length;
  const activeSubjects = subjects.filter(
    (subject) => subject.estado === "activa" || subject.estado === "Activa",
  ).length;
  const inactiveSubjects = subjects.filter(
    (subject) => subject.estado === "inactiva" || subject.estado === "Inactiva",
  ).length;

  const totalCargaHoraria = subjects.reduce(
    (total, subject) => total + (Number(subject.cargaHoraria) || 0),
    0,
  );

  function handleRemoveSubject(id) {
    const confirmar = window.confirm(
      "Tens a certeza que queres remover esta disciplina?",
    );

    if (!confirmar) return;

    const updatedSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(updatedSubjects);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Disciplinas
            </h1>
            <p className="text-slate-500">
              Controlo das disciplinas, professores, turmas e carga horária
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Disciplina
          </button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total de Disciplinas</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-3">
                {totalSubjects}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm">Activas</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-3">
                {activeSubjects}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm">Inactivas</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-3">
                {inactiveSubjects}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <Users className="w-7 h-7 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm">Carga Horária Total</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-3">
                {totalCargaHoraria}h
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Clock className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </section>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar disciplina..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todos">Todos os estados</option>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Disciplina</th>
                <th className="py-3 px-4 text-slate-600">Código</th>
                <th className="py-3 px-4 text-slate-600">Professores</th>
                <th className="py-3 px-4 text-slate-600">Turmas</th>
                <th className="py-3 px-4 text-slate-600">Carga</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
                <th className="py-3 px-4 text-slate-600">Acções</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-4 text-slate-700">{subject.id}</td>

                  <td className="py-4 px-4 font-medium text-slate-800">
                    {subject.nome}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {subject.codigo || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {getTeachersNames(subject)}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {getClassesNames(subject)}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {subject.cargaHoraria || 0}h
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.estado === "activa" ||
                        subject.estado === "Activa"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subject.estado || "N/A"}
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

                      <button
                        onClick={() => handleRemoveSubject(subject.id)}
                        className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredSubjects.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhuma disciplina encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">
            A mostrar{" "}
            <span className="font-semibold">{filteredSubjects.length}</span> de{" "}
            <span className="font-semibold">{subjects.length}</span> disciplinas
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              Anterior
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white">
              1
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

export default AdminSubjectsDashboard;
