import {
  CalendarDays,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import AdicionarConteudo from "../../components/Teacher/Conteudo/AddConteudo";

function ConteudosSemestre() {

  const [openModal, setOpenModal] = useState(false);
  const [conteudos, setAddConteudo] = useState(() => {
    const savedConteudo = localStorage.getItem("conteudos");

    return savedConteudo ? JSON.parse(savedConteudo) : [];
  });

  useEffect(() => {
    localStorage.setItem("conteudos", JSON.stringify(conteudos));
  }, [conteudos]);

  const total = conteudos.length;
  const leccionados = conteudos.filter(
    (item) => item.estado.situacao === "Leccionado",
  ).length;
  const pendentes = conteudos.filter(
    (item) => item.estado.situacao === "Pendente",
  ).length;
  const emCurso = conteudos.filter((item) => item.estado.situacao === "Em curso").length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-sm text-slate-800">Plano semestral de conteúdos</h1>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition"
        >
          <Plus className="w-4 h-4" />
          Adicionar conteúdo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Total de conteúdos"
          valor={total}
          icon={<BookOpen />}
        />

        <ResumoCard
          titulo="Leccionados"
          valor={leccionados}
          icon={<CheckCircle />}
        />

        <ResumoCard titulo="Em curso" valor={emCurso} icon={<Clock />} />

        <ResumoCard
          titulo="Pendentes"
          valor={pendentes}
          icon={<AlertCircle />}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <CalendarDays className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Conteúdos por semana
            </h2>
            <p className="text-sm text-slate-500">
              Organização dos temas a leccionar durante o semestre
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {conteudos.map((conteudo) => (
            <div
              key={conteudo.id}
              className="border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {conteudo.periodo.semana}
                    </span>

                    <span className="text-xs text-slate-500">
                      {conteudo.periodo.periodo}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-800">
                    Titulo: {conteudo.info.titulo}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Objectivo: {conteudo.info.objectivo}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
                    conteudo.estado.situacao === "Leccionado"
                      ? "bg-green-100 text-green-700"
                      : conteudo.estado.situacao === "Em curso"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                 {conteudo.estado.situacao}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <AdicionarConteudo
            onClose={() => setOpenModal(false)}
            onAddConteudo={(novoConteudo) => {
              setAddConteudo((prev) => [...prev, novoConteudo]);
            }}
          />
        </div>
      )}
    </div>
  );
}

function ResumoCard({ titulo, valor, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{titulo}</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">{valor}</h2>
      </div>

      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

export default ConteudosSemestre;
