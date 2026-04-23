import {
  User,
  Phone,
  Mail,
  MapPin,
  School,
  Users,
  CalendarDays,
  BadgeInfo,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

function StudentProfile() {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const studentsData = JSON.parse(localStorage.getItem("students")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];

  const student = studentsData.find((s) => s.nome === nome);
  const turma = student ? classesData.find((c) => c.id === student.turmaId) : null;

  if (!student) {
    return (
      <div className="w-full bg-slate-100">
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Estudante não encontrado
            </h1>
            <p className="text-slate-500 mt-2">
              Verifica o nome enviado na URL.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const resumo = [
    {
      title: "Turma",
      value: turma?.nome || "Sem turma",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Turno",
      value: turma?.turno || "Não definido",
      icon: CalendarDays,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Escola",
      value: "Escola Secundária Exemplo",
      icon: School,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Código",
      value: student.codigoAluno || "Sem código",
      icon: BadgeInfo,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-3xl bg-slate-300 flex items-center justify-center">
              <User className="w-10 h-10 text-slate-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {student.nome}
              </h1>
              <p className="text-slate-500 mt-1">
                {turma?.nome || "Sem turma"}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Código: {student.codigoAluno || "Sem código"}
              </p>
            </div>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition whitespace-nowrap">
            Editar Perfil
          </button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {resumo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-5 shadow-sm flex items-start justify-between"
              >
                <div>
                  <p className="text-slate-500 text-sm">{item.title}</p>
                  <h3 className="text-lg font-bold text-slate-800 mt-3">
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

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Dados Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <User className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Nome Completo</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.nome}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <BadgeInfo className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Código</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.codigoAluno || "Sem código"}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <Users className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Turma</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {turma?.nome || "Sem turma"}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Data de Nascimento</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.dataNascimento || "Não definida"}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Contacto</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.telefone || "Sem contacto"}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.email || "Sem email"}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 md:col-span-2">
                <MapPin className="w-5 h-5 text-slate-600 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Morada</p>
                  <h4 className="font-semibold text-slate-800 mt-1">
                    {student.morada || "Não definida"}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Informação Académica
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Escola</p>
                <h4 className="text-base font-semibold text-slate-800 mt-1">
                  Escola Secundária Exemplo
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Ano Lectivo</p>
                <h4 className="text-base font-semibold text-slate-800 mt-1">
                  {turma?.anoLectivo || "2026"}
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Turno</p>
                <h4 className="text-base font-semibold text-slate-800 mt-1">
                  {turma?.turno || "Não definido"}
                </h4>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500">Encarregado</p>
                <h4 className="text-base font-semibold text-slate-800 mt-1">
                  {student.encarregado?.nome || "Não definido"}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  {student.encarregado?.telefone || "Sem contacto"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentProfile;
