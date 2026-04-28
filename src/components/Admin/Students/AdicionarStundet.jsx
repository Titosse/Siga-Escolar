import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  HeartHandshake,
  GraduationCap,
  VenusAndMars,
} from "lucide-react";
import { students as mockStudents } from "../../../Data/mockData";

function AdicionarTeacher() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : mockStudents;
  });

  const [formData, setFormData] = useState({
    id: ``,
    nome: "",
    email: "",
    senha: "123456",
    categoria: "Estudante",
    avatar: "",
    telefone: "",
    genero: "",
    dataNascimento: "",
    morada: "",
    codigoAluno: "",
    ano: "",
    turmaId: "",
    encarregado: {
      nome: "",
      telefone: "",
      parentesco: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const classesData = JSON.parse(localStorage.getItem("classes")) || [];
  const turmas = classesData.map((cls) => ({
    id: cls.id,
    nome: cls.nome,
    info: cls.info,
  }));

  function gerarNovoCodigo(lista) {
    const numero = lista.length + 1;
    return `ALN-2026-${String(numero).padStart(3, "0")}`;
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
      !formData.turmaId.trim() ||
      !formData.ano.trim() ||
      !formData.encarregado.nome.trim() ||
      !formData.encarregado.telefone.trim() ||
      !formData.encarregado.parentesco.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoEstudante = {
      id: `std_${Date.now().toString().slice(-3)}`,
      nome: formData.nome,
      email: formData.email,
      senha: "123456",
      categoria: "Estudante",
      avatar: "",
      telefone: formData.telefone,
      genero: formData.genero,
      dataNascimento: formData.dataNascimento,
      morada: formData.morada,
      codigoAluno: gerarNovoCodigo(students),
      turmaId: formData.turmaId,
      ano: formData.ano,
      encarregado: {
        nome: formData.encarregado.nome,
        telefone: formData.encarregado.telefone,
        parentesco: formData.encarregado.parentesco,
      },
      estado: "activo",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setStudents((prev) => [...prev, novoEstudante]);

    setFormData({
      nome: "",
      dataNascimento: "",
      genero: "",
      email: "",
      telefone: "",
      morada: "",
      turmaId: "",
      ano: "",
      encarregado: {
        nome: "",
        telefone: "",
        parentesco: "",
      },
    });

    alert("Estudante adicionado com sucesso.");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h1 className="text-xl font-semibold mb-6">Adicionar novo estudante</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Nome do estudante</label>
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
                  name="nomeEncarregado"
                  value={formData.nomeEncarregado}
                  onChange={handleChange}
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
                  name="telefoneEncarregado"
                  value={formData.telefoneEncarregado}
                  onChange={handleChange}
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
                  value={formData.parentesco}
                  onChange={handleChange}
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
          Adicionar Estudante
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Estudantes registados: {students.length}
        </h2>

        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student.id}
              className="border border-slate-200 rounded-xl p-3"
            >
              <p className="font-medium">{student.nome}</p>
              <p className="text-sm text-slate-500">
                {student.codigoAluno} • {student.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdicionarTeacher;
