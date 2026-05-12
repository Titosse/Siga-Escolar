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
  },
];

const disciplinas = [
  {
    id: "sub_001",

    info: {
      nome: "Matemática",
      codigo: "MAT-07",
      cargaHoraria: 5,
      classe: "7ª Classe",
      area: "Ciências exactas",
      semestre: "1º Semestre",
      anoLectivo: "2026",
      descricao: "Disciplina focada em cálculo e raciocínio lógico.",
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001", "cls_002"],
    },

    meta: {
      estado: "activo",
      createdAt: "2026-04-29",
      updatedAt: "2026-04-29",
    },
  },
];

export const subjects = [
  {
    id: "sub_001",

    info: {
      nome: "Matemática",
      codigo: "MAT-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_002",

    info: {
      nome: "Português",
      codigo: "POR-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_003",

    info: {
      nome: "Ciências Naturais",
      codigo: "CIE-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_004",

    info: {
      nome: "História",
      codigo: "HIS-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_005",

    info: {
      nome: "Língua Inglesa",
      codigo: "ING-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_006",

    info: {
      nome: "Ciências Sociais",
      codigo: "SOC-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_007",

    info: {
      nome: "Educação Física",
      codigo: "EDF-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_008",

    info: {
      nome: "Artes",
      codigo: "ART-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_009",

    info: {
      nome: "Educação Moral e Cívica",
      codigo: "MOR-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
  {
    id: "sub_010",

    info: {
      nome: "Tecnologia",
      codigo: "TEC-01",
      cargaHoraria: 5,
    },

    relacoes: {
      professores: ["tch_001"],
      turmas: ["cls_001"],
    },

    meta: {
      estado: "activa",
      createdAt: "2026-04-11",
    },
  },
];

export const grades = [
  {
    id: "grd_001",

    relacoes: {
      studentId: "std_001",
      teacherId: "tch_001",
      turmaId: "cls_001",
      disciplinaId: "sub_001",
    },

    periodo: "1º Trimestre",

    notas: {
      teste1: 14,
      teste2: 15,
      trabalho: 16,
      exame: 13,
    },

    resultado: {
      media: 14.5,
      estado: "aprovado",
    },

    meta: {
      createdAt: "2026-04-11",
    },
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
    id: "task_001",

    info: {
      titulo: "Lançar notas",
      descricao: "Adicionar notas do 1º teste",
      prioridade: "alta",
    },

    relacoes: {
      teacherId: "tch_001",
      turmaId: "cls_001",
      disciplinaId: "sub_001",
    },

    periodo: "1º semestre",

    estado: {
      completed: false,
      situacao: "pendente",
    },

    datas: {
      prazo: "2026-05-10",
      createdAt: "2026-05-07",
      updatedAt: "2026-05-07",
    },
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
  users: [],
  students: [],
  teachers: [],
  classes: [],
  subjects: [],
  grades: [],
  attendance: [],
  tasks: [],
  taskSubmissions: [],
  reports: [],
};

const dados = JSON.parse(localStorage.getItem("db"));

export function getData() {
  if (!dados) {
    localStorage.setItem("db", JSON.stringify(db));
    return db;
  }
  return dados;
}
