function InfoTeacher({ teacher, onClose }) {
  const idade = teacher.dataNascimento
    ? Math.floor(
        (new Date() - new Date(teacher.dataNascimento)) /
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
          Informações do Professor
        </h2>

        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600">
              ID
            </label>
            <p className="text-lg font-semibold text-slate-800">{teacher.id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Nome
            </label>
            <p className="text-lg  font-semibold text-slate-800">
              {teacher.nome}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Género
            </label>
            <p className="text-lg font-semibold text-slate-800">
              {teacher.genero}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Idade
            </label>
            <p className="text-lg font-semibold text-slate-800">{idade}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-slate-600">
              Estado
            </label>
            <span
              className={`px-3 py-1 w-24 rounded-full text-sm font-semibold ${
                teacher.estado === "activo" || teacher.estado === "Activo"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {teacher.estado}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTeacher;
