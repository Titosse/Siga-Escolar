import { Link, useLocation, useSearchParams } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const nome = searchParams.get("nome") || "";
  const categoria = searchParams.get("categoria") || "";

  const menu = [
    { name: "Dashboard", path: `/admin?nome=${nome}&categoria=${categoria}` },
    {
      name: "Estudantes",
      path: `/admin/students?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Professores",
      path: `/admin/teachers?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Turmas",
      path: `/admin/classes?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Notas",
      path: `/admin/grades?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Relatórios",
      path: `/admin/reports?nome=${nome}&categoria=${categoria}`,
    },
    {
      name: "Configurações",
      path: `/admin/settings?nome=${nome}&categoria=${categoria}`,
    },
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 text-white p-5 hidden md:block">
      <h1 className="text-2xl font-bold mb-8">SIGA Escolar</h1>

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
    </aside>
  );
}

export default Sidebar;