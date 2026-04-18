import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

function StudentAcademicSummary() {
  const subjects = [
    { nome: "Matemática", media: 15, estado: "Boa" },
    { nome: "Português", media: 12, estado: "Regular" },
    { nome: "Ciências Naturais", media: 14, estado: "Boa" },
    { nome: "História", media: 16, estado: "Excelente" },
    { nome: "Geografia", media: 10, estado: "Regular" },
  ];

  const generalAverage = (
    subjects.reduce((acc, item) => acc + item.media, 0) / subjects.length
  ).toFixed(1);

  const approvedSubjects = subjects.filter((item) => item.media >= 10).length;
  const failedSubjects = subjects.filter((item) => item.media < 10).length;
  const bestSubject = subjects.reduce((best, current) =>
    current.media > best.media ? current : best
  );
  const worstSubject = subjects.reduce((worst, current) =>
    current.media < worst.media ? current : worst
  );

  const stats = [
    {
      title: "Média Geral",
      value: generalAverage,
      icon: GraduationCap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Disciplinas",
      value: subjects.length,
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Aprovadas",
      value: approvedSubjects,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Reprovadas",
      value: failedSubjects,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
          <div className=" p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Resumo Académico
            </h1>
            <p className="text-slate-500 mt-1">
              Visão geral do desempenho escolar, presença e situação académica
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
          {/* Desempenho por disciplina */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Desempenho por Disciplina
            </h3>

            <div className="space-y-5">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-slate-800 font-medium">
                        {subject.nome}
                      </span>
                      <p className="text-sm text-slate-500">{subject.estado}</p>
                    </div>

                    <span className="text-slate-800 font-bold">
                      {subject.media}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        subject.media >= 15
                          ? "bg-green-500"
                          : subject.media >= 10
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${(subject.media / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel lateral */}
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Situação Geral
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Melhor Disciplina</p>
                <h4 className="text-xl font-bold text-green-600 mt-2">
                  {bestSubject.nome}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Média: {bestSubject.media}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Disciplina a Melhorar</p>
                <h4 className="text-xl font-bold text-red-600 mt-2">
                  {worstSubject.nome}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Média: {worstSubject.media}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Presença Geral</p>
                  <h4 className="text-base font-semibold text-slate-800 mt-1">
                    92%
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Boa assiduidade nas aulas
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Situação Académica</p>
                  <h4 className="text-base font-semibold text-slate-800 mt-1">
                    Estável
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Mantém um desempenho positivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Observações */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Observações
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  O aluno apresenta um desempenho global positivo, com destaque
                  em História e Matemática.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  Recomenda-se maior atenção à disciplina de Geografia para
                  melhorar a média.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Recomendações
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  Continuar o ritmo de estudo em História e Matemática.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-700">
                  Reforçar exercícios de Geografia e interpretação em Português.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentAcademicSummary;