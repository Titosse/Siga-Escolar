import {
  BarChart3,
  Download,
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  TrendingUp,
  Award,
  AlertTriangle,
  FileSpreadsheet,
} from "lucide-react";

function AdminGradesDashboard() {
  const turmas = [
    { id: "cls_001", nome: "7ª Classe A" },
    { id: "cls_002", nome: "7ª Classe B" },
    { id: "cls_003", nome: "8ª Classe A" },
  ];

  const disciplinas = [
    { id: "sub_001", nome: "Matemática" },
    { id: "sub_002", nome: "Português" },
    { id: "sub_003", nome: "Ciências Naturais" },
  ];

  const notas = [
    {
      id: "grade_001",
      aluno: "Ana Maria Ernesto",
      turmaId: "cls_001",
      disciplinaId: "sub_001",
      semestre: "1º semestre",
      nota1: 14,
      nota2: 16,
      media: 15,
      estado: "Aprovado",
    },
    {
      id: "grade_002",
      aluno: "Carlos Alberto",
      turmaId: "cls_001",
      disciplinaId: "sub_001",
      semestre: "1º semestre",
      nota1: 8,
      nota2: 10,
      media: 9,
      estado: "Reprovado",
    },
    {
      id: "grade_003",
      aluno: "Marta João",
      turmaId: "cls_001",
      disciplinaId: "sub_001",
      semestre: "1º semestre",
      nota1: 17,
      nota2: 18,
      media: 17.5,
      estado: "Aprovado",
    },
  ];

  const turmaSelecionada = "cls_001";
  const disciplinaSelecionada = "sub_001";
  const semestreSelecionado = "1º semestre";

  const notasFiltradas = notas.filter(
    (nota) =>
      nota.turmaId === turmaSelecionada &&
      nota.disciplinaId === disciplinaSelecionada &&
      nota.semestre === semestreSelecionado
  );

  const totalAlunos = notasFiltradas.length;

  const aprovados = notasFiltradas.filter((nota) => nota.media >= 10).length;

  const reprovados = notasFiltradas.filter((nota) => nota.media < 10).length;

  const mediaTurma =
    totalAlunos > 0
      ? (
          notasFiltradas.reduce((total, nota) => total + nota.media, 0) /
          totalAlunos
        ).toFixed(1)
      : 0;

  const aproveitamento =
    totalAlunos > 0 ? Math.round((aprovados / totalAlunos) * 100) : 0;

  const desempenhoGeralTurmas = [
    { turma: "7ª A", aproveitamento: 82 },
    { turma: "7ª B", aproveitamento: 74 },
    { turma: "8ª A", aproveitamento: 91 },
    { turma: "8ª B", aproveitamento: 68 },
  ];

  function exportarExcel() {
    alert("Aqui depois vais ligar a função de exportar Excel.");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Painel administrativo</p>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard de Notas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualização, análise e exportação das notas enviadas pelos
            professores.
          </p>
        </div>

        <button
          onClick={exportarExcel}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Download className="w-5 h-5" />
          Exportar Excel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectFilter
          label="Turma"
          icon={<Users />}
          options={turmas}
          defaultText="Selecionar turma"
        />

        <SelectFilter
          label="Disciplina"
          icon={<BookOpen />}
          options={disciplinas}
          defaultText="Selecionar disciplina"
        />

        <div>
          <label className="text-sm text-slate-600">Semestre</label>
          <div className="relative mt-1">
            <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <select className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white">
              <option>1º semestre</option>
              <option>2º semestre</option>
              <option>Anual</option>
            </select>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Total de alunos"
          valor={totalAlunos}
          icon={<Users />}
        />

        <ResumoCard
          titulo="Média da turma"
          valor={`${mediaTurma} valores`}
          icon={<GraduationCap />}
        />

        <ResumoCard
          titulo="Aproveitamento"
          valor={`${aproveitamento}%`}
          icon={<TrendingUp />}
        />

        <ResumoCard
          titulo="Reprovados"
          valor={reprovados}
          icon={<AlertTriangle />}
        />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Aproveitamento geral das turmas
              </h2>
              <p className="text-sm text-slate-500">
                Comparação do desempenho geral por turma
              </p>
            </div>

            <BarChart3 className="w-6 h-6 text-slate-500" />
          </div>

          <div className="space-y-4">
            {desempenhoGeralTurmas.map((item) => (
              <div key={item.turma}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.turma}</span>
                  <span className="font-medium text-slate-700">
                    {item.aproveitamento}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-slate-900 h-3 rounded-full"
                    style={{ width: `${item.aproveitamento}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Resumo da turma selecionada
          </h2>

          <div className="space-y-4">
            <MiniResumo
              label="Turma"
              value="7ª Classe A"
              icon={<Users />}
            />

            <MiniResumo
              label="Disciplina"
              value="Matemática"
              icon={<BookOpen />}
            />

            <MiniResumo
              label="Semestre"
              value={semestreSelecionado}
              icon={<CalendarDays />}
            />

            <MiniResumo
              label="Melhor média"
              value="17.5 valores"
              icon={<Award />}
            />

            <MiniResumo
              label="Aprovados"
              value={aprovados}
              icon={<TrendingUp />}
            />

            <MiniResumo
              label="Reprovados"
              value={reprovados}
              icon={<AlertTriangle />}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Notas da turma selecionada
            </h2>
            <p className="text-sm text-slate-500">
              Lista de notas enviadas pelo professor da disciplina.
            </p>
          </div>

          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Exportar esta turma
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">Aluno</th>
                <th className="py-3 px-4 text-slate-600">Nota 1</th>
                <th className="py-3 px-4 text-slate-600">Nota 2</th>
                <th className="py-3 px-4 text-slate-600">Média</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
              </tr>
            </thead>

            <tbody>
              {notasFiltradas.map((nota) => (
                <tr
                  key={nota.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-4 px-4 font-medium text-slate-800">
                    {nota.aluno}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {nota.nota1}
                  </td>

                  <td className="py-4 px-4 text-slate-700">
                    {nota.nota2}
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {nota.media}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        nota.media >= 10
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {nota.media >= 10 ? "Aprovado" : "Reprovado"}
                    </span>
                  </td>
                </tr>
              ))}

              {notasFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhuma nota encontrada para esta seleção.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({ label, icon, options, defaultText }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>

      <div className="relative mt-1">
        <div className="absolute left-3 top-3 w-5 h-5 text-slate-400">
          {icon}
        </div>

        <select className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white">
          <option value="">{defaultText}</option>

          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ResumoCard({ titulo, valor, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{titulo}</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">{valor}</h2>
      </div>

      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function MiniResumo({ label, value, icon }) {
  return (
    <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default AdminGradesDashboard;