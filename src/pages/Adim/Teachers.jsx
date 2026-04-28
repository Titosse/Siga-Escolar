import { useEffect, useState } from "react";
import { teacher as mockTeachers, subjects } from "../../Data/mockData";
import AdicionarTeacher from "../../components/Admin/Teacher/AdicionarTeacher";
import InfoTeacher from "../../components/Admin/Teacher/InfoTeacher";
import EditarTeacher from "../../components/Admin/Teacher/EditarTeacher";

function Teachers() {
  const [dados, setDados] = useState(() => {
    const savedTeachers = localStorage.getItem("teachers");

    if (savedTeachers) {
      return JSON.parse(savedTeachers);
    }

    return Array.isArray(mockTeachers) ? mockTeachers : [mockTeachers];
  });

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedDisciplina, setSelectedDisciplina] = useState("Todas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  const [openConf, setOpenConf] = useState(false);
  const [teacherToRemove, setTeacherToRemove] = useState(null);

  const [infoTeacher, setInfoTeacher] = useState(null);
  const [infoModal, setInfoModal] = useState(false);

  const [editTeacher, setEditTeacher] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(dados));
  }, [dados]);

  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];
  const disciplinasDisponiveis = [
    "Todas",
    ...new Set(
      subjectsData
        .map((subject) => subject.info?.nome || subject.nome || "Sem nome")
        .filter(Boolean),
    ),
  ];

  function getTeacherDisciplina(teacher) {
    if (teacher.disciplinaIds && teacher.disciplinaIds.length > 0) {
      const nomes = teacher.disciplinaIds
        .map((id) => subjects.find((subject) => subject.id === id)?.info.nome)
        .filter(Boolean);

      return nomes.length > 0 ? nomes.join(", ") : "Sem disciplina";
    }

    return "Sem disciplina";
  }

  function handleRemoveTeacher(id) {
    const updatedTeachers = dados.filter((teacher) => teacher.id !== id);
    setDados(updatedTeachers);
    setOpenConf(false);
    setTeacherToRemove(null);
  }

  const filteredTeachers = dados.filter((teacher) => {
    const nomeMatch = (teacher.nome || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const disciplinaTeacher = getTeacherDisciplina(teacher);
    const estadoTeacher = (teacher.estado || "").toLowerCase();

    const disciplinaMatch =
      selectedDisciplina === "Todas" ||
      disciplinaTeacher
        .toLowerCase()
        .includes(selectedDisciplina.toLowerCase());

    const estadoMatch =
      selectedEstado === "Todos" ||
      estadoTeacher === selectedEstado.toLowerCase();

    return nomeMatch && disciplinaMatch && estadoMatch;
  });

  function encotrarDisciplinaId(disciplinaId) {
    const disc = disciplinaId.map((id) => {
      const disciplina = subjects.find((sub) => sub.id === id);
      return disciplina ? disciplina.info?.nome : "Sem nome";
    });

    return disc.join(", ");
  }

  function saveEditedTeacher(updatedTeacher) {
    const updatedTeachers = dados.map((teacher) =>
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher,
    );
    setDados(updatedTeachers);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Professores
            </h1>
            <p className="text-slate-500">
              Lista e controlo dos professores registados no sistema
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            + Novo Professor
          </button>
        </div>

        {openModal && (
          <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-y-auto p-4">
            <div className="w-full max-w-3xl p-6 relative bg-white rounded-2xl">
              <button
                onClick={() => setOpenModal(false)}
                className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
              >
                X
              </button>

              <AdicionarTeacher
                onAddTeacher={(novoProfessor) => {
                  setDados((prev) => [...prev, novoProfessor]);
                }}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        )}

        {openConf && teacherToRemove && (
          <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-2xl p-6 flex flex-col items-center bg-white rounded-2xl">
              <h1 className="font-semibold text-2xl text-center">
                Tens a certeza que queres remover este professor?
              </h1>

              <p className="text-slate-500 mt-2 text-center">
                {teacherToRemove.nome}
              </p>

              <div className="space-x-4 py-6">
                <button
                  onClick={() => handleRemoveTeacher(teacherToRemove.id)}
                  className="w-40 h-10 rounded-3xl text-white bg-green-400 hover:bg-green-600 transition"
                >
                  Sim
                </button>

                <button
                  onClick={() => {
                    setOpenConf(false);
                    setTeacherToRemove(null);
                  }}
                  className="w-40 h-10 rounded-3xl text-white bg-red-400 hover:bg-red-600 transition"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select
            value={selectedDisciplina}
            onChange={(e) => setSelectedDisciplina(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            {disciplinasDisponiveis.map((disciplina) => (
              <option
                key={disciplina}
                value={disciplina.info?.nome || disciplina.nome || disciplina}
              >
                {disciplina === "Todas" ? "Todas as disciplinas" : disciplina}
              </option>
            ))}
          </select>

          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todos">Todos os estados</option>
            <option value="activo">Activo</option>
            <option value="licença">Licença</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Nome</th>
                <th className="py-3 px-4 text-slate-600">Disciplina</th>
                <th className="py-3 px-4 text-slate-600">Género</th>
                <th className="py-3 px-4 text-slate-600">Contacto</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
                <th className="py-3 px-4 text-slate-600">Acções</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-4 text-slate-700">{teacher.id}</td>

                  <td className="py-4 px-4 font-medium text-slate-800">
                    {teacher.nome}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {encotrarDisciplinaId(teacher.disciplinaIds)}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {teacher.genero || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {teacher.telefone || teacher.contacto || "N/A"}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        teacher.estado === "Activo" ||
                        teacher.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : teacher.estado === "Licença" ||
                              teacher.estado === "licença"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.estado || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setInfoTeacher(teacher);
                          setInfoModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        Ver
                      </button>

                      <button
                        onClick={() => {
                          setEditTeacher(teacher);
                          setEditModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          setTeacherToRemove(teacher);
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

              {filteredTeachers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhum professor encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {infoModal && infoTeacher && (
          <InfoTeacher
            teacher={infoTeacher}
            onClose={() => {
              setInfoModal(false);
              setInfoModal(null);
            }}
          />
        )}

        {editModal && editTeacher && (
          <EditarTeacher
            teacher={editTeacher}
            onClose={() => {
              setEditModal(false);
              setEditTeacher(null);
            }}
            onSave={saveEditedTeacher}
          />
        )}

        <div className="bg-white rounded-2xl shadow-sm p-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">
            A mostrar{" "}
            <span className="font-semibold">{filteredTeachers.length}</span> de{" "}
            <span className="font-semibold">{dados.length}</span> professores
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

export default Teachers;
