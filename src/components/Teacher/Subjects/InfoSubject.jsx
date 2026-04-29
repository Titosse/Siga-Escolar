import {
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Plus,
  CheckCircle,
  Clock,
} from "lucide-react"; 

function DisciplinaDashboard() {
  const disciplina = {
    nome: "Matemática",
    professor: "João Manuel",
    turma: "7ª Classe A",
    anoLectivo: "2026",
    totalAlunos: 42,
    mediaTurma: 13.8,
    aprovacao: "78%",
    avaliacoes: 4,
  };

  const aulas = [
    { tema: "Frações", data: "12/04/2026", estado: "Dado" },
    { tema: "Números decimais", data: "15/04/2026", estado: "Dado" },
    { tema: "Equações simples", data: "20/04/2026", estado: "Pendente" },
  ];

  const alunos = [
    { nome: "Ana Maria Ernesto", nota: 15, assiduidade: "92%" },
    { nome: "Carlos Alberto", nota: 12, assiduidade: "85%" },
    { nome: "Marta João", nota: 17, assiduidade: "96%" },
    { nome: "Ernesto Paulo", nota: 9, assiduidade: "70%" },
  ];

  const desempenho = [
    { avaliacao: "Teste 1", media: 12 },
    { avaliacao: "Trabalho", media: 14 },
    { avaliacao: "Teste 2", media: 13 },
    { avaliacao: "Exame", media: 15 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Dashboard da disciplina</p>
          <h1 className="text-2xl font-bold text-slate-800">
            {disciplina.nome}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Professor: {disciplina.professor} • Turma: {disciplina.turma} • Ano:{" "}
            {disciplina.anoLectivo}
          </p>
        </div>

        <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition">
          <Plus className="w-4 h-4" />
          Nova avaliação
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Alunos"
          valor={disciplina.totalAlunos}
          icon={<Users />}
        />
        <ResumoCard
          titulo="Média da turma"
          valor={disciplina.mediaTurma}
          icon={<GraduationCap />}
        />
        <ResumoCard
          titulo="Aprovação"
          valor={disciplina.aprovacao}
          icon={<CheckCircle />}
        />
        <ResumoCard
          titulo="Avaliações"
          valor={disciplina.avaliacoes}
          icon={<ClipboardList />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Desempenho da turma
              </h2>
              <p className="text-sm text-slate-500">
                Média por avaliação realizada
              </p>
            </div>
            <BarChart3 className="w-6 h-6 text-slate-500" />
          </div>

          <div className="space-y-4">
            {desempenho.map((item) => (
              <div key={item.avaliacao}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.avaliacao}</span>
                  <span className="font-medium text-slate-700">
                    {item.media} valores
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-slate-800 h-3 rounded-full"
                    style={{ width: `${(item.media / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Aulas / Conteúdos
          </h2>

          <div className="space-y-3">
            {aulas.map((aula) => (
              <div
                key={aula.tema}
                className="border border-slate-200 rounded-xl p-3 flex items-start gap-3"
              >
                <BookOpen className="w-5 h-5 text-slate-500 mt-1" />

                <div className="flex-1">
                  <h3 className="font-medium text-slate-700">{aula.tema}</h3>
                  <p className="text-sm text-slate-500">{aula.data}</p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    aula.estado === "Dado"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {aula.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Lista de alunos
            </h2>
            <p className="text-sm text-slate-500">
              Notas e assiduidade na disciplina
            </p>
          </div>

          <button className="text-sm bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200">
            Ver todos
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="py-3">Aluno</th>
                <th className="py-3">Nota actual</th>
                <th className="py-3">Assiduidade</th>
                <th className="py-3">Estado</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.nome} className="border-b last:border-0">
                  <td className="py-3 font-medium text-slate-700">
                    {aluno.nome}
                  </td>
                  <td className="py-3">{aluno.nota} valores</td>
                  <td className="py-3">{aluno.assiduidade}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        aluno.nota >= 10
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {aluno.nota >= 10 ? "Aprovado" : "Em risco"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AcaoRapida titulo="Adicionar nota" icon={<ClipboardList />} />
        <AcaoRapida titulo="Marcar presença" icon={<CheckCircle />} />
        <AcaoRapida titulo="Criar tarefa" icon={<Clock />} />
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

function AcaoRapida({ titulo, icon }) {
  return (
    <button className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-3 hover:bg-slate-50 transition text-left">
      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
        {icon}
      </div>

      <span className="font-medium text-slate-700">{titulo}</span>
    </button>
  );
}

export default DisciplinaDashboard;