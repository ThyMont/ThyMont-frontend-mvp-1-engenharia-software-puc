type tarefaType = {
  id: number;
  titulo: string;
  descricao: string;
  feito: boolean;
};

type respostaGetTarefaType = {
  lista: tarefaType[];
  quntidade: number;
};

type tarefaForm = {
  titulo: string;
  descricao: string;
};

export type { tarefaType, respostaGetTarefaType, tarefaForm };
