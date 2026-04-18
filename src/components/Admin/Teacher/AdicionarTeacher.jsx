import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  HeartHandshake,
} from "lucide-react";
import { teacher as mockTeachers } from "../../../Data/mockData";

function AdicionarTeacher() {
  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem("teachers");
    return savedTeachers ? JSON.parse(savedTeachers) : mockTeachers;
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    genero: "",
    dataNascimento: "",
    morada: "",
    disciplinaIds: [""],
    turmaIds: [""]
  });

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

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.dataNascimento ||
      !formData.genero ||
      !formData.email.trim() ||
      !formData.telefone.trim() ||
      !formData.morada.trim() ||
      !formData.turmaId.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoTeacher = {
      id: `tch_${Date.now()}`,
      nome: formData.nome,
      email: formData.email,
      senha: "123456",
      categoria: "Professor",
      avatar: "",
      telefone: formData.telefone,
      genero: formData.genero,
      dataNascimento: formData.dataNascimento,
      morada: formData.morada,
      disciplinaIds: formData.disciplinaIds || [],
      turmaId: formData.turmaId,
      codigoFuncionario: gerarNovoCodigo(teachers),
      estado: formData.estado || "Activo",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setTeachers((prev) => [...prev, novoTeacher]);

    setFormData({
      nome: "",
      dataNascimento: "",
      genero: "",
      email: "",
      telefone: "",
      morada: "",
      turmaId: "",
      nomeEncarregado: "",
      telefoneEncarregado: "",
      parentesco: "",
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
            <label className="text-sm text-slate-600">Turma</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="turmaId"
                value={formData.turmaId}
                onChange={handleChange}
                placeholder="Ex: cls_001"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
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
          Professores registados: {teachers.length}
        </h2>

        <div className="space-y-2">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border border-slate-200 rounded-xl p-3"
            >
              <p className="font-medium">{teacher.nome}</p>
              <p className="text-sm text-slate-500">
                {teacher.codigoFuncionario} • {teacher.email} •{" "}
                {teacher.telefone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdicionarTeacher;
