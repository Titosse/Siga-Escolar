import {
  BookOpen,
  Hash,
  User,
  CalendarDays,
  Layers,
  FileText,
  Save,
  X,
  Users,
} from "lucide-react";
import { useState } from "react";

function EditSubjects({ subject, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: subject.id,

    nome: subject.info?.nome || "",
    codigo: subject.info?.codigo || "",
    cargaHoraria: subject.info?.cargaHoraria || "",

    classe: subject.info?.classe || "",
    area: subject.info?.area || "",
    semestre: subject.info?.semestre || "",
    anoLectivo: subject.info?.anoLectivo || "",
    descricao: subject.info?.descricao || "",

    professores: subject.relacoes?.professores || [],
    turmas: subject.relacoes?.turmas || [],

    estado: subject.meta?.estado || "activo",
    createdAt: subject.meta?.createdAt || "",
  });

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
  const classesData = JSON.parse(localStorage.getItem("classes")) || [];

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleProfessorChange(e) {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      professores: checked
        ? [...prev.professores, value]
        : prev.professores.filter((id) => id !== value),
    }));
  }

  function handleTurmaChange(e) {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      turmas: checked
        ? [...prev.turmas, value]
        : prev.turmas.filter((id) => id !== value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedSubject = {
      ...subject,

      id: formData.id,

      info: {
        nome: formData.nome.trim(),
        codigo: formData.codigo.trim(),
        cargaHoraria: Number(formData.cargaHoraria),

        classe: formData.classe,
        area: formData.area,
        semestre: formData.semestre,
        anoLectivo: formData.anoLectivo,
        descricao: formData.descricao,
      },

      relacoes: {
        professores: formData.professores,
        turmas: formData.turmas,
      },

      meta: {
        estado: formData.estado,
        createdAt: formData.createdAt || subject.meta?.createdAt,
        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    onSave?.(updatedSubject);
    onClose?.();
  }

  return (
    <div className="h-full w-full fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          X
        </button>

        <h1 className="text-xl font-semibold mb-6">
          Editar informações da disciplina
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputIcon
              label="Nome da disciplina"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Matemática"
              icon={<BookOpen />}
            />

            <InputIcon
              label="Código da disciplina"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ex: MAT-07"
              icon={<Hash />}
            />

            <SelectIcon
              label="Classe"
              name="classe"
              value={formData.classe}
              onChange={handleChange}
              icon={<Layers />}
              options={[
                { id: "1ª Ano", nome: "1ª Ano" },
                { id: "2ª Ano", nome: "2ª Ano" },
                { id: "3ª Ano", nome: "3ª Ano" },
              ]}
            />

            <SelectIcon
              label="Semestre"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              icon={<CalendarDays />}
              options={[
                { id: "1º semestre", nome: "1º semestre" },
                { id: "2º semestre", nome: "2º semestre" },
                { id: "anual", nome: "Anual" },
              ]}
            />

            <InputIcon
              label="Carga horária semanal"
              name="cargaHoraria"
              value={formData.cargaHoraria}
              onChange={handleChange}
              placeholder="Ex: 5"
              icon={<CalendarDays />}
            />

            <InputIcon
              label="Ano lectivo"
              name="anoLectivo"
              value={formData.anoLectivo}
              onChange={handleChange}
              placeholder="Ex: 2026"
              icon={<CalendarDays />}
            />

            <InputIcon
              label="Área curricular"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Ex: Ciências exactas"
              icon={<Layers />}
            />

            <SelectIcon
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              icon={<FileText />}
              options={[
                { id: "activo", nome: "Activo" },
                { id: "pendente", nome: "Pendente" },
                { id: "inactivo", nome: "Inactivo" },
              ]}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Descrição</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <textarea
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Escreva uma breve descrição da disciplina..."
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none resize-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-600">
                Professores da disciplina
              </label>

              <div className="mt-2 space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                {teachersData.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhum professor cadastrado.
                  </p>
                )}

                {teachersData.map((teacher) => (
                  <label key={teacher.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={teacher.id}
                      checked={formData.professores.includes(teacher.id)}
                      onChange={handleProfessorChange}
                    />
                    <User className="w-4 h-4 text-slate-400" />
                    {teacher.nome}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Turmas da disciplina
              </label>

              <div className="mt-2 space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                {classesData.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhuma turma cadastrada.
                  </p>
                )}

                {classesData.map((turma) => (
                  <label key={turma.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={turma.id}
                      checked={formData.turmas.includes(turma.id)}
                      onChange={handleTurmaChange}
                    />
                    <Users className="w-4 h-4 text-slate-400" />
                    {turma.info?.classe || "Sem classe"} -{" "}
                    {turma.nome || turma.info?.nome || "Sem nome"}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              <Save className="w-4 h-4" />
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputIcon({ label, name, placeholder, icon, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>

      <div className="relative mt-1">
        <div className="absolute left-3 top-3 w-5 h-5 text-slate-400">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>
    </div>
  );
}

function SelectIcon({ label, name, icon, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>

      <div className="relative mt-1">
        <div className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none">
          {icon}
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
        >
          <option value="">Selecionar</option>

          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EditSubjects;