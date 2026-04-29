import {
  BookOpen,
  Hash,
  User,
  CalendarDays,
  Layers,
  FileText,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

function AddDisciplina({ onClose, onAddSubject }) {
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    classe: "",
    area: "",
    semestre: "",
    anoLectivo: "",
    cargaHorariaSemanal: "",
    professorId: "",
    turmaIds: "",
    descricao: "",
    estado: "activo",
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
      !formData.nome.trim() ||
      !formData.codigo.trim() ||
      !formData.classe ||
      !formData.area ||
      !formData.semestre ||
      !formData.anoLectivo ||
      !formData.cargaHorariaSemanal ||
      !formData.professorId
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const novaDisciplina = {
      id: `sub_${Date.now().toString().slice(-5)}`,

      info: {
        nome: formData.nome.trim(),
        codigo: formData.codigo.trim(),
        cargaHoraria: Number(formData.cargaHorariaSemanal),

        classe: formData.classe,
        area: formData.area,

        semestre: formData.semestre,
        anoLectivo: formData.anoLectivo,

        descricao: formData.descricao || "",
      },

      relacoes: {
        professores: [formData.professorId],

        turmas: formData.turmaIds
          ? formData.turmaIds.split(",").map((s) => s.trim())
          : [],
      },

      meta: {
        estado: formData.estado || "activo",
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      },
    };

    onAddSubject?.(novaDisciplina);

    setFormData({
      nome: "",
      codigo: "",
      classe: "",
      area: "",
      semestre: "",
      anoLectivo: "",
      cargaHorariaSemanal: "",
      professorId: "",
      turmaIds: "",
      descricao: "",
      estado: "activo",
    });

    onClose?.();
  }

  const teachersData = JSON.parse(localStorage.getItem("teachers")) || [];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Adicionar disciplina
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Preencha os dados da disciplina que será usada nas turmas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Informações da disciplina
            </h2>

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

              <div>
                <label className="text-sm text-slate-600">Classe</label>

                <div className="relative mt-1">
                  <div className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none">
                    <Layers />
                  </div>

                  <select
                    name="classe"
                    value={formData.classe}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                  >
                    <option value="">Selecionar</option>
                    <option value="1ª Ano"> 1ª Ano</option>
                    <option value="2ª Ano"> 2ª Ano</option>
                    <option value="3ª Ano"> 3ª Ano</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600">Semestre</label>

                <div className="relative mt-1">
                  <div className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none">
                    <Layers />
                  </div>

                  <select
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                  >
                    <option value="">Selecionar</option>
                    <option value="1º semestre"> 1º semestre</option>
                    <option value="2º semestre"> 2º semestre</option>
                    <option value="anual"> Anual</option>
                  </select>
                </div>
              </div>

              <SelectIcon
                label="Professor responsável"
                name="professorId"
                value={formData.professorId}
                onChange={handleChange}
                icon={<User />}
                options={teachersData.map((teacher) => ({
                  id: teacher.id,
                  nome: teacher.nome,
                }))}
              />

            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Descrição</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <textarea
                name="descricao"
                rows="4"
                placeholder="Escreva uma breve descrição da disciplina..."
                value={formData.descricao}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none resize-none focus:ring-2 focus:ring-slate-400"
              ></textarea>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Dados complementares
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputIcon
                label="Carga horária semanal"
                name="cargaHorariaSemanal"
                placeholder="Ex: 5 horas"
                icon={<CalendarDays />}
                value={formData.cargaHorariaSemanal}
                onChange={handleChange}
              />

              <InputIcon
                label="Ano lectivo"
                name="anoLectivo"
                placeholder="Ex: 2026"
                icon={<CalendarDays />}
                value={formData.anoLectivo}
                onChange={handleChange}
              />

              <InputIcon
                label="Área curricular"
                name="area"
                placeholder="Ex: Ciências exactas"
                icon={<Layers />}
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
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
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
            >
              <Save className="w-4 h-4" />
              Guardar disciplina
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
export default AddDisciplina;
