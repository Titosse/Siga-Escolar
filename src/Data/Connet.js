import {
  teacher,
  students,
  classes,
  subjects,
  grades,
  attendances,
  tasks,
  taskSubmissions,
} from "./mockData";

//Professor → Turma
// Verificar se o professor leciona a turma
teacher.turmaIds.includes(classes.id)
  ? console.log("O professor leciona esta turma.")
  : console.log("O professor não leciona esta turma.");

//Turma → Professor
// Verificar se a turma tem um professor atribuído
classes.relacoes.professores.includes(teacher.id)
  ? console.log("A turma tem um professor atribuído.")
  : console.log("A turma não tem um professor atribuído.");

//Professor → Disciplina
// Verificar se o professor leciona a disciplina
teacher.disciplinaIds.includes(subjects.id)
  ? console.log("O professor leciona esta disciplina.")
  : console.log("O professor não leciona esta disciplina.");

//Disciplina → Professor
// Verificar se a disciplina tem um professor atribuído
subjects.relacoes.professores.includes(teacher.id)
  ? console.log("A disciplina tem um professor atribuído.")
  : console.log("A disciplina não tem um professor atribuído.");

//Aluno → Turma
// Verificar se o aluno pertence à turma
students.turmaId === classes.id
  ? console.log("O aluno pertence a esta turma.")
  : console.log("O aluno não pertence a esta turma.");

//Turma → Aluno
// Verificar se a turma tem alunos matriculados
students.filter((student) => student.turmaId === classes.id);

//Turma → Disciplina
// Verificar se a turma tem disciplinas associadas
classes.relacoes.disciplinas.includes(subjects.id)
  ? console.log("A turma tem esta disciplina associada.")
  : console.log("A turma não tem esta disciplina associada.");

//Tarefa → Turma e Disciplina
// Verificar se a tarefa está associada à turma e à disciplina
tasks.filter(
  (task) => task.turmaId === classes.id && task.disciplinaId === subjects.id,
);

//Nota → Aluno, Turma, Disciplina e Professor
// Verificar se a nota está associada ao aluno, turma, disciplina e professor
grades.filter(
  (grade) =>
    grade.studentId === students.id &&
    grade.turmaId === classes.id &&
    grade.disciplinaId === subjects.id &&
    grade.teacherId === teacher.id,
);

//Frequência → Aluno, Turma, Disciplina e Professor
// Verificar se a frequência está associada ao aluno, turma, disciplina e professor
attendances.filter(
  (attendance) =>
    attendance.studentId === students.id &&
    attendance.turmaId === classes.id &&
    attendance.disciplinaId === subjects.id &&
    attendance.teacherId === teacher.id,
);

//Entrega de Tarefa → Aluno, Tarefa, Turma, Disciplina e Professor
// Verificar se a entrega de tarefa está associada ao aluno, tarefa, turma, disciplina e professor
taskSubmissions.filter(
  (submission) =>
    submission.studentId === students.id &&
    submission.tarefaId === tasks.id &&
    submission.turmaId === classes.id &&
    submission.disciplinaId === subjects.id &&
    submission.teacherId === teacher.id,
);
