import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import Sidebar from "../components/Admin/Sidebar";
import { LogOut } from "lucide-react";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const categoria = searchParams.get("categoria");

  function onLogOut() {
    navigate(`/`);
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="w-64 hidden md:block">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className=" bg-transparent border-b border-slate-200 shadow-lg px-6 py-4 flex items-center justify-between">
          <div className="flex-1 relative max-w-md ">
            <Search className="text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
            <input
              type="text"
              placeholder="       pesquisar..."
              className=" w-96 bg-slate-200 rounded-xl px-4 py-2 outline-none"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-300"> </div>
            <div className="flex flex-row gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">{nome}</h3>
                <p className="text-sm text-slate-500">{categoria}</p>
              </div>
              <div>
                <button
                  onClick={onLogOut}
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-slate-900 text-white hover:bg-red-500 transition"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className=" flex-1 overflow-y-auto ">
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
      </main>
    </div>
  );
}

export default DashboardLayout;
