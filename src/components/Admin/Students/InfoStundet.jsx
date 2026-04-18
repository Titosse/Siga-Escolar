function InfoStudents({ student, onClose }) {
  const idade = student.dataNascimento
    ? Math.floor(
        (new Date() - new Date(student.dataNascimento)) /
          (1000 * 60 * 60 * 24 * 365.25),
      )
    : "N/A";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl w-full max-w-3xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          X
        </button>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Informações do Estudante
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600">
                ID
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.id}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Nome
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.nome}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Género
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.genero}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Idade
              </label>
              <p className="text-lg font-semibold text-slate-800">{idade}</p>
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-600">
                Cidigo do Aluno
              </label>
              <p className="text-lg font-semibold text-slate-800">{student.codigoAluno}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-slate-600">
                Estado
              </label>
              <span
                className={`px-3 py-1 w-24 rounded-full text-sm font-semibold ${
                  student.estado === "activo" || student.estado === "Activo"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {student.estado}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Nome do encarregado
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.encarregado?.nome || "Não definido"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Parentesco
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.encarregado?.parentesco || "Não definido"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">
                Telefone
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {student.encarregado?.telefone || "Não definido"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoStudents;
