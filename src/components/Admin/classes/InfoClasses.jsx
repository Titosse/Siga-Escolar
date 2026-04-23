import {
  Users,
  User,
  BookOpen,
  Clock,
  Building2,
  BadgeInfo,
} from "lucide-react";
import { subjects } from "../../../Data/mockData";

function InfoClasse({ classe, onClose }) {
  const studentsData = JSON.parse(localStorage.getItem("students"));
  const teachersData = JSON.parse(localStorage.getItem("teachers"));

  const alunosDaTurma =
    studentsData.filter((student) => classe.id === student.turmaId) || [];

  const professoresDaTurma =
    teachersData.filter((teacher) =>
      classe.relacoes?.professores?.includes(teacher.id),
    ) || [];

  const disciplinasDaTurma =
    subjects.filter((subject) =>
      classe.relacoes?.disciplinas?.includes(subject.id),
    ) || [];

  const professorResponsavel = teachersData.find(
    (teacher) => teacher.id === classe.responsavel,
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div
        className="bg-white rounded-2xl w-full max-w-5xl p-6 relative "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Informações da Turma
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-sm font-medium text-slate-600">
                ID
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {classe.id}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-sm font-medium text-slate-600">
                Nome da turma
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {classe.nome}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
              <BadgeInfo className="w-5 h-5 text-slate-500 mt-1" />
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Classe
                </label>
                <p className="text-lg font-semibold text-slate-800">
                  {classe.info?.classe || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-500 mt-1" />
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Turno
                </label>
                <p className="text-lg font-semibold text-slate-800">
                  {classe.info?.turno || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
              <Building2 className="w-5 h-5 text-slate-500 mt-1" />
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Sala
                </label>
                <p className="text-lg font-semibold text-slate-800">
                  {classe.info?.sala || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-sm font-medium text-slate-600">
                Responsável
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {professorResponsavel ? professorResponsavel.nome : "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-sm font-medium text-slate-600">
                Ano lectivo
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {classe.meta?.anoLectivo || "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-sm font-medium text-slate-600">
                Estado
              </label>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  classe.meta?.estado === "activa" ||
                  classe.meta?.estado === "Activa"
                    ? "bg-green-200 text-green-800"
                    : classe.meta?.estado === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {classe.meta?.estado || "N/A"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-600">Estudantes</p>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {alunosDaTurma.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-slate-600">Professores</p>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {professoresDaTurma.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-600">Disciplinas</p>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {disciplinasDaTurma.length}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Estudantes da Turma
              </h3>

              {alunosDaTurma.length > 0 ? (
                <div className="space-y-3">
                  {alunosDaTurma.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white border border-slate-200 rounded-xl p-4"
                    >
                      <p className="font-semibold text-slate-800">
                        {student.nome}
                      </p>
                      <p className="text-sm text-slate-500">
                        {student.codigoAluno || student.id}
                      </p>
                      <p className="text-sm text-slate-500">
                        Género: {student.genero || "N/A"}
                      </p>
                      <p className="text-sm text-slate-500">
                        Contacto: {student.telefone || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Nenhum estudante encontrado.</p>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Professores ligados
              </h3>

              {professoresDaTurma.length > 0 ? (
                <div className="space-y-3">
                  {professoresDaTurma.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="bg-white border border-slate-200 rounded-xl p-4"
                    >
                      <p className="font-semibold text-slate-800">
                        {teacher.nome}
                      </p>
                      <p className="text-sm text-slate-500">
                        {teacher.codigoFuncionario || teacher.id}
                      </p>
                      <p className="text-sm text-slate-500">
                        Contacto: {teacher.telefone || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Nenhum professor encontrado.</p>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Disciplinas da Turma
              </h3>

              {disciplinasDaTurma.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {disciplinasDaTurma.map((subject) => (
                    <span
                      key={subject.id}
                      className="px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-sm font-medium"
                    >
                      {subject.nome}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Nenhuma disciplina encontrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoClasse;
