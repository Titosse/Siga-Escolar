import {
  BookOpen,
  Hash,
  CalendarDays,
  Layers,
  FileText,
  Clock,
  User,
  Users,
  X,
  CheckCircle,
} from "lucide-react";

function InfoSubject({ subject, onClose }) {
  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];

  const professoresIds = subject.relacoes?.professores || [];
  const turmasIds = subject.relacoes?.turmas || [];

  const professores = teachersData.filter((teacher) =>
    professoresIds.includes(teacher.id)
  );

  const turmas = classesData.filter((turma) => turmasIds.includes(turma.id));

  return (
    <div className="h-full fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          <X className="w-4 h-4 mx-auto" />
        </button>

        <div className="mb-6">
          <p className="text-sm text-slate-500">Informações da disciplina</p>
          <h1 className="text-2xl font-bold text-slate-800">
            {subject.info?.nome || "Sem nome"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Código: {subject.info?.codigo || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoCard
            icon={<Clock />}
            label="Carga horária"
            value={`${subject.info?.cargaHoraria || 0}h`}
          />

          <InfoCard
            icon={<Layers />}
            label="Classe"
            value={subject.info?.classe || "N/A"}
          />

          <InfoCard
            icon={<CheckCircle />}
            label="Estado"
            value={subject.meta?.estado || "N/A"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Dados gerais">
            <InfoItem
              icon={<BookOpen />}
              label="Nome"
              value={subject.info?.nome || "N/A"}
            />

            <InfoItem
              icon={<Hash />}
              label="Código"
              value={subject.info?.codigo || "N/A"}
            />

            <InfoItem
              icon={<Layers />}
              label="Área curricular"
              value={subject.info?.area || "N/A"}
            />

            <InfoItem
              icon={<CalendarDays />}
              label="Semestre"
              value={subject.info?.semestre || "N/A"}
            />

            <InfoItem
              icon={<CalendarDays />}
              label="Ano lectivo"
              value={subject.info?.anoLectivo || "N/A"}
            />
          </Section>

          <Section title="Datas do sistema">
            <InfoItem
              icon={<CalendarDays />}
              label="Criado em"
              value={subject.meta?.createdAt || "N/A"}
            />

            <InfoItem
              icon={<CalendarDays />}
              label="Actualizado em"
              value={subject.meta?.updatedAt || "N/A"}
            />
          </Section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Section title="Professores ligados">
            {professores.length > 0 ? (
              professores.map((teacher) => (
                <InfoItem
                  key={teacher.id}
                  icon={<User />}
                  label={teacher.id}
                  value={teacher.nome}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">Sem professor ligado.</p>
            )}
          </Section>

          <Section title="Turmas ligadas">
            {turmas.length > 0 ? (
              turmas.map((turma) => (
                <InfoItem
                  key={turma.id}
                  icon={<Users />}
                  label={turma.id}
                  value={`${turma.info?.classe || "Sem classe"} - ${
                    turma.nome || turma.info?.nome || "Sem nome"
                  }`}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">Sem turma ligada.</p>
            )}
          </Section>
        </div>

        <div className="mt-6">
          <Section title="Descrição">
            <div className="flex gap-3 border border-slate-200 rounded-xl p-4 bg-slate-50">
              <FileText className="w-5 h-5 text-slate-400 mt-1" />
              <p className="text-sm text-slate-600 leading-6">
                {subject.info?.descricao || "Sem descrição."}
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-slate-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <h2 className="font-semibold text-slate-800">{value}</h2>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border border-slate-100 rounded-xl p-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default InfoSubject;