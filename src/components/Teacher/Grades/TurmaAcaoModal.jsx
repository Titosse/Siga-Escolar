import { useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardList,
  Eye,
  X,
  GraduationCap,
  FilePenLine,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function TurmaAcaoModal({
  turma,
  onClose,
  studentsData,
  subjectsData,
  gradesData,
}) {
  const [tab, setTab] = useState("students");

  if (!turma) return null;

  const studentsTurma = studentsData.filter(
    (student) => student.turmaId === turma.id,
  );

  const subjectsTurma = subjectsData.filter((subject) =>
    subject.relacoes?.turmas?.includes(turma.id),
  );

  function notasPendentesAluno(studentId) {
    let pendentes = 0;

    subjectsTurma.forEach((subject) => {
      const grade = gradesData.find(
        (grade) =>
          grade.relacoes?.studentId === studentId &&
          grade.relacoes?.turmaId === turma.id &&
          grade.relacoes?.disciplinaId === subject.id,
      );

      const notas = grade?.notas;

      const completa =
        notas?.teste1 !== "" &&
        notas?.teste2 !== "" &&
        notas?.trabalho !== "" &&
        notas?.teste1 !== undefined &&
        notas?.teste2 !== undefined &&
        notas?.trabalho !== undefined;

      if (!completa) {
        pendentes += 1;
      }
    });

    return pendentes;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div>
            <p className="text-slate-300 text-sm">Gestão da Turma</p>

            <h2 className="text-3xl font-bold mt-1">
              {turma.info?.classe || "Sem classe"} -{" "}
              {turma.nome || turma.info?.nome}
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Visualização completa da turma
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-50 border-b border-slate-200">
          <CardResumo
            title="Estudantes"
            value={studentsTurma.length}
            icon={<Users />}
          />

          <CardResumo
            title="Disciplinas"
            value={subjectsTurma.length}
            icon={<BookOpen />}
          />

          <CardResumo
            title="Notas Pendentes"
            value={studentsTurma.reduce(
              (total, student) => total + notasPendentesAluno(student.id),
              0,
            )}
            icon={<ClipboardList />}
          />
        </div>

        <div className="px-6 pt-5 flex flex-wrap gap-3 border-b border-slate-200">
          <TabButton
            active={tab === "students"}
            onClick={() => setTab("students")}
            label="Estudantes"
            icon={<Users />}
          />

          <TabButton
            active={tab === "subjects"}
            onClick={() => setTab("subjects")}
            label="Disciplinas"
            icon={<BookOpen />}
          />

          <TabButton
            active={tab === "grades"}
            onClick={() => setTab("grades")}
            label="Notas"
            icon={<GraduationCap />}
          />
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {tab === "students" && (
            <div className="space-y-4">
              {studentsTurma.map((student) => {
                const pendentes = notasPendentesAluno(student.id);

                return (
                  <div
                    key={student.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {student.nome}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Código: {student.codigo || student.id}
                      </p>

                      <p className="text-sm text-slate-500">
                        Género: {student.genero || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {pendentes > 0 ? (
                        <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {pendentes} pendente(s)
                        </span>
                      ) : (
                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Completo
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {studentsTurma.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  Nenhum estudante encontrado.
                </div>
              )}
            </div>
          )}

          {tab === "subjects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectsTurma.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {subject.info?.nome}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Código: {subject.info?.codigo}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>Carga horária: {subject.info?.cargaHoraria || 0}h</p>

                    <p>Estado: {subject.meta?.estado || "Activa"}</p>
                  </div>
                </div>
              ))}

              {subjectsTurma.length === 0 && (
                <div className="text-center py-10 text-slate-500 col-span-full">
                  Nenhuma disciplina encontrada.
                </div>
              )}
            </div>
          )}

          {tab === "grades" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 text-left text-slate-600">
                      Estudante
                    </th>

                    <th className="py-3 px-4 text-left text-slate-600">
                      Disciplina
                    </th>

                    <th className="py-3 px-4 text-left text-slate-600">
                      Teste 1
                    </th>

                    <th className="py-3 px-4 text-left text-slate-600">
                      Teste 2
                    </th>

                    <th className="py-3 px-4 text-left text-slate-600">
                      Trabalho
                    </th>

                    <th className="py-3 px-4 text-left text-slate-600">
                      Estado
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {studentsTurma.map((student) =>
                    subjectsTurma.map((subject) => {
                      const grade = gradesData.find(
                        (grade) =>
                          grade.relacoes?.studentId === student.id &&
                          grade.relacoes?.turmaId === turma.id &&
                          grade.relacoes?.disciplinaId === subject.id,
                      );

                      const notas = grade?.notas;

                      const completa =
                        notas?.teste1 !== "" &&
                        notas?.teste2 !== "" &&
                        notas?.trabalho !== "" &&
                        notas?.teste1 !== undefined &&
                        notas?.teste2 !== undefined &&
                        notas?.trabalho !== undefined;

                      return (
                        <tr
                          key={`${student.id}-${subject.id}`}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="py-4 px-4 font-medium text-slate-800">
                            {student.nome}
                          </td>

                          <td className="py-4 px-4 text-slate-700">
                            {subject.info?.nome}
                          </td>

                          <td className="py-4 px-4">{notas?.teste1 || "-"}</td>

                          <td className="py-4 px-4">{notas?.teste2 || "-"}</td>

                          <td className="py-4 px-4">
                            {notas?.trabalho || "-"}
                          </td>

                          <td className="py-4 px-4">
                            {completa ? (
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                Completa
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                                Pendente
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    }),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardResumo({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default TurmaAcaoModal;
