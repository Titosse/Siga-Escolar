import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  VenusAndMars,
} from "lucide-react";
import { teacher as mockTeachers } from "../../../Data/mockData";

function AdicionarTeacher({ onAddTeacher }) {
  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem("teachers");
    return savedTeachers
      ? JSON.parse(savedTeachers)
      : Array.isArray(mockTeachers)
        ? mockTeachers
        : [];
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    genero: "",
    morada: "",
    dataNascimento: "",
    disciplinaIds: [],
    turmaId: "",
    turmaIds: [],
    estado: "activo",
  });

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

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function gerarNovoCodigo(lista) {
    const numero = lista.length + 1;
    return `PROF-2026-${String(numero).padStart(3, "0")}`;
  }

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

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.dataNascimento ||
      !formData.genero ||
      !formData.email.trim() ||
      !formData.telefone.trim() ||
      !formData.morada.trim() ||
      formData.turmaIds.length === 0 ||
      formData.disciplinaIds.length === 0
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoTeacher = {
      id: `tch_${Date.now().toString().slice(-3)}`,
      nome: formData.nome,
      email: formData.email,
      senha: "123456",
      categoria: "Professor",
      avatar: "",
      telefone: formData.telefone,
      genero: formData.genero,
      dataNascimento: formData.dataNascimento,
      morada: formData.morada,
      disciplinaIds: formData.disciplinaIds,
      turmaId: formData.turmaId,
      turmaIds: formData.turmaIds,
      codigoFuncionario: gerarNovoCodigo(teachers),
      estado: formData.estado || "activo",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setTeachers((prev) => [...prev, novoTeacher]);

    if (onAddTeacher) {
      onAddTeacher(novoTeacher);
    }

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      genero: "",
      morada: "",
      dataNascimento: "",
      disciplinaIds: [],
      turmaIds: [],
      estado: "activo",
    });

    alert("Professor adicionado com sucesso.");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h1 className="text-xl font-semibold mb-6">Adicionar novo professor</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Nome do professor</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do professor"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Data de nascimento</label>
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
            <label className="text-sm text-slate-600">Turma Responsavel</label>
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
            <label className="text-sm text-slate-600">Turmas a leccionar</label>
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
                <label key={disciplina.id} className="flex items-center gap-2">
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
          Adicionar Professor
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Professores regitrados: {teachers.length}
        </h2>

        <div className="space-y-2">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{teacher.nome}</h3>
              <p className="text-slate-600">
                {teacher.codigoFuncionario} - {teacher.email} - {""}
                {teacher.turmaId
                    ? `${turmas.find((t) => t.id === teacher.turmaId)?.info.classe} - ${turmas.find((t) => t.id === teacher.turmaId)?.nome}`
                    : "Turma não encontrada"
              }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdicionarTeacher;
