import {
  BookOpen,
  CalendarDays,
  FileText,
  Link as LinkIcon,
  Layers3,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function AdicionarConteudo({ onClose, onAddConteudo }) {
  const [formData, setFormData] = useState({
    info: {
      titulo: "",
      descricao: "",
      objectivo: "",
      tipo: "",
      link: "",
      ficheiro: "",
      tags: [],
    },
    relacoes: {
      disciplinaId: "",
      turmaIds: [],
    },
    estado: {
      publicado: true,
      situacao: "Em curso",
    },
    periodo: {
      semana: "",
      periodo: "",
      semestre: "",
      anoLectivo: "",
    },
  });
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];

  const teacher = teachersData.find((tch) => tch.nome === nome);

  const subjectsTeacher = subjectsData.filter((sub) =>
    sub.relacoes?.professores?.includes(teacher?.id),
  );

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,

      info: {
        ...prev.info,
        ficheiro: file,
      },
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };

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
      !formData.info.titulo.trim() ||
      !formData.info.descricao.trim() ||
      !formData.relacoes.disciplinaId
    ) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const novoConteudo = {
      id: `cnt_${Date.now().toString().slice(-5)}`,

      info: {
        titulo: formData.info.titulo,
        descricao: formData.info.descricao,
        objectivo:formData.info.objectivo,
        tipo: formData.info.tipo,
        link: formData.info.link,
        ficheiro: "",
        tags: [],
      },
      relacoes: {
        teacherId: teacher?.id || "",
        disciplinaId: formData.relacoes.disciplinaId,
        turmaIds: teacher?.turmaIds || [],
      },
      estado: {
        publicado: true,
        situacao: formData.estado.situacao || "Pendente",
      },
      periodo: {
        semana: formData.periodo.semana,
        periodo: formData.periodo.periodo,
        semestre: formData.periodo.semestre,
        anoLectivo: formData.periodo.anoLectivo,
      },
      datas: {
        publicadoEm: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    onAddConteudo(novoConteudo);

    onClose();
  }

  return (
    <div className="h-full w-full fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Adicionar Conteúdo
          </h1>

          <p className="text-slate-500 mt-2">
            Publique materiais, apontamentos e recursos para os estudantes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-slate-600">
                Título do Conteúdo
              </label>
              <div className="relative mt-2">
                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="info.titulo"
                  value={formData.info.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Introdução às Frações"
                  className="w-full border border-slate-300 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Disciplina</label>
              <div className="relative mt-2">
                <BookOpen className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <select
                  name="relacoes.disciplinaId"
                  value={formData.relacoes.disciplinaId}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                >
                  <option value="">Selecionar disciplina</option>
                  {subjectsTeacher.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.info.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Tipo de conteúdo</label>

              <select
                name="info.tipo"
                value={formData.info.tipo}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
              >
                <option value="">Selecionar tipo</option>
                <option value="pdf">PDF</option>
                <option value="video">Vídeo</option>
                <option value="documento">Documento</option>
                <option value="imagem">Imagem</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Objectivo do Conteúdo
            </label>
            <textarea
              rows="2"
              name="info.objectivo"
              value={formData.info.objectivo}
              onChange={handleChange}
              placeholder="Explique objectivo..."
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Descrição do Conteúdo
            </label>
            <textarea
              rows="6"
              name="info.descricao"
              value={formData.info.descricao}
              onChange={handleChange}
              placeholder="Explique o conteúdo, orientações ou observações..."
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Link de apoio ou vídeo
            </label>
            <div className="relative mt-2">
              <LinkIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="info.link"
                value={formData.info.link}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full border border-slate-300 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Upload de ficheiro</label>

            <div className="mt-2 border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-400 transition cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-slate-500" />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <h3 className="mt-4 font-semibold text-slate-700">
                Arraste ficheiros aqui
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                PDF, DOCX, PPT ou imagens
              </p>
              <label
                htmlFor="fileUpload"
                className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Seleccionar ficheiro
              </label>
              {formData.info.ficheiro && (
                <p className="mt-3 text-sm text-slate-600">
                  {formData.info.ficheiro.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Publicar Conteúdo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdicionarConteudo;
