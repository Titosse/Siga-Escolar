import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  CalendarDays,
  Download,
  Save,
  Search,
  FileSpreadsheet,
  TrendingUp,
  AlertTriangle,
  Award,
  ClipboardList,
} from "lucide-react";

function TeacherGradesDashboard() {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const studentsData = JSON.parse(localStorage.getItem("students")) || [];
  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];

  const teacher = teachersData.find((tch) => tch.nome === nome);

  const classesTeacher = classesData.filter((cls) =>
    teacher?.turmaIds?.includes(cls.id),
  );

  const subjectsTeacher = subjectsData.filter((sub) =>
    sub.relacoes?.professores?.includes(teacher?.id),
  );

  console.log(teacher);
  console.log(classesTeacher);
  console.log(subjectsTeacher);

  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");
  const [semestreSelecionado, setSemestreSelecionado] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  }

  const [grades, setGrades] = useState(() => {
    const savedGrades = localStorage.getItem("grades");
    return savedGrades ? JSON.parse(savedGrades) : [];
  });

  const alunosDaTurma = studentsData.filter(
    (aluno) =>
      aluno.turmaId === turmaSelecionada &&
      aluno.nome.toLowerCase().includes(search.toLowerCase()),
  );

  function getNotaAluno(alunoId) {
    return grades.find(
      (nota) =>
        nota.relacoes.studentId === alunoId &&
        nota.relacoes.turmaId === turmaSelecionada &&
        nota.relacoes.disciplinaId === disciplinaSelecionada &&
        nota.periodo === semestreSelecionado,
    );
  }

  function calcularMedia(teste1, teste2, trabalho) {
    const n1 = Number(teste1) || 0;
    const n2 = Number(teste2) || 0;
    const trab = Number(trabalho) || 0;

    if (n1 === 0 && n2 === 0 && trab === 0) return 0;

    return ((n1 + n2 + trab) / 3).toFixed(1);
  }

  function handleNotaChange(alunoId, campo, valor) {
    if (!turmaSelecionada || !disciplinaSelecionada || !semestreSelecionado) {
      alert(
        "Selecione a turma, a disciplina e o semestre antes de lançar notas.",
      );
      return;
    }

    const numero = Number(valor);

    if (valor !== "" && (numero < 0 || numero > 20)) {
      alert("A nota deve estar entre 0 e 20 valores.");
      return;
    }

    setGrades((prev) => {
      const notaExistente = prev.find(
        (grade) =>
          grade.relacoes?.studentId === alunoId &&
          grade.relacoes?.turmaId === turmaSelecionada &&
          grade.relacoes?.disciplinaId === disciplinaSelecionada &&
          grade.periodo === semestreSelecionado,
      );

      if (notaExistente) {
        return prev.map((grade) =>
          grade.relacoes?.studentId === alunoId &&
          grade.relacoes?.turmaId === turmaSelecionada &&
          grade.relacoes?.disciplinaId === disciplinaSelecionada &&
          grade.periodo === semestreSelecionado
            ? {
                ...grade,
                notas: {
                  ...grade.notas,
                  [campo]: valor,
                },
                resultado: {
                  media: calcularMedia(
                    campo === "teste1" ? valor : grade.notas?.teste1,
                    campo === "teste2" ? valor : grade.notas?.teste2,
                    campo === "trabalho" ? valor : grade.notas?.trabalho,
                  ),
                },
                meta: {
                  ...grade.meta,
                  updatedAt: new Date().toISOString().slice(0, 10),
                },
              }
            : grade,
        );
      }

      return [
        ...prev,
        {
          id: `grade_${Date.now()}`,
          relacoes: {
            studentId: alunoId,
            teacherId: teacher?.id || "",
            turmaId: turmaSelecionada,
            disciplinaId: disciplinaSelecionada,
          },
          periodo: semestreSelecionado,
          notas: {
            teste1: campo === "teste1" ? valor : "",
            teste2: campo === "teste2" ? valor : "",
            trabalho: campo === "trabalho" ? valor : "",
            exame: "",
          },
          resultado: {
            media: calcularMedia(
              campo === "teste1" ? valor : "",
              campo === "teste2" ? valor : "",
              campo === "trabalho" ? valor : "",
            ),
          },
          estado: "activo",
          meta: {
            createdAt: new Date().toISOString().slice(0, 10),
            updatedAt: new Date().toISOString().slice(0, 10),
          },
        },
      ];
    });
  }

  function totalAlunosTurma(turmaId) {
    return studentsData.filter((student) => student.turmaId === turmaId).length;
  }

  function notasTurma(turmaId) {
    return grades.filter((grade) => grade.relacoes?.turmaId === turmaId);
  }

  function mediaTurmaCard(turmaId) {
    const notas = notasTurma(turmaId);

    if (notas.length === 0) return 0;

    const total = notas.reduce((acc, grade) => {
      return (
        acc +
        Number(
          calcularMedia(
            grade.notas?.teste1,
            grade.notas?.teste2,
            grade.notas?.trabalho,
          ),
        )
      );
    }, 0);

    return (total / notas.length).toFixed(1);
  }

  function disciplinasTurma(turmaId) {
    return subjectsTeacher
      .filter((sub) => sub.relacoes?.turmas?.includes(turmaId))
      .map((sub) => sub.info?.nome)
      .join(", ");
  }

  function aproveitamentoTurma(turmaId) {
    const notas = notasTurma(turmaId);

    if (notas.length === 0) return 0;

    const aprovados = notas.filter((grade) => {
      const media = Number(
        calcularMedia(
          grade.notas?.teste1,
          grade.notas?.teste2,
          grade.notas?.trabalho,
        ),
      );

      return media >= 10;
    }).length;

    return Math.round((aprovados / notas.length) * 100);
  }

  function estadoTurma(turmaId) {
    const alunos = totalAlunosTurma(turmaId);
    const notas = notasTurma(turmaId);

    if (notas.length === 0) {
      return {
        texto: "Sem notas",
        cor: "text-slate-500",
        bg: "bg-slate-100",
      };
    }

    if (notas.length < alunos) {
      return {
        texto: "Em lançamento",
        cor: "text-yellow-700",
        bg: "bg-yellow-100",
      };
    }

    return {
      texto: "Completo",
      cor: "text-green-700",
      bg: "bg-green-100",
    };
  }

  const notasFiltradas = grades.filter(
    (nota) =>
      nota.relacoes.turmaId === turmaSelecionada &&
      nota.relacoes.disciplinaId === disciplinaSelecionada &&
      nota.periodo === semestreSelecionado,
  );

  const totalAvaliados = notasFiltradas.length;

  const aprovados = notasFiltradas.filter((grade) => {
    const media = Number(
      calcularMedia(
        grade.notas?.teste1,
        grade.notas?.teste2,
        grade.notas?.trabalho,
      ),
    );

    return media >= 10;
  }).length;

  const reprovados = notasFiltradas.filter((grade) => {
    const media = Number(
      calcularMedia(
        grade.notas?.teste1,
        grade.notas?.teste2,
        grade.notas?.trabalho,
      ),
    );

    return media > 0 && media < 10;
  }).length;

  const mediaTurma =
    totalAvaliados > 0
      ? (
          notasFiltradas.reduce((total, grade) => {
            return (
              total +
              Number(
                calcularMedia(
                  grade.notas?.teste1,
                  grade.notas?.teste2,
                  grade.notas?.trabalho,
                ),
              )
            );
          }, 0) / totalAvaliados
        ).toFixed(1)
      : 0;

  const aproveitamento =
    totalAvaliados > 0 ? Math.round((aprovados / totalAvaliados) * 100) : 0;

  function salvarNotas() {
    if (!turmaSelecionada || !disciplinaSelecionada || !semestreSelecionado) {
      alert("Selecione a turma, a disciplina e o semestre antes de guardar.");
      return;
    }

    localStorage.setItem("grades", JSON.stringify(grades));
    showToast("Notas adicionadas com sucesso.");
  }

  function exportarExcel() {
    alert("Aqui depois vais ligar a função de exportar Excel com xlsx.");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Painel do professor</p>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard de Notas
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={exportarExcel}
            className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-xl hover:bg-green-200 transition"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Exportar Excel
          </button>

          <button
            onClick={salvarNotas}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Save className="w-5 h-5" />
            Guardar notas
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Turmas leccionadas"
          valor={classesTeacher.length}
          icon={<Users />}
        />

        <ResumoCard
          titulo="Disciplinas"
          valor={subjectsTeacher.length}
          icon={<BookOpen />}
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
      </section>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Resumo das turmas que lecciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classesTeacher.map((turma) => (
            <div
              key={turma.id}
              className="border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {turma.info.classe} - {turma.nome}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {totalAlunosTurma(turma.id)} alunos
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  Disciplinas:{" "}
                  {disciplinasTurma(turma.id)}
                </p>
                <p>
                  Aproveitamento:{" "}
                  <span className="font-semibold text-slate-800">
                    {aproveitamentoTurma(turma.id)}%
                  </span>
                </p>
                <p>
                  Estado:{" "}
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      estadoTurma(turma.id).bg
                    } ${estadoTurma(turma.id).cor}`}
                  >
                    {estadoTurma(turma.id).texto}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectFilter
          label="Turma"
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
          icon={<Users />}
          options={classesTeacher}
        />

        <SelectFilter
          label="Disciplina"
          value={disciplinaSelecionada}
          onChange={(e) => setDisciplinaSelecionada(e.target.value)}
          icon={<BookOpen />}
          options={subjectsTeacher}
        />

        <div>
          <label className="text-sm text-slate-600">Semestre</label>
          <div className="relative mt-1">
            <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <select
              value={semestreSelecionado}
              onChange={(e) => setSemestreSelecionado(e.target.value)}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
            >
              <option value="">Selecionar semestre</option>
              <option value="1º semestre">1º semestre</option>
              <option value="2º semestre">2º semestre</option>
              <option value="anual">Anual</option>
            </select>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Alunos avaliados"
          valor={totalAvaliados}
          icon={<ClipboardList />}
        />

        <ResumoCard titulo="Aprovados" valor={aprovados} icon={<Award />} />

        <ResumoCard
          titulo="Reprovados"
          valor={reprovados}
          icon={<AlertTriangle />}
        />

        <ResumoCard
          titulo="Total da turma"
          valor={alunosDaTurma.length}
          icon={<Users />}
        />
      </section>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Lançamento de notas
            </h2>
            <p className="text-sm text-slate-500">
              Atribua notas aos alunos da turma seleccionada.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">Aluno</th>
                <th className="py-3 px-4 text-slate-600">Nota 1</th>
                <th className="py-3 px-4 text-slate-600">Nota 2</th>
                <th className="py-3 px-4 text-slate-600">Trabalho</th>
                <th className="py-3 px-4 text-slate-600">Média</th>
                <th className="py-3 px-4 text-slate-600">Estado</th>
              </tr>
            </thead>

            <tbody>
              {alunosDaTurma.map((aluno) => {
                const nota = getNotaAluno(aluno.id);
                const media = calcularMedia(
                  nota?.notas?.teste1,
                  nota?.notas?.teste2,
                  nota?.notas?.trabalho,
                );

                return (
                  <tr
                    key={aluno.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {aluno.nome}
                    </td>

                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.1"
                        value={nota?.notas?.teste1 || ""}
                        onChange={(e) =>
                          handleNotaChange(aluno.id, "teste1", e.target.value)
                        }
                        className="w-24 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                      />
                    </td>

                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.1"
                        value={nota?.notas?.teste2 || ""}
                        onChange={(e) =>
                          handleNotaChange(aluno.id, "teste2", e.target.value)
                        }
                        className="w-24 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                      />
                    </td>

                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.1"
                        value={nota?.notas?.trabalho || ""}
                        onChange={(e) =>
                          handleNotaChange(aluno.id, "trabalho", e.target.value)
                        }
                        className="w-24 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                      />
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {media}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          Number(media) >= 10
                            ? "bg-green-100 text-green-700"
                            : Number(media) > 0
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {Number(media) >= 10
                          ? "Aprovado"
                          : Number(media) > 0
                            ? "Reprovado"
                            : "Sem nota"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {alunosDaTurma.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 px-4 text-center text-slate-500"
                  >
                    Nenhum aluno encontrado para esta turma.
                  </td>
                </tr>
              )}

              {toast.show && (
                <div className="fixed top-5 right-5 z-50 animate-bounce">
                  <div
                    className={`px-5 py-4 rounded-2xl shadow-lg text-white flex items-center gap-3 ${
                      toast.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-semibold">Sucesso</h3>

                      <p className="text-sm text-white/90">{toast.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({ label, value, onChange, icon, options }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>

      <div className="relative mt-1">
        <div className="absolute left-3 top-3 w-5 h-5 text-slate-400">
          {icon}
        </div>

        <select
          value={value}
          onChange={onChange}
          className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
        >
          <option value="">Selecionar</option>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.info?.nome || item.nome}
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

export default TeacherGradesDashboard;
