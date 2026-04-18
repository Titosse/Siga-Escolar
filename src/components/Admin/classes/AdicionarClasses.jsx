import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  Clock,
  Building,
} from "lucide-react";
import { classes as mockClasses } from "../../../Data/mockData";

function AdicionarClasses() {
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem("classes");
    return savedClasses ? JSON.parse(savedClasses) : mockClasses;
  });

  const [formData, setFormData] = useState({
    nome: "",
    classe: "",
    turno: "",
    sala: "",
    estudantes: "",
    professores: "",
    disciplinas: "",
    responsavel: "",
    anoLectivo: "",
    estado: "",
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.classe.trim() ||
      !formData.turno.trim() ||
      !formData.sala.trim() ||
      !formData.estudantes.trim() ||
      !formData.professores.trim() ||
      !formData.disciplinas.trim() ||
      !formData.responsavel.trim() ||
      !formData.anoLectivo.trim() ||
      !formData.estado.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novaTurma = {
      id: `cls_${Date.now().toString().slice(0,3)}`,
      nome: formData.nome,
      info: {
        classe: formData.classe,
        turno: formData.turno,
        sala: formData.sala,
      },
      relacoes: {
        estudantes: formData.estudantes
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
        professores: formData.professores
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
        disciplinas: formData.disciplinas
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
      },
      responsavel: formData.responsavel,
      meta: {
        anoLectivo: formData.anoLectivo,
        estado: formData.estado,
      },
    };

    setClasses((prev) => [...prev, novaTurma]);

    setFormData({
      nome: "",
      classe: "",
      turno: "",
      sala: "",
      estudantes: "",
      professores: "",
      disciplinas: "",
      responsavel: "",
      anoLectivo: "",
      estado: "",
    });

    alert("Turma adicionada com sucesso.");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h1 className="text-xl font-semibold mb-6">Adicionar nova turma</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Nome da turma</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome da turma"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Classe</label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="classe"
                value={formData.classe}
                onChange={handleChange}
                placeholder="Classe"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Turno</label>
            <div className="relative mt-1">
              <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="turno"
                value={formData.turno}
                onChange={handleChange}
                placeholder="Turno"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Sala</label>
            <div className="relative mt-1">
              <Building className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="sala"
                value={formData.sala}
                onChange={handleChange}
                placeholder="Sala"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Estudantes</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="estudantes"
                value={formData.estudantes}
                onChange={handleChange}
                placeholder="std_001, std_002"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Professores</label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="professores"
                value={formData.professores}
                onChange={handleChange}
                placeholder="tch_001, tch_002"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Disciplinas</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="disciplinas"
                value={formData.disciplinas}
                onChange={handleChange}
                placeholder="sub_001, sub_002"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Responsável</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                placeholder="tch_001"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Ano lectivo</label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="anoLectivo"
                value={formData.anoLectivo}
                onChange={handleChange}
                placeholder="2026"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600">Estado</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="activa"
                className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          Adicionar Turma
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Turmas registadas: {classes.length}
        </h2>

        <div className="space-y-2">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="border border-slate-200 rounded-xl p-3"
            >
              <p className="font-medium">{cls.nome}</p>
              <p className="text-sm text-slate-500">
                {cls.info?.classe} • {cls.info?.sala} • {cls.info?.turno}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdicionarClasses;
