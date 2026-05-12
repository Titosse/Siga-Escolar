import { useState } from "react";
import {
  FileText,
  CalendarDays,
  ClipboardCheck,
  Trophy,
  Link as LinkIcon,
} from "lucide-react";

function EditarTarefa({ tarefa, onClose, onUpdate }) {
  const [formData, setFormData] = useState(tarefa);

  function handleChange(e) {
    const { name, value } = e.target;

    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };

      if (keys.length === 1) {
        updated[keys[0]] = value;
      }

      if (keys.length === 2) {
        updated[keys[0]] = {
          ...updated[keys[0]],
          [keys[1]]: value,
        };
      }

      return updated;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.info?.titulo.trim() ||
      !formData.info?.descricao.trim() ||
      !formData.datas?.prazo.trim()
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const tarefaAtualizada = {
      ...formData,

      info: {
        ...formData.info,

        pontuacao: Number(formData.info?.pontuacao) || 0,
      },

      datas: {
        ...formData.datas,

        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    if (onUpdate) {
      onUpdate(tarefaAtualizada);
    }

    onClose();
  }

  return (
    <div className="fixed h-full inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-6">
          <h2 className="text-2xl font-bold">
            Editar Tarefa
          </h2>

          <p className="text-slate-300 text-sm mt-1">
            Actualize as informações da tarefa
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* TITULO */}
          <div>
            <label className="text-sm text-slate-600">
              Título
            </label>

            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

              <input
                type="text"
                name="info.titulo"
                value={formData.info?.titulo}
                onChange={handleChange}
                placeholder="Título da tarefa"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* DESCRICAO */}
          <div>
            <label className="text-sm text-slate-600">
              Descrição
            </label>

            <textarea
              name="info.descricao"
              value={formData.info?.descricao}
              onChange={handleChange}
              rows="5"
              placeholder="Descrição da tarefa..."
              className="w-full mt-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PRAZO */}
            <div>
              <label className="text-sm text-slate-600">
                Prazo
              </label>

              <div className="relative mt-1">
                <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                <input
                  type="date"
                  name="datas.prazo"
                  value={formData.datas?.prazo}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* ESTADO */}
            <div>
              <label className="text-sm text-slate-600">
                Estado
              </label>

              <div className="relative mt-1">
                <ClipboardCheck className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                <select
                  name="estado.situacao"
                  value={formData.estado?.situacao}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                >
                  <option value="activa">Activa</option>
                  <option value="pendente">Pendente</option>
                  <option value="encerrada">
                    Encerrada
                  </option>
                </select>
              </div>
            </div>

            {/* PRIORIDADE */}
            <div>
              <label className="text-sm text-slate-600">
                Prioridade
              </label>

              <select
                name="info.prioridade"
                value={formData.info?.prioridade}
                onChange={handleChange}
                className="w-full mt-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            {/* PONTUACAO */}
            <div>
              <label className="text-sm text-slate-600">
                Pontuação
              </label>

              <div className="relative mt-1">
                <Trophy className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                <input
                  type="number"
                  min="0"
                  max="100"
                  name="info.pontuacao"
                  value={formData.info?.pontuacao}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* RECURSO */}
          <div>
            <label className="text-sm text-slate-600">
              Link/Recurso
            </label>

            <div className="relative mt-1">
              <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

              <input
                type="text"
                name="info.recurso"
                value={formData.info?.recurso}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Guardar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarTarefa;