import { useEffect, useState } from "react";
import GestaoDeEstudande from "../../components/Admin/Students/AdicionarStundet";
import InfoStudents from "../../components/Admin/Students/InfoStundet";
import EditarStudent from "../../components/Admin/Students/EditarStundet";
import { students as mockStudents } from "../../Data/mockData";

function Students() {
  const [dados, setDados] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : mockStudents;
  });

  const [openModal, setOpenModal] = useState(false);

  const [infoStudent, setInfoStudent] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  
  const [editarModal, setEditarModal] = useState(false);
  const [editarStudent, setEditarStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedClasse, setSelectedClasse] = useState("Todas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  const [openConf, setOpenConf] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(dados));
  }, [dados]);

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "N/A";

    const nascimento = new Date(dataNascimento);

    if (Number.isNaN(nascimento.getTime())) return "N/A";

    return Math.floor(
      (new Date() - nascimento) / (1000 * 60 * 60 * 24 * 365.25),
    );
  }

  function handleRemoveStudent(id) {
    const updatedStudents = dados.filter((student) => student.id !== id);
    setDados(updatedStudents);
    setOpenConf(false);
    setStudentToRemove(null);
  }

  function handleSaveEditedStudent(updatedStudent) {
    const updatedStudents = dados.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student,
    );

    setDados(updatedStudents);
    setEditarModal(false);
    setEditarStudent(null);
  }

  const filteredStudents = dados.filter((student) => {
    const nomeMatch = (student.nome || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const classeStudent = student.classe || student.turmaId || "";
    const estadoStudent = (student.estado || "").toLowerCase();

    const classeMatch =
      selectedClasse === "Todas" || classeStudent === selectedClasse;

    const estadoMatch =
      selectedEstado === "Todos" ||
      estadoStudent === selectedEstado.toLowerCase();

    return nomeMatch && classeMatch && estadoMatch;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Estudantes
            </h1>
            <p className="text-slate-500">
              Lista, pesquisa e controlo de estudantes registados no sistema
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            + Novo Estudante
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

              <GestaoDeEstudande
                onAddStudent={(novoEstudante) => {
                  setDados((prev) => [...prev, novoEstudante]);
                }}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        )}

        {openConf && studentToRemove && (
          <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-2xl p-6 flex flex-col items-center bg-white rounded-2xl">
              <h1 className="font-semibold text-2xl text-center">
                Tens a certeza que queres remover este estudante?
              </h1>

              <p className="text-slate-500 mt-2 text-center">
                {studentToRemove.nome}
              </p>

              <div className="space-x-4 py-6">
                <button
                  onClick={() => handleRemoveStudent(studentToRemove.id)}
                  className="w-40 h-10 rounded-3xl text-white bg-green-400 hover:bg-green-600 transition"
                >
                  Sim
                </button>

                <button
                  onClick={() => {
                    setOpenConf(false);
                    setStudentToRemove(null);
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
            value={selectedClasse}
            onChange={(e) => setSelectedClasse(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todas">Todos os anos</option>
            <option value="1ª Ano">1ª Ano</option>
            <option value="2ª Ano">2ª Ano</option>
            <option value="3ª Ano">3ª Ano</option>
            <option value="cls_001">cls_001</option>
            <option value="cls_002">cls_002</option>
          </select>

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

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Nome</th>
                <th className="py-3 px-4 text-slate-600">Ano</th>
                <th className="py-3 px-4 text-slate-600">Género</th>
                <th className="py-3 px-4 text-slate-600">Idade</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
                <th className="py-3 px-4 text-slate-600">Acções</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-4 text-slate-700">{student.id}</td>

                  <td className="py-4 px-4 font-medium text-slate-800">
                    {student.nome}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {student.classe || student.turmaId || "Sem turma"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {student.genero || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {calcularIdade(student.dataNascimento)}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.estado === "Activo" ||
                        student.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : student.estado === "pendente" ||
                              student.estado === "Pendente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.estado || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setInfoStudent(student);
                          setInfoModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        Ver
                      </button>

                      <button
                        onClick={() => {
                          setEditarStudent(student);
                          setEditarModal(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          setStudentToRemove(student);
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

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhum estudante encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {infoModal && infoStudent && (
          <InfoStudents
            student={infoStudent}
            onClose={() => {
              setInfoModal(false);
              setInfoStudent(null);
            }}
          />
        )}

        {editarModal && editarStudent && (
          <EditarStudent
            student={editarStudent}
            onClose={() => {
              setEditarModal(false);
              setEditarStudent(null);
            }}
            onSave={handleSaveEditedStudent}
          />
        )}

        <div className="bg-white rounded-2xl shadow-sm p-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">
            A mostrar{" "}
            <span className="font-semibold">{filteredStudents.length}</span> de{" "}
            <span className="font-semibold">{dados.length}</span> estudantes
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

export default Students;
