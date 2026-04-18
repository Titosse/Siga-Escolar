import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  Clock,
  Building,
  HeartHandshake,
} from "lucide-react";
import { useState } from "react";

function EditarStudent({ classe, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: classe.id,
    nome: classe.nome || "",
    classe: classe.info?.classe || "",
    turno: classe.info?.turno || "",
    sala: classe.info?.sala || "",
    estudantes: classe.relacoes?.estudantes?.join(", ") || "",
    professores: classe.relacoes?.professores?.join(", ") || "",
    disciplinas: classe.relacoes?.disciplinas?.join(", ") || "",
    responsavel: classe.responsavel || "",
    anoLectivo: classe.meta?.anoLectivo || "",
    estado: classe.meta?.estado || "",
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

    const updatedClasse = {
      ...classe,
      nome: formData.nome,
      info: {
        classe: formData.classe,
        turno: formData.turno,
        sala: formData.sala,
      },
      relacoes: {
        estudantes: formData.estudantes.split(",").map((e) => e.trim()),
        professores: formData.professores.split(",").map((e) => e.trim()),
        disciplinas: formData.disciplinas.split(",").map((e) => e.trim()),
      },
      responsavel: formData.responsavel,
      meta: {
        anoLectivo: formData.anoLectivo,
        estado: formData.estado,
      },
    };

    onSave(updatedClasse);
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
          Editar informações da turma
        </h1>

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
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarStudent;
