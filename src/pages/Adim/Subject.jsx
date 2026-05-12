import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Clock,
  Plus,
  Search,
} from "lucide-react";

import { subjects as mockSubjects } from "../../Data/mockData";
import AddDisciplina from "../../components/Admin/Subjects/AddSubjects";
import EditSubjects from "../../components/Admin/Subjects/EditSubjects";
import InfoSubject from "../../components/Admin/Subjects/InfoSubject";

function AdminSubjectsDashboard() {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSubjects) {
      return JSON.parse(savedSubjects);
    }

    return Array.isArray(mockSubjects) ? mockSubjects : [];
  });

  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  const classes = JSON.parse(localStorage.getItem("classes")) || [];

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  const [openConf, setOpenConf] = useState(false);
  const [subjectToRemove, setSubjectToRemove] = useState(null);

  const [editarSubject, setEditarSubject] = useState(null);
  const [editarModal, setEditarModal] = useState(false);

  const [infoSubject, setInfoSubject] = useState(null);
  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  function handleRemoveSubject(id) {
    const updatedSubjects = subjects.filter((subject) => subject.id !== id);

    setSubjects(updatedSubjects);
    setOpenConf(false);
    setSubjectToRemove(null);
  }

  function teacherResponsavel(subject) {
    const professoresIds = subject.relacoes?.professores || [];

    const nomes = teachers
      .filter((teacher) => professoresIds.includes(teacher.id))
      .map((teacher) => teacher.nome);

    if (nomes.length === 0) return "Sem professor";

    return nomes.join(", ");
  }

  function turmasDaDisciplina(subject) {
    const turmaIds = subject.relacoes?.turmas || [];

    const nomes = classes
      .filter((classe) => turmaIds.includes(classe.id))
      .map((classe) => classe.nome || classe.info?.classe || classe.info?.nome);

    if (nomes.length === 0) return "Sem turma";

    return nomes.join(", ");
  }

  const filteredSubjects = subjects.filter((subject) => {
    const nomeDisciplina = subject.info?.nome || "";

    const nomeMatch = nomeDisciplina
      .toLowerCase()
      .includes(search.toLowerCase());

    const estadoSubject = subject.meta?.estado || "";

    const estadoMatch =
      selectedEstado === "Todos" ||
      estadoSubject.toLowerCase() === selectedEstado.toLowerCase();

    return nomeMatch && estadoMatch;
  });

  function handleUpdateSubject(updatedSubject) {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === updatedSubject.id ? updatedSubject : subject,
    );

    setSubjects(updatedSubjects);
    setEditarModal(false);
    setEditarSubject(null);
  }

  const totalSubjects = subjects.length;

  const activeSubjects = subjects.filter(
    (subject) => subject.meta?.estado === "activo",
  ).length;

  const inactiveSubjects = subjects.filter(
    (subject) => subject.meta?.estado === "inactivo",
  ).length;

  const totalCargaHoraria = subjects.reduce(
    (total, subject) => total + (Number(subject.info?.cargaHoraria) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Disciplinas
            </h1>
            <p className="text-slate-500">
              Controlo das disciplinas, professores, turmas e carga horária
            </p>
          </div>

          <button
            className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
            onClick={() => setOpenModal(true)}
          >
            <Plus className="w-5 h-5" />
            Nova Disciplina
          </button>
        </div>

        {openModal && (
          <div className="w-full h-full fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-y-auto p-4">
            <AddDisciplina
              onAddSubject={(novaDisciplina) => {
                setSubjects((prev) => [...prev, novaDisciplina]);
              }}
              onClose={() => setOpenModal(false)}
            />
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <ResumoCard
            titulo="Total de Disciplinas"
            valor={totalSubjects}
            icon={<BookOpen className="w-7 h-7 text-blue-600" />}
            bg="bg-blue-100"
          />

          <ResumoCard
            titulo="Activas"
            valor={activeSubjects}
            icon={<GraduationCap className="w-7 h-7 text-green-600" />}
            bg="bg-green-100"
          />

          <ResumoCard
            titulo="Inactivas"
            valor={inactiveSubjects}
            icon={<Users className="w-7 h-7 text-red-600" />}
            bg="bg-red-100"
          />

          <ResumoCard
            titulo="Carga Horária Total"
            valor={`${totalCargaHoraria}h`}
            icon={<Clock className="w-7 h-7 text-purple-600" />}
            bg="bg-purple-100"
          />
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
            <option value="activo">Activo</option>
            <option value="pendente">Pendente</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Disciplina</th>
                <th className="py-3 px-4 text-slate-600">Código</th>
                <th className="py-3 px-4 text-slate-600">Professor</th>
                <th className="py-3 px-4 text-slate-600">Classe</th>
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
                    {subject.info?.nome || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {subject.info?.codigo || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {teacherResponsavel(subject)}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {subject.info?.classe || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {subject.info?.cargaHoraria || 0}h
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.meta?.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : subject.meta?.estado === "pendente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subject.meta?.estado || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setInfoSubject(subject);
                          setInfoModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        Ver
                      </button>

                      <button
                        onClick={() => {
                          setEditarSubject(subject);
                          setEditarModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          setSubjectToRemove(subject);
                          setOpenConf(true);
                        }}
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
                    colSpan="9"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhuma disciplina encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {openConf && subjectToRemove && (
          <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-2xl p-6 flex flex-col items-center bg-white rounded-2xl">
              <h1 className="font-semibold text-2xl text-center">
                Tens a certeza que queres remover esta disciplina?
              </h1>

              <p className="text-slate-500 mt-2 text-center">
                {subjectToRemove.info?.nome}
              </p>

              <div className="space-x-4 py-6">
                <button
                  onClick={() => handleRemoveSubject(subjectToRemove.id)}
                  className="w-40 h-10 rounded-3xl text-white bg-green-400 hover:bg-green-600 transition"
                >
                  Sim
                </button>

                <button
                  onClick={() => {
                    setOpenConf(false);
                    setSubjectToRemove(null);
                  }}
                  className="w-40 h-10 rounded-3xl text-white bg-red-400 hover:bg-red-600 transition"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}

        {editarModal && editarSubject && (
          <EditSubjects
            subject={editarSubject}
            onClose={() => {
              setEditarModal(false);
              setEditarSubject(null);
            }}
            onSave={handleUpdateSubject}
          />
        )}

        {infoModal && infoSubject && (
          <InfoSubject
            subject={infoSubject}
            onClose={() => {
              setInfoModal(false);
              setInfoSubject(null);
            }}
          />
        )}

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

function ResumoCard({ titulo, valor, icon, bg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
      <div>
        <p className="text-slate-500 text-sm">{titulo}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-3">{valor}</h3>
      </div>

      <div
        className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  );
}

export default AdminSubjectsDashboard;
