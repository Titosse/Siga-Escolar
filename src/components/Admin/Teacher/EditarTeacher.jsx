import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  VenusAndMars, 
} from "lucide-react";
import { useState } from "react";

function EditarTeacher({ teacher, onClose, onSave }) {
 const [formData, setFormData] = useState({
  id: teacher.id,
  nome: teacher.nome || "",
  dataNascimento: teacher.dataNascimento || "",
  genero: teacher.genero || "",
  email: teacher.email || "",
  telefone: teacher.telefone || "",
  morada: teacher.morada || "",
  disciplinaIds: teacher.disciplinaIds || [],
  turmaId: teacher.turmaId || "",
  turmaIds: teacher.turmaIds || [],
});

  function handleDisciplinaChange(e) {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      disciplinaIds: checked
        ? [...(prev.disciplinaIds || []), value]
        : (prev.disciplinaIds || []).filter((id) => id !== value),
    }));
  }

  function handleTurmaChange(e) {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      turmaIds: checked
        ? [...(prev.turmaIds || []), value]
        : (prev.turmaIds || []).filter((id) => id !== value),
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTeacher = {
      ...teacher,
      ...formData,
    };

    if (onSave) {
      onSave(updatedTeacher);
    }

    console.log("Dados atualizados do professor:", updatedTeacher);
    onClose();
  }

  const subjectsData = JSON.parse(localStorage.getItem("subjects")) || [];
  const disciplinas = subjectsData.map((sub) => ({
    id: sub.id,
    nome: sub.info?.nome || sub.nome || "Sem nome",
  }));

  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const turmas = classesData.map((cls) => ({
    id: cls.id,
    nome: cls.nome,
    info: cls.info,
  }));

  return (
    <div className="w-full fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full absolute top-4 right-4 text-white bg-slate-500 hover:bg-red-500"
        >
          X
        </button>

        <h1 className="text-xl font-semibold mb-6">
          Editar informações do estudante
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600">
                Nome do estudante
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome do estudante"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Data de nascimento
              </label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Género</label>
              <div className="relative mt-1">
                <VenusAndMars className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <option value="">Selecionar género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Telefone</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Morada</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="morada"
                  value={formData.morada}
                  onChange={handleChange}
                  placeholder="Morada"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Turma Responsavel
              </label>
              <div className="relative mt-1">
                <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  name="turmaId"
                  value={formData.turmaId}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <option value="">Selecionar turma</option>
                  {turmas.map((turma) => (
                    <option key={turma.id} value={turma.id}>
                      {turma.info.classe}-{turma.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600">
                Turmas a leccionar
              </label>
              <div className="mt-2 space-y-2">
                {turmas.map((turma) => (
                  <label key={turma.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={turma.id}
                      checked={formData.turmaIds.includes(turma.id)}
                      onChange={handleTurmaChange}
                    />
                    {turma.info?.classe || "Sem classe"} - {turma.nome}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Disciplina(s)</label>
              <div className="mt-2 space-y-2">
                {disciplinas.map((disciplina) => (
                  <label
                    key={disciplina.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={disciplina.id}
                      checked={formData.disciplinaIds.includes(disciplina.id)}
                      onChange={handleDisciplinaChange}
                    />
                    {disciplina.nome}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarTeacher;
