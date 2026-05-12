import { Users, ClipboardList, BookOpenCheck, FilePenLine } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TurmaAcaoModal from "../../components/Teacher/Grades/TurmaAcaoModal";

function TeacherDashboard() {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome") || "";

  const [selectedTurma, setSelectedTurma] = useState(null);

  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const studentsData = JSON.parse(localStorage.getItem("students")) || [];
  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const gradesData = JSON.parse(localStorage.getItem("grades")) || [];
  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];
  const tasksData = JSON.parse(localStorage.getItem("tasks")) || [];

  const teacher = teachersData.find(
    (tch) => tch.nome?.trim().toLowerCase() === nome.trim().toLowerCase(),
  );

  const classesTeacher = classesData.filter((cls) =>
    teacher?.turmaIds?.includes(cls.id),
  );

  const subjectsTeacher = subjectsData.filter((subject) =>
    subject.relacoes?.professores?.includes(teacher?.id),
  );

  const studentsTeacher = studentsData.filter((student) =>
    teacher?.turmaIds?.includes(student.turmaId),
  );

  function totalStudentsTurma(turmaId) {
    return studentsData.filter((student) => student.turmaId === turmaId).length;
  }

  function disciplinasTurma(turmaId) {
    const disciplinas = subjectsTeacher.filter((subject) =>
      subject.relacoes?.turmas?.includes(turmaId),
    );

    if (disciplinas.length === 0) return "Sem disciplina";

    return disciplinas
      .map((subject) => subject.info?.nome || "Sem nome")
      .join(", ");
  }

  function notasPendentesTurma(turmaId) {
    const studentsTurma = studentsData.filter(
      (student) => student.turmaId === turmaId,
    );

    const subjectsTurma = subjectsTeacher.filter((subject) =>
      subject.relacoes?.turmas?.includes(turmaId),
    );

    if (studentsTurma.length === 0 || subjectsTurma.length === 0) {
      return 0;
    }

    let pendentes = 0;

    studentsTurma.forEach((student) => {
      subjectsTurma.forEach((subject) => {
        const grade = gradesData.find(
          (grade) =>
            grade.relacoes?.studentId === student.id &&
            grade.relacoes?.turmaId === turmaId &&
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
    });

    return pendentes;
  }

  const totalNotasPendentes = classesTeacher.reduce(
    (total, turma) => total + notasPendentesTurma(turma.id),
    0,
  );

  const tarefasDoProfessor = tasksData.filter(
    (task) =>
      task.relacoes.teacherId === teacher?.id ||
      teacher?.turmaIds?.includes(task.relacoes.turmaId),
  );

  function Turma(turmaId) {
    const turmas = classesData.filter((turma) => turmaId.includes(turma.id));

    if (turmas.length === 0) return "Sem turmas";

    return turmas.map((turma) => turma.nome || "Sem nome").join(", ");
  }

  console.log(tarefasDoProfessor);

  const stats = [
    {
      title: "Turmas",
      value: classesTeacher.length,
      icon: BookOpenCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Estudantes",
      value: studentsTeacher.length,
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Tarefas Activas",
      value: tarefasDoProfessor.filter((task) => !task.completed).length,
      icon: ClipboardList,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Notas Pendentes",
      value: totalNotasPendentes,
      icon: FilePenLine,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard do Professor
            </h1>

            <p className="text-slate-800 mt-1">
              Gestão de notas, tarefas e acompanhamento das turmas
            </p>
          </div>
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

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Minhas Turmas
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600">Turma</th>
                    <th className="py-3 px-4 text-slate-600">Disciplina</th>
                    <th className="py-3 px-4 text-slate-600">Estudantes</th>
                    <th className="py-3 px-4 text-slate-600">
                      Notas Pendentes
                    </th>
                    <th className="py-3 px-4 text-slate-600">Acção</th>
                  </tr>
                </thead>

                <tbody>
                  {classesTeacher.map((turma) => (
                    <tr
                      key={turma.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="py-4 px-4 font-medium text-slate-800">
                        {turma.info?.classe || "Sem classe"} -{" "}
                        {turma.nome || turma.info?.nome || "Sem nome"}
                      </td>

                      <td className="py-4 px-4 text-slate-700">
                        {disciplinasTurma(turma.id)}
                      </td>

                      <td className="py-4 px-4 text-slate-700">
                        {totalStudentsTurma(turma.id)}
                      </td>

                      <td className="py-4 px-4 text-slate-700">
                        {notasPendentesTurma(turma.id)}
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedTurma(turma)}
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}

                  {selectedTurma && (
                    <TurmaAcaoModal
                      turma={selectedTurma}
                      onClose={() => setSelectedTurma(null)}
                      studentsData={studentsData}
                      subjectsData={subjectsData}
                      gradesData={gradesData}
                    />
                  )}
 
                  {classesTeacher.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-6 px-4 text-center text-slate-500"
                      >
                        Nenhuma turma ligada a este professor.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-1 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Tarefas Recentes
            </h3>

            <div className="space-y-4">
              {tarefasDoProfessor.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {task.info.titulo || "Sem título"}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Turmas: {Turma(task.relacoes.turmaId) || "N/A"}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Prazo: {task.datas.prazo || "Sem prazo"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.estado.situacao === "Activa" ||
                        task.estado.situacao === "activo" ||
                        !task.estado.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.estado.situacao ||
                        (task.estado.completed ? "Concluída" : "Activa")}
                    </span>
                  </div>
                </div>
              ))}

              {tarefasDoProfessor.length === 0 && (
                <p className="text-sm text-slate-500">
                  Nenhuma tarefa registada para este professor.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
