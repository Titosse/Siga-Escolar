function InfoTeacher({ teacher, onClose }) {
  const idade = teacher.dataNascimento
    ? Math.floor(
        (new Date() - new Date(teacher.dataNascimento)) /
          (1000 * 60 * 60 * 24 * 365.25),
      )
    : "N/A";

  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];

  const turmas = classesData.map((cls) => ({
    id: cls.id,
    nome: cls.nome,
    info: cls.info,
  }));

  const turmaResponsavel = turmas.find((turma) => turma.id === teacher.turmaId);

  const turmasLeccionadas = turmas.filter((turma) =>
    (teacher.turmaIds || []).includes(turma.id),
  );

  const disciplinasProfessor = subjectsData.filter((disciplina) =>
    disciplina.relacoes?.professores.includes(teacher.id),
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div
        className="bg-white rounded-2xl w-full max-w-4xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          X
        </button>

        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Informações do Professor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem className="" label="ID" value={teacher.id} />
          <InfoItem
            className=""
            label="Código do Funcionário"
            value={teacher.codigoFuncionario}
          />
          <InfoItem label="Nome" value={teacher.nome} />
          <InfoItem label="Email" value={teacher.email} />
          <InfoItem label="Telefone" value={teacher.telefone} />
          <InfoItem label="Género" value={teacher.genero} />
          <InfoItem label="Data de nascimento" value={teacher.dataNascimento} />
          <InfoItem label="Idade" value={idade} />
          <InfoItem label="Morada" value={teacher.morada} />

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Turma Responsável
            </label>
            <p className="text-lg font-semibold text-slate-800">
              {turmaResponsavel
                ? `${turmaResponsavel.info?.classe || "Sem classe"} - ${turmaResponsavel.nome}`
                : "Nenhuma turma selecionada"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Estado
            </label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                teacher.estado === "activo" || teacher.estado === "Activo"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {teacher.estado || "N/A"}
            </span>
          </div>

          <InfoItem label="Criado em" value={teacher.createdAt} />
          <InfoItem label="Actualizado em" value={teacher.updatedAt} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Turmas a leccionar
            </label>

            <div className="flex flex-wrap gap-2">
              {turmasLeccionadas.length > 0 ? (
                turmasLeccionadas.map((turma) => (
                  <span
                    key={turma.id}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                  >
                    {turma.info?.classe || "Sem classe"} - {turma.nome}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">Nenhuma turma selecionada</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Disciplinas
            </label>

            <div className="flex flex-wrap gap-2">
              {disciplinasProfessor.length > 0 ? (
                disciplinasProfessor.map((disciplina) => (
                  <span
                    key={disciplina.id}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                  >
                    {disciplina.info.nome}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">Nenhuma disciplina selecionada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-600">
        {label}
      </label>
      <p className="text-lg font-semibold text-slate-800">{value || "N/A"}</p>
    </div>
  );
}

export default InfoTeacher;
