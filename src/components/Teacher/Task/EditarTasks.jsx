import { useState } from "react";

function EditarTarefa({ tarefa, onClose, onUpdate }) {
  const [formData, setFormData] = useState(tarefa);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (onUpdate) {
      onUpdate(formData);
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="date"
            name="prazo"
            value={formData.prazo}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="activa">Activa</option>
            <option value="encerrada">Encerrada</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-slate-900 text-white px-5 py-2 rounded-xl"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarTarefa;