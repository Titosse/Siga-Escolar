import { Users, GraduationCap, TrendingUp, CalendarDays } from "lucide-react";
import PerformanceChart from "../../components/Admin/PerfomanceChart";

function DashboardHome() {
  const clasesData = JSON.parse(localStorage.getItem("classes"));
  const studentsData = JSON.parse(localStorage.getItem("students"));
  const teachersData = JSON.parse(localStorage.getItem("teachers"));
  
  const studentCount = studentsData.length;
  const teacherCount = teachersData.length;

  const classesAtivas = clasesData.filter((cls) => cls.meta?.estado === "Activa" || cls.meta?.estado === "activa");
  const classesAtivasCount = classesAtivas.length;
 


  const stats = [
    {
      title: "Estudantes",
      value: studentCount,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Professores",
      value: teacherCount,
      icon: GraduationCap,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Assiduidade",
      value: "94.5%",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Turmas Ativas",
      value: classesAtivasCount,
      icon: CalendarDays,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const activities = [
    "Novo estudante registado na 8ª classe",
    "Professor António lançou notas de Matemática",
    "Reunião pedagógica marcada para amanhã",
    "3 pagamentos pendentes no sistema",
  ];

  return (
    <div className="max-h-full bg-gray-100 flex">
      <main className="flex-1 p-3 pt-6">
        <header className=" p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500">
              Bem-vindo ao sistema de gestão académica
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 mt-2">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm flex items-start justify-between"
            >
              <div>
                <p className="text-slate-500 text-sm">{item.title}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  {item.value}
                </h3>
              </div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.iconBg}`}
              >
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
            <PerformanceChart />
          </div>
        </section>

        <section className="grid grid-cols-2 xl:grid-cols-1 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Actividades Recentes
            </h3>

            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardHome;
