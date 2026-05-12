import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Users,
  CalendarDays,
  Link as LinkIcon,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

function generateUniqueId() {
  return `tsk_${Date.now().toString().slice(-5)}`;
}
 
function AdicionarTarefa({ onClose, onAddTask }) {
  const [formData, setFormData] = useState({
    id: "",
    info: {
      titulo: "",
      descricao: "",
      recurso: "",
      prioridade: "",
      pontuacao: "",
    },
    relacoes: {
      teacherId: "",
      turmaId: [],
      disciplinaId: "",
    },
    periodo: "",
    estado: {
      completed: false,
      situacao: "",
    },
    datas: {
      prazo: "",
      createdAt: "",
      updatedAt: "",
    },
  });

  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];

  const teacher = teachersData.find((tch) => tch.nome === nome);

  const classesTeacher = classesData.filter((cls) =>
    teacher?.turmaIds?.includes(cls.id),
  );

  const subjectsTeacher = subjectsData.filter((sub) =>
    sub.relacoes?.professores?.includes(teacher?.id),
  );

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

  function handleTurmaChange(e) {
  const { value, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    relacoes: {
      ...prev.relacoes,
      turmaId: checked
        ? [...prev.relacoes.turmaId, value]
        : prev.relacoes.turmaId.filter((id) => id !== value),
    },
  }));
}

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.info.titulo.trim() ||
      !formData.info.descricao.trim() ||
      formData.relacoes.turmaId.length === 0||
      !formData.relacoes.disciplinaId.trim() ||
      !formData.datas.prazo.trim() ||
      !formData.info.pontuacao
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novaTarefa = {
      id: generateUniqueId(),

      info: {
        titulo: formData.info.titulo.trim(),
        descricao: formData.info.descricao.trim(),
        recurso: formData.info.recurso,
        prioridade: formData.info.prioridade || "media",
        pontuacao: Number(formData.info.pontuacao) || 0,
      },
      relacoes: {
        teacherId: teacher?.id || "",
        turmaId: formData.relacoes.turmaId || [],
        disciplinaId: formData.relacoes.disciplinaId,
      },
      periodo: formData.periodo || "",
      estado: {
        completed: false,
        situacao: formData.estado.situacao || "pendente",
      },
      datas: {
        prazo: formData.datas.prazo,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    if (onAddTask) {
      onAddTask(novaTarefa);
    }

    setFormData({
      id: "",

      info: {
        titulo: "",
        descricao: "",
        recurso: "",
        prioridade: "",
        pontuacao: "",
      },

      relacoes: {
        teacherId: "",
        turmaId: [],
        disciplinaId: "",
      },

      periodo: "",

      estado: {
        completed: false,
        situacao: "",
      },

      datas: {
        prazo: "",
        createdAt: "",
        updatedAt: "",
      },
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
                name="info.titulo"
                value={formData.info.titulo}
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
              <select
                name="relacoes.disciplinaId"
                value={formData.relacoes.disciplinaId}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Selecionar</option>
                {subjectsTeacher.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.info?.nome || item.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Prazo de entrega</label>
            <div className="relative mt-1">
              <CalendarDays className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="date"
                name="datas.prazo"
                value={formData.datas.prazo}
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
                name="estado.situacao"
                value={formData.estado.situacao}
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
                name="info.pontuacao"
                value={formData.info.pontuacao}
                onChange={handleChange}
                placeholder="Ex: 20"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Prioridade da Tarefa
            </label>
            <div className="relative mt-1">
              <select
                name="info.prioridade"
                value={formData.info.prioridade}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Selecionar</option>
                <option value="baixa">Baixa</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Turma</label>
            <div className="relative mt-1">
              {classesTeacher.map((cls) => (
                <label key={cls.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cls.id}
                    checked={formData.relacoes.turmaId.includes(cls.id)}
                    onChange={handleTurmaChange}
                  />
                  {cls.info?.classe || "Sem classe"} - {cls.nome}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-600">Descrição da tarefa</label>
          <textarea
            name="info.descricao"
            value={formData.info.descricao}
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
              name="info.recurso"
              value={formData.info.recurso}
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
