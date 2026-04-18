import { useState } from "react";
import { Link, useLocation, useSearchParams, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const categoria = searchParams.get("categoria");

  const menu = [
    {
      name: "Dados da escola",
      path: `/admin/settings?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Conta",
      path: `/admin/settings/conta?nome=${nome}&categoria=${categoria}`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Configurações do Sistema
            </h1>
            <p className="text-slate-500">
              Gerir preferências, dados da escola e opções gerais do SIGA
            </p>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition">
            Guardar Alterações
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 h-fit">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Secções
            </h2>
            <nav className="space-y-3">
        {menu.map((item) => {
          const active = location.pathname === item.path.split("?")[0];

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.2 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Notificações
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">
                  <div>
                    <h3 className="font-medium text-slate-800">
                      Activar notificações
                    </h3>
                    <p className="text-sm text-slate-500">
                      Receber alertas sobre actividades e actualizações do
                      sistema
                    </p>
                  </div>

                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-14 h-8 rounded-full flex items-center px-1 transition ${
                      notifications ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                        notifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Backup e Segurança
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">
                  <div>
                    <h3 className="font-medium text-slate-800">
                      Backup automático
                    </h3>
                    <p className="text-sm text-slate-500">
                      Guardar cópias automáticas dos dados do sistema
                    </p>
                  </div>

                  <button
                    onClick={() => setAutoBackup(!autoBackup)}
                    className={`w-14 h-8 rounded-full flex items-center px-1 transition ${
                      autoBackup ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                        autoBackup ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>

                <button className="px-5 py-3 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
                  Alterar Palavra-passe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
