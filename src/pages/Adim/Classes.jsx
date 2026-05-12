import { useEffect, useState } from "react";
import AdicionarClasses from "../../components/Admin/classes/AdicionarClasses";
import InfoClasses from "../../components/Admin/classes/InfoClasses";
import EditarClasses from "../../components/Admin/classes/EditarClasses";
import { classes as mockClasses } from "../../Data/mockData";

function Classes() {
  const [dados, setDados] = useState(() => {
    const savedClasses = localStorage.getItem("classes");
    return savedClasses ? JSON.parse(savedClasses) : mockClasses;
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(dados));
  }, [dados]); 

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const studentsData = JSON.parse(localStorage.getItem("students")) || [];
  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];

  const [openModal, setOpenModal] = useState(false);

  const [openConf, setOpenConf] = useState(false);
  const [classeRemove, setClasseRemove] = useState(null);

  const [selectedClasse, setSelectedClasse] = useState("Todos");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [selectedTurno, setSelectedTurno] = useState("Todos");
  const [search, setSearch] = useState("");

  const [editarClasse, setEditarClasse] = useState(null);
  const [editarModal, setEditarModal] = useState(false);

  const [infoClasse, setInfoClasse] = useState(null);
  const [infoModal, setInfoModal] = useState(false);

  const filteredClasses = dados.filter((classe) => {
    const nomeMatch = (classe.nome || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const classeValue = classe.info?.classe || "";
    const turnoValue = classe.info?.turno || "";
    const estadoValue = (classe.meta?.estado || "").toLowerCase();

    const classeMatch =
      selectedClasse === "Todos" || classeValue === selectedClasse;

    const turnoMatch =
      selectedTurno === "Todos" || turnoValue.trim() === selectedTurno;

    const estadoMatch =
      selectedEstado === "Todos" ||
      estadoValue === selectedEstado.toLowerCase();

    return nomeMatch && classeMatch && turnoMatch && estadoMatch;
  });

  function handleRemoveClass(id) {
    const updatedClasses = dados.filter((classe) => classe.id !== id);
    setDados(updatedClasses);
    setOpenConf(false);
    setClasseRemove(null);
  }

  function handleUpdateClass(updatedClass) {
    const updatedClasses = dados.map((classe) =>
      classe.id === updatedClass.id ? updatedClass : classe,
    );
    setDados(updatedClasses);
    setEditarModal(false);
    setEditarClasse(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Turmas
            </h1>
            <p className="text-slate-500">
              Lista e controlo das turmas registadas no sistema
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            + Nova Turma
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

              <AdicionarClasses
                onAddClass={(novaTurma) => {
                  setDados((prev) => [...prev, novaTurma]);
                }}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Pesquisar por nome da turma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select
            value={selectedClasse}
            onChange={(e) => setSelectedClasse(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todos">Todos os anos</option>
            <option value="1ª Ano">1ª Ano</option>
            <option value="2ª Ano">2ª Ano</option>
            <option value="3ª Ano">3ª Ano</option>
          </select>

          <select
            value={selectedTurno}
            onChange={(e) => setSelectedTurno(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todos">Todos os turnos</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>

          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="Todos">Todos os estados</option>
            <option value="Activa">Activa</option>
            <option value="Encerrada">Encerrada</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Turma</th>
                <th className="py-3 px-4 text-slate-600">Ano</th>
                <th className="py-3 px-4 text-slate-600">Turno</th>
                <th className="py-3 px-4 text-slate-600">Sala</th>
                <th className="py-3 px-4 text-slate-600">Director</th>
                <th className="py-3 px-4 text-slate-600">Estudantes</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
                <th className="py-3 px-4 text-slate-600">Acções</th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.map((item) => {
                const professsoresDaturma = teachersData.find(
                  (teacher) => teacher.id === item.responsavel,
                );

                const alunosDaturma = studentsData.filter(
                  (aluno) => aluno.turmaId === item.id,
                );

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 text-slate-700">{item.id}</td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {item.nome}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {item.info?.classe || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {item.info?.turno || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {item.info?.sala || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {professsoresDaturma.nome}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {alunosDaturma.length > 0 ? alunosDaturma.length : "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.meta?.estado === "Activa" ||
                          item.meta?.estado === "activa"
                            ? "bg-green-100 text-green-700"
                            : item.meta?.estado === "Pendente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.meta?.estado || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setInfoClasse(item);
                            setInfoModal(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => {
                            setEditarClasse(item);
                            setEditarModal(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setClasseRemove(item);
                            setOpenConf(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredClasses.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhuma turma encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {openConf && classeRemove && (
            <div className="w-full fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
              <div className="w-full max-w-2xl p-6 flex flex-col items-center bg-white rounded-2xl">
                <h1 className="font-semibold text-2xl text-center">
                  Tens a certeza que queres remover esta turma?
                </h1>

                <p className="text-slate-500 mt-2 text-center">
                  {classeRemove.nome}
                </p>

                <div className="space-x-4 py-6">
                  <button
                    onClick={() => handleRemoveClass(classeRemove.id)}
                    className="w-40 h-10 rounded-3xl text-white bg-green-400 hover:bg-green-600 transition"
                  >
                    Sim
                  </button>

                  <button
                    onClick={() => {
                      setOpenConf(false);
                      setClasseRemove(null);
                    }}
                    className="w-40 h-10 rounded-3xl text-white bg-red-400 hover:bg-red-600 transition"
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {editarModal && editarClasse && (
          <EditarClasses
            classe={editarClasse}
            onClose={() => {
              setEditarModal(false);
              setEditarClasse(null);
            }}
            onSave={handleUpdateClass}
          />
        )}

        {infoModal && infoClasse && (
          <InfoClasses
            classe={infoClasse}
            onClose={() => {
              setInfoModal(false);
              setInfoClasse(null);
            }}
          />
        )}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">
            A mostrar <span className="font-semibold">1-4</span> de{" "}
            <span className="font-semibold">4</span> turmas
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

export default Classes;
