import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  HeartHandshake, 
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

function EditarStudent({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: student.id,
    nome: student.nome || "",
    dataNascimento: student.dataNascimento || "",
    genero: student.genero || "",
    email: student.email || "",
    telefone: student.telefone || "",
    morada: student.morada || "",
    turmaId: student.turmaId || "",
    ano: student.ano || "",
    encarregado: {
      nome: student.encarregado?.nome || "",
      telefone: student.encarregado?.telefone || "",
      parentesco: student.encarregado?.parentesco || "",
    },
  });

  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const turmas = classesData.map((cls) => ({
    id: cls.id,
    nome: cls.nome,
    info: cls.info,
  }));

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEncarregadoChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      encarregado: {
        ...prev.encarregado,
        [name]: value,
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedStudent = {
      ...student,
      ...formData,
      encarregado: {
        ...formData.encarregado,
      },
    };

    if (onSave) {
      onSave(updatedStudent);
    }

    console.log("Dados atualizados do estudante:", updatedStudent);
    onClose();
  }

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
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="genero"
                    value="Masculino"
                    checked={formData.genero === "Masculino"}
                    onChange={handleChange}
                  />
                  Masculino
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="genero"
                    value="Feminino"
                    checked={formData.genero === "Feminino"}
                    onChange={handleChange}
                  />
                  Feminino
                </label>
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
              <label className="text-sm text-slate-600">Ano</label>
              <div className="relative mt-1">
                <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Selecionar ano</option>
                <option value="1ª Ano">1ª Ano</option>
                <option value="2ª Ano">2ª Ano</option>
                <option value="3ª Ano">3ª Ano</option>
              </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Turma</label>
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

          <div>
            <h2 className="text-lg font-semibold mb-4">Dados do encarregado</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">
                  Nome do encarregado
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="nome"
                    value={formData.encarregado.nome}
                    onChange={handleEncarregadoChange}
                    placeholder="Nome do encarregado"
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
                    value={formData.encarregado.telefone}
                    onChange={handleEncarregadoChange}
                    placeholder="Telefone"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600">Parentesco</label>
                <div className="relative mt-1">
                  <HeartHandshake className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="parentesco"
                    value={formData.encarregado.parentesco}
                    onChange={handleEncarregadoChange}
                    placeholder="Parentesco"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
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

export default EditarStudent;
