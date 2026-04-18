export const users = [
  {
    id: "adm_001",
    nome: "Administrador Principal",
    email: "admin@siga.com",
    senha: "123456",
    categoria: "Administrador",
  },
  {
    id: "tch_001",
    nome: "João Manuel",
    email: "joao@gmail.com",
    senha: "123456",
    categoria: "Professor",
  },
  {
    id: "tch_002",
    nome: "Helena José",
    email: "helena@gmail.com",
    senha: "123456",
    categoria: "Professor",
  },
  {
    id: "std_001",
    nome: "Ana Maria Ernesto",
    email: "ana@gmail.com",
    senha: "123456",
    categoria: "Estudante",
  },
  {
    id: "std_002",
    nome: "Carlos Alberto",
    email: "carlos@gmail.com",
    senha: "123456",
    categoria: "Estudante",
  },
];

export const admin = {
  id: "adm_001",
  nome: "Administrador Principal",
  email: "admin@siga.com",
  senha: "123456",
  categoria: "Administrador",
  avatar: "",
  telefone: "+258841234567",
  cargo: "Director do Sistema",
  permissoes: [
    "gerir_alunos",
    "gerir_professores",
    "gerir_turmas",
    "gerir_notas",
    "gerir_relatorios",
    "gerir_configuracoes",
  ],
  createdAt: "2026-04-11",
  updatedAt: "2026-04-11",
};

export const teacher = [
  {
    id: "tch_001",
    nome: "João Manuel",
    email: "joao@gmail.com",
    senha: "123456",
    categoria: "Professor",
    avatar: "",
    telefone: "+258841234567",
    genero: "Masculino",
    dataNascimento: "1990-08-20",
    morada: "Matola, Maputo",
    disciplinaIds: ["sub_001", "sub_002"],
    turmaIds: ["cls_001", "cls_002"],
    codigoFuncionario: "PROF-2026-01",
    estado: "activo",
    createdAt: "2026-04-11",
    updatedAt: "2026-04-11",
  },
  {
    id: "tch_002",
    nome: "Helena José",
    email: "helena@gmail.com",
    senha: "123456",
    categoria: "Professor",
    avatar: "",
    telefone: "+258842222222",
    genero: "Feminino",
    dataNascimento: "1988-05-14",
    morada: "Maputo Cidade",
    disciplinaIds: ["sub_002"],
    turmaIds: ["cls_001"],
    codigoFuncionario: "PROF-2026-02",
    estado: "Licença",
    createdAt: "2026-04-11",
    updatedAt: "2026-04-11",
  },
];

export const students = [
  {
    id: "std_001",
    nome: "Ana Maria Ernesto",
    email: "ana@gmail.com",
    senha: "123456",
    categoria: "Estudante",
    avatar: "",
    telefone: "+258841112233",
    genero: "Feminino",
    dataNascimento: "2011-01-12",
    morada: "Matola, Maputo",
    codigoAluno: "ALN-2026-001",
    turmaId: "cls_001",
    encarregado: {
      nome: "Maria Ernesto",
      telefone: "+258867654321",
      parentesco: "Mãe",
    },
    estado: "activo",
    createdAt: "2026-04-11",
    updatedAt: "2026-04-11",
  },
  {
    id: "std_002",
    nome: "Carlos Alberto",
    email: "carlos@gmail.com",
    senha: "123456",
    categoria: "Estudante",
    avatar: "",
    telefone: "+258844444444",
    genero: "Masculino",
    dataNascimento: "2010-09-03",
    morada: "Maputo, Zimpeto",
    codigoAluno: "ALN-2026-002",
    turmaId: "cls_001",
    encarregado: {
      nome: "Alberto Carlos",
      telefone: "+258865551111",
      parentesco: "Pai",
    },
    estado: "activo",
    createdAt: "2026-04-11",
    updatedAt: "2026-04-11",
  },
];

export const classes = [
  {
  id: "cls_001",
  nome: "8ª Classe A",

  info: {
    classe: "8ª Classe",
    turno: "Manhã",
    sala: "Sala 03",
  },

  relacoes: {
    estudantes: ["std_001"],
    professores: ["tch_001"],
    disciplinas: ["sub_001"],
  },

  responsavel: "tch_001",

  meta: {
    anoLectivo: "2026",
    estado: "activa",
  },
}
];

export const subjects = [
  {
    id: "sub_001",
    nome: "Matemática",
    codigo: "MAT-01",
    teacherIds: ["tch_001"],
    turmaIds: ["cls_001"],
  },
  {
    id: "sub_002",
    nome: "Português",
    codigo: "POR-01",
    teacherIds: ["tch_002"],
    turmaIds: ["cls_001"],
  },
];

export const grades = [
  {
    id: "grd_001",
    studentId: "std_001",
    teacherId: "tch_001",
    turmaId: "cls_001",
    disciplinaId: "sub_001",
    periodo: "1º Trimestre",
    teste1: 14,
    teste2: 15,
    trabalho: 16,
    exame: 13,
    media: 14.5,
    estado: "aprovado",
    createdAt: "2026-04-11",
  },
];

export const attendances = [
  {
    id: "att_001",
    studentId: "std_001",
    turmaId: "cls_001",
    disciplinaId: "sub_001",
    teacherId: "tch_001",
    data: "2026-04-11",
    estado: "presente",
  },
];

export const tasks = [
  {
    id: "tsk_001",
    titulo: "Ficha de Exercícios sobre Equações",
    descricao: "Resolver os exercícios da página 20 até 25.",
    disciplinaId: "sub_001",
    turmaId: "cls_001",
    teacherId: "tch_001",
    prazo: "2026-04-20",
    estado: "activa",
    createdAt: "2026-04-11",
  },
];

export const taskSubmissions = [
  {
    id: "subm_001",
    taskId: "tsk_001",
    studentId: "std_001",
    ficheiro: "resolucao-equacoes.pdf",
    comentario: "Segue a minha resolução.",
    dataEntrega: "2026-04-19",
    estado: "entregue",
    nota: 16,
  },
];

export const db = {
  admins: [admin],
  teachers: [teacher],
  students: [students],
  classes: [classes],
  subjects: [subjects],
  grades: [grades],
  attendance: [attendances],
  tasks: [tasks],
  taskSubmissions: [taskSubmissions],
};

const dados = JSON.parse(localStorage.getItem("db"));

export function getData() {
  if (!dados) {
    localStorage.setItem("db", JSON.stringify(db));
    return db;
  }
  return dados;
}
