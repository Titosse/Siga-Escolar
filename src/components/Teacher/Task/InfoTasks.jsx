import { X, Clock, BookOpen, Users } from "lucide-react";

function VerTarefa({ tarefa, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl w-full max-w-3xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-500 text-white rounded-full hover:bg-red-500"
        >
          <X className="w-4 h-4 mx-auto" />
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {tarefa.titulo}
        </h2>
        <p className="text-slate-500 mb-6">Detalhes completos da tarefa</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-slate-500">Disciplina</p>
            <p className="font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {tarefa.disciplina}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Turma</p>
            <p className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              {tarefa.turma}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Prazo</p>
            <p className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {tarefa.prazo}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Estado</p>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                tarefa.estado === "activa"
                  ? "bg-green-200 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {tarefa.estado}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">Descrição</p>
          <p className="text-slate-700">{tarefa.descricao}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500 mb-1">Progresso</p>
          <p className="text-sm">
            {tarefa.entregas} de {tarefa.total} entregaram
          </p>

          <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${(tarefa.entregas / tarefa.total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerTarefa;
