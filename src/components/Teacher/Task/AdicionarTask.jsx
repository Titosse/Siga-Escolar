import { useState } from "react";
import {
  FileText,
  BookOpen,
  Users,
  CalendarDays,
  Link as LinkIcon,
  ClipboardCheck,
  Trophy, 
} from "lucide-react";

function AdicionarTarefa({ onClose, onAddTask }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    turma: "",
    disciplina: "",
    prazo: "",
    estado: "activa",
    recurso: "",
    pontuacao: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.titulo.trim() ||
      !formData.descricao.trim() ||
      !formData.turma.trim() ||
      !formData.disciplina.trim() ||
      !formData.prazo.trim() ||
      !formData.pontuacao.trim()
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novaTarefa = {
      id: `tsk_${Date.now().toString().slice(-3)}`,
      titulo: formData.titulo,
      descricao: formData.descricao,
      turma: formData.turma,
      disciplina: formData.disciplina,
      prazo: formData.prazo,
      estado: formData.estado,
      recurso: formData.recurso,
      pontuacao: Number(formData.pontuacao),
      entregas: 0,
      total: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    if (onAddTask) {
      onAddTask(novaTarefa);
    }

    setFormData({
      titulo: "",
      descricao: "",
      turma: "",
      disciplina: "",
      prazo: "",
      estado: "activa",
      recurso: "",
      pontuacao: "",
    });

    if (onClose) {
      onClose();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Adicionar Nova Tarefa
      </h1>
      <p className="text-slate-500 mb-6">
        Preencha os dados da tarefa para disponibilizar aos estudantes
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Título da tarefa</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex: Ficha de Matemática"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Disciplina</label>
            <div className="relative mt-1">
              <BookOpen className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="disciplina"
                value={formData.disciplina}
                onChange={handleChange}
                placeholder="Ex: Matemática"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Turma</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="turma"
                value={formData.turma}
                onChange={handleChange}
                placeholder="Ex: 8ª A"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Prazo de entrega</label>
            <div className="relative mt-1">
              <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="date"
                name="prazo"
                value={formData.prazo}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Estado</label>
            <div className="relative mt-1">
              <ClipboardCheck className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400 appearance-none bg-white"
              >
                <option value="activa">Activa</option>
                <option value="encerrada">Encerrada</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Pontuação máxima</label>
            <div className="relative mt-1">
              <Trophy className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="number"
                name="pontuacao"
                value={formData.pontuacao}
                onChange={handleChange}
                placeholder="Ex: 20"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-600">Descrição da tarefa</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva os detalhes da tarefa..."
            rows="5"
            className="w-full mt-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">
            Link ou recurso de apoio
          </label>
          <div className="relative mt-1">
            <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="recurso"
              value={formData.recurso}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Guardar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarTarefa;
