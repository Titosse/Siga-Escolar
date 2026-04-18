import { useMemo, useState } from "react";
import { Users, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Grades() {
  const [students, setStudents] = useState([
    {
      id: 1,
      nome: "Ana Maria",
      teste1: 14,
      teste2: 15,
      trabalho: 16,
      exame: 13,
    },
    {
      id: 2,
      nome: "Carlos Alberto",
      teste1: 10,
      teste2: 9,
      trabalho: 12,
      exame: 11,
    },
    {
      id: 3,
      nome: "Fernanda João",
      teste1: 16,
      teste2: 14,
      trabalho: 15,
      exame: 15,
    },
    {
      id: 4,
      nome: "Mateus Simango",
      teste1: 8,
      teste2: 11,
      trabalho: 10,
      exame: 9,
    },
    {
      id: 5,
      nome: "Joana Ernesto",
      teste1: 17,
      teste2: 16,
      trabalho: 18,
      exame: 17,
    },
  ]);

  function handleChange(id, field, value) {
    const numericValue = Number(value);

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              [field]:
                numericValue > 20 ? 20 : numericValue < 0 ? 0 : numericValue,
            }
          : student,
      ),
    );
  }

  function calcularMedia(student) {
    const media =
      (student.teste1 + student.teste2 + student.trabalho + student.exame) / 4;

    return Number(media.toFixed(1));
  }

  function getEstado(media) {
    return media >= 10 ? "Aprovado" : "Reprovado";
  }

  const totalStudents = students.length;
  const approvedCount = students.filter(
    (student) => calcularMedia(student) >= 10,
  ).length;
  const failedCount = students.filter(
    (student) => calcularMedia(student) < 10,
  ).length;

  const averageClass = (
    students.reduce((acc, student) => acc + calcularMedia(student), 0) /
    students.length
  ).toFixed(1);

  const chartData = useMemo(() => {
    return students.map((student) => ({
      nome: student.nome.split(" ")[0],
      media: calcularMedia(student),
    }));
  }, [students]);

  const stats = [
    {
      title: "Total de Estudantes",
      value: totalStudents,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Aprovados",
      value: approvedCount,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Reprovados",
      value: failedCount,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Média da Turma",
      value: averageClass,
      icon: BookOpen,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Gestão de Notas
            </h1>
            <p className="text-slate-500 mt-1">
              Lançamento, acompanhamento e análise do aproveitamento académico
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition whitespace-nowrap">
            Guardar Notas
          </button>
        </div>

        {/* Filtros */}
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

          <select className="border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 xl:w-56">
            <option>Seleccionar Trimestre</option>
            <option>1º Trimestre</option>
            <option>2º Trimestre</option>
            <option>3º Trimestre</option>
          </select>

          <input
            type="text"
            placeholder="Pesquisar estudante..."
            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 min-w-0"
          />
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

        {/* Gráfico + resumo lateral */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Aproveitamento da Turma
              </h3>
              <span className="text-sm text-slate-500">
                Média de 0 a 20 valores
              </span>
            </div>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={42}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nome" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Bar dataKey="media" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => {
                      let color = "#EF4444";

                      if (entry.media >= 15) color = "#10B981";
                      else if (entry.media >= 10) color = "#3B82F6";
                      else color = "#F59E0B";

                      return <Cell key={index} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo da Turma
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Situação</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  {Math.max(
                    ...students.map((student) => calcularMedia(student)),
                  )}
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Menor Média</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  {Math.min(
                    ...students.map((student) => calcularMedia(student)),
                  )}
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa de Aprovação</p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  {((approvedCount / totalStudents) * 100).toFixed(0)}%
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Taxa de Reprovação</p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  {((failedCount / totalStudents) * 100).toFixed(0)}%
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Tabela */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Nome
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Teste 1
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Teste 2
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Trabalho
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Exame
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Média
                  </th>
                  <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => {
                  const media = calcularMedia(student);
                  const estado = getEstado(media);

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="py-4 px-4 text-slate-700">{student.id}</td>

                      <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                        {student.nome}
                      </td>

                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.teste1}
                          onChange={(e) =>
                            handleChange(student.id, "teste1", e.target.value)
                          }
                          className="w-20 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.teste2}
                          onChange={(e) =>
                            handleChange(student.id, "teste2", e.target.value)
                          }
                          className="w-20 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.trabalho}
                          onChange={(e) =>
                            handleChange(student.id, "trabalho", e.target.value)
                          }
                          className="w-20 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.exame}
                          onChange={(e) =>
                            handleChange(student.id, "exame", e.target.value)
                          }
                          className="w-20 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {media}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            estado === "Aprovado"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginação visual */}
        <div className="bg-white rounded-3xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-center sm:text-left">
            A mostrar <span className="font-semibold">1-5</span> de{" "}
            <span className="font-semibold">5</span> estudantes
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 rounded-2xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              Anterior
            </button>
            <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white">
              1
            </button>
            <button className="px-4 py-2 rounded-2xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              2
            </button>
            <button className="px-4 py-2 rounded-2xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition">
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grades;
