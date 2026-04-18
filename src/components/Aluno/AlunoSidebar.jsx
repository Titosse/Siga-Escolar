import { Link, useLocation } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const categoria = searchParams.get("categoria");

  const menu = [
    { name: "Dashboard", path: `/aluno?nome=${nome}&categoria=${categoria}` },
    { name: "Notas", path: `/aluno/grades?nome=${nome}&categoria=${categoria}` },
    { name: "Tarefas", path: `/aluno/tasks?nome=${nome}&categoria=${categoria}` },
    { name: "Presença", path: `/aluno/attendance?nome=${nome}&categoria=${categoria}` },
    { name: "Meu desempenho", path: `/aluno/relatorios?nome=${nome}&categoria=${categoria}` },
    { name: "Perfil", path: `/aluno/perfil?nome=${nome}&categoria=${categoria}` },
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 text-white p-5 hidden md:block">
      <h1 className="text-2xl font-bold mb-8">SIGA Escolar</h1>

      <nav className="space-y-3">
        {menu.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path === "/dashboard" && location.pathname === "/dashboard");

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