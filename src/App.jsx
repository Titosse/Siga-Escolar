import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardHome from "./pages/Adim/DashboardHome";
import Students from "./pages/Adim/Students";
import Teachers from "./pages/Adim/Teachers";
import Classes from "./pages/Adim/Classes";
import Grades from "./pages/Adim/Grades";
import Reports from "./pages/Adim/Reports";
import Settings from "./pages/Adim/Settings";
import DashboardLayout from "./layouts/AdminLayout";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherGrades from "./pages/Teacher/TeacherGrades";
import TeacherTasks from "./pages/Teacher/TeacherTasks";
import TeacherAttendance from "./pages/Teacher/TeacherAttendace";
import TeacherRelatorio from "./pages/Teacher/TeacherRelatorios";
import AlunoLayout from "./layouts/AlunoLayout";
import AlunoDashboard from "./pages/Aluno/AlunoDashboard";
import AlunoGrades from "./pages/Aluno/AlunoGrades";
import AlunoTasks from "./pages/Aluno/AlunoTasks";
import AlunoAttendance from "./pages/Aluno/AlunoAttendance";
import AlunoRelatorios from "./pages/Aluno/AlunoRelatorios";
import Perfil from "./pages/Aluno/Perfile";
import Conta from "./components/Admin/Conta";
import DadosDaEscola from "./components/Admin/DadosDaEscola";
import Subjects from "./pages/Adim/Subject";
import SubjectTeacher from "./pages/Teacher/Conteudos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/aluno" element={<AlunoLayout />}>
          <Route index element={<AlunoDashboard />} />
          <Route path="grades" element={<AlunoGrades />} />
          <Route path="tasks" element={<AlunoTasks />} />
          <Route path="attendance" element={<AlunoAttendance />} />
          <Route path="relatorios" element={<AlunoRelatorios />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="grades" element={<TeacherGrades />} />
          <Route path="tasks" element={<TeacherTasks />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="relatorios" element={<TeacherRelatorio />} />
          <Route path="subject" element={<SubjectTeacher />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="classes" element={<Classes />} />
          <Route path="grades" element={<Grades />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />}>
          <Route index element={<DadosDaEscola/>}/>
            <Route path="conta" element={<Conta />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
