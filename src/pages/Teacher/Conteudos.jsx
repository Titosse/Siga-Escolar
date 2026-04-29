import {
  CalendarDays,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";

function ConteudosSemestre() {
  const disciplina = {
    nome: "Matemática",
    turma: "7ª Classe A",
    semestre: "1º Semestre",
    anoLectivo: "2026",
    professor: "João Manuel",
  };

  const conteudos = [
    {
      id: 1,
      semana: "Semana 1",
      periodo: "03 - 07 Fevereiro",
      tema: "Números naturais",
      objectivos: "Identificar, ler e escrever números naturais.",
      estado: "Leccionado",
    },
    {
      id: 2,
      semana: "Semana 2",
      periodo: "10 - 14 Fevereiro",
      tema: "Operações com números naturais",
      objectivos: "Resolver adições, subtracções, multiplicações e divisões.",
      estado: "Leccionado",
    },
    {
      id: 3,
      semana: "Semana 3",
      periodo: "17 - 21 Fevereiro",
      tema: "Múltiplos e divisores",
      objectivos: "Determinar múltiplos e divisores de um número.",
      estado: "Em curso",
    },
    {
      id: 4,
      semana: "Semana 4",
      periodo: "24 - 28 Fevereiro",
      tema: "MDC e MMC",
      objectivos: "Calcular o máximo divisor comum e o mínimo múltiplo comum.",
      estado: "Pendente",
    },
    {
      id: 5,
      semana: "Semana 5",
      periodo: "03 - 07 Março",
      tema: "Fracções",
      objectivos: "Representar e comparar fracções.",
      estado: "Pendente",
    },
    {
      id: 6,
      semana: "Semana 6",
      periodo: "10 - 14 Março",
      tema: "Números decimais",
      objectivos: "Ler, escrever e comparar números decimais.",
      estado: "Pendente",
    },
  ];

  const total = conteudos.length;
  const leccionados = conteudos.filter(
    (item) => item.estado === "Leccionado"
  ).length;
  const pendentes = conteudos.filter(
    (item) => item.estado === "Pendente"
  ).length;
  const emCurso = conteudos.filter(
    (item) => item.estado === "Em curso"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Plano semestral de conteúdos</p>
          <h1 className="text-2xl font-bold text-slate-800">
            {disciplina.nome}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {disciplina.turma} • {disciplina.semestre} • Ano lectivo{" "}
            {disciplina.anoLectivo}
          </p>
          <p className="text-sm text-slate-500">
            Professor: {disciplina.professor}
          </p>
        </div>

        <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar conteúdo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Total de conteúdos"
          valor={total}
          icon={<BookOpen />}
        />

        <ResumoCard
          titulo="Leccionados"
          valor={leccionados}
          icon={<CheckCircle />}
        />

        <ResumoCard
          titulo="Em curso"
          valor={emCurso}
          icon={<Clock />}
        />

        <ResumoCard
          titulo="Pendentes"
          valor={pendentes}
          icon={<AlertCircle />}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <CalendarDays className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Conteúdos por semana
            </h2>
            <p className="text-sm text-slate-500">
              Organização dos temas a leccionar durante o semestre
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {conteudos.map((conteudo) => (
            <div
              key={conteudo.id}
              className="border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {conteudo.semana}
                    </span>

                    <span className="text-xs text-slate-500">
                      {conteudo.periodo}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-800">
                    {conteudo.tema}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {conteudo.objectivos}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
                    conteudo.estado === "Leccionado"
                      ? "bg-green-100 text-green-700"
                      : conteudo.estado === "Em curso"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {conteudo.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
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

export default ConteudosSemestre;