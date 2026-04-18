import {
  BookOpen,
  CheckCircle2,
  XCircle,
  GraduationCap,
} from "lucide-react";

function StudentGrades() {
  const subjects = [
    {
      id: 1,
      disciplina: "Matemática",
      av1: 14,
      av2: 15,
      trabalho: 16,
      exame: 13,
    },
    {
      id: 2,
      disciplina: "Português",
      av1: 11,
      av2: 12,
      trabalho: 13,
      exame: 10,
    },
    {
      id: 3,
      disciplina: "Ciências Naturais",
      av1: 15,
      av2: 14,
      trabalho: 16,
      exame: 15,
    },
    {
      id: 4,
      disciplina: "História",
      av1: 17,
      av2: 16,
      trabalho: 15,
      exame: 16,
    },
    {
      id: 5,
      disciplina: "Geografia",
      av1: 10,
      av2: 11,
      trabalho: 12,
      exame: 9,
    },
  ];

  function calcularMedia(subject) {
    const media =
      (subject.av1 + subject.av2 + subject.trabalho + subject.exame) / 4;

    return Number(media.toFixed(1));
  }

  function getEstado(media) {
    return media >= 10 ? "Aprovado" : "Reprovado";
  }

  const totalSubjects = subjects.length;
  const approvedCount = subjects.filter(
    (subject) => calcularMedia(subject) >= 10
  ).length;
  const failedCount = subjects.filter(
    (subject) => calcularMedia(subject) < 10
  ).length;

  const generalAverage = (
    subjects.reduce((acc, subject) => acc + calcularMedia(subject), 0) /
    subjects.length
  ).toFixed(1);

  const bestSubject = subjects.reduce((best, current) =>
    calcularMedia(current) > calcularMedia(best) ? current : best
  );

  const worstSubject = subjects.reduce((worst, current) =>
    calcularMedia(current) < calcularMedia(worst) ? current : worst
  );

  const stats = [
    {
      title: "Disciplinas",
      value: totalSubjects,
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Aprovadas",
      value: approvedCount,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Reprovadas",
      value: failedCount,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Média Geral",
      value: generalAverage,
      icon: GraduationCap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className=" p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Minhas Notas
            </h1>
            <p className="text-slate-500 mt-1">
              Consulta do desempenho académico por disciplina
            </p>
          </div>
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

        {/* Conteúdo principal */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Tabela de notas */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Notas por Disciplina
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      Disciplina
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      AV1
                    </th>
                    <th className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      AV2
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
                  {subjects.map((subject) => {
                    const media = calcularMedia(subject);
                    const estado = getEstado(media);

                    return (
                      <tr
                        key={subject.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="py-4 px-4 font-medium text-slate-800 whitespace-nowrap">
                          {subject.disciplina}
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          {subject.av1}
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          {subject.av2}
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          {subject.trabalho}
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          {subject.exame}
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

          {/* Resumo lateral */}
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Resumo do Desempenho
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Disciplina</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  {bestSubject.disciplina}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Média: {calcularMedia(bestSubject)}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Disciplina a Melhorar</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  {worstSubject.disciplina}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Média: {calcularMedia(worstSubject)}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Estado Geral</p>
                <h4 className="text-xl font-bold text-blue-600 mt-2">
                  {Number(generalAverage) >= 10 ? "Bom" : "Precisa Melhorar"}
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Aproveitamento</p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  {((approvedCount / totalSubjects) * 100).toFixed(0)}%
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentGrades;