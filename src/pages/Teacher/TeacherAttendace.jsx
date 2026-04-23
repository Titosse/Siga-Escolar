import { useState } from "react";
import { Users, CheckCircle2, XCircle, Clock3 } from "lucide-react";

function TeacherAttendance() {
  const [students, setStudents] = useState([
    { id: 1, nome: "Ana Maria", estado: "Presente" },
    { id: 2, nome: "Carlos Alberto", estado: "Falta" },
    { id: 3, nome: "Fernanda João", estado: "Atrasado" },
    { id: 4, nome: "Mateus Simango", estado: "Presente" },
    { id: 5, nome: "Joana Ernesto", estado: "Presente" },
  ]);

  function handleAttendanceChange(id, novoEstado) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, estado: novoEstado } : student
      )
    );
  }

  const totalStudents = students.length;
  const presentes = students.filter(
    (student) => student.estado === "Presente"
  ).length;
  const faltas = students.filter(
    (student) => student.estado === "Falta"
  ).length;
  const atrasados = students.filter(
    (student) => student.estado === "Atrasado"
  ).length;

  const stats = [
    {
      title: "Total de Estudantes",
      value: totalStudents,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Presentes",
      value: presentes,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Faltas",
      value: faltas,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Atrasados",
      value: atrasados,
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Controlo de Presença
            </h1>
            <p className="text-slate-500 mt-1">
              Registo diário de presença dos estudantes
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition whitespace-nowrap">
            Guardar Presença
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Turma</option>
            <option>8ª Classe A</option>
            <option>8ª Classe B</option>
            <option>9ª Classe A</option>
          </select>

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Disciplina</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências Naturais</option>
          </select>

          <input
            type="date"
            className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56"
          />

          <input
            type="text"
            placeholder="Pesquisar estudante..."
            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 min-w-0"
          />
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
              Lista de Presença
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      ID
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Nome
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Estado
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Acção
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="py-4 px-4 text-slate-700">
                        {student.id}
                      </td>

                      <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                        {student.nome}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.estado === "Presente"
                              ? "bg-green-100 text-green-700"
                              : student.estado === "Falta"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {student.estado}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleAttendanceChange(student.id, "Presente")
                            }
                            className="px-3 py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
                          >
                            Presente
                          </button>

                          <button
                            onClick={() =>
                              handleAttendanceChange(student.id, "Falta")
                            }
                            className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
                            Falta
                          </button>

                          <button
                            onClick={() =>
                              handleAttendanceChange(student.id, "Atrasado")
                            }
                            className="px-3 py-2 rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            Atrasado
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5 w-[900px]">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo da Aula
            </h3>

            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div className="bg-slate-100 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa de Presença</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  {((presentes / totalStudents) * 100).toFixed(0)}%
                </h4>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa de Faltas</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  {((faltas / totalStudents) * 100).toFixed(0)}%
                </h4>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa de Atraso</p>
                <h4 className="text-xl font-bold text-yellow-600 mt-2">
                  {((atrasados / totalStudents) * 100).toFixed(0)}%
                </h4>
              </div>

              <div className="bg-slate-100 rounded-2xl h-22 p-4">
                <p className="text-sm text-slate-500">Observação</p>
                <h4 className="text-base font-semibold text-slate-800 mt-2">
                  Aula com boa presença geral
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherAttendance;