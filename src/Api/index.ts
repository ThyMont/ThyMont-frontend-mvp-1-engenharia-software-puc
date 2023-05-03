import Axios from "axios";
import { tarefaType, respostaGetTarefaType, tarefaForm } from "../Types";

const axios = Axios.create({
  baseURL: "http://127.0.0.1:5000",
});

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.delete["Access-Control-Allow-Origin"] = "*";

async function buscaTodasTarefas(): Promise<tarefaType[]> {
  let lista: tarefaType[] = [];

  await axios.get<respostaGetTarefaType>("/tarefas").then((res) => {
    lista = [...res.data.lista];
  });

  return lista;
}

async function salvarTarefa(tarefa: tarefaForm): Promise<tarefaType> {
  const bodyFormData = new FormData();
  bodyFormData.append("titulo", tarefa.titulo);
  bodyFormData.append("descricao", tarefa.descricao);

  const novaTarefa = await axios
    .post("/tarefas", bodyFormData)
    .then((res) => res.data)
    .catch(() => console.log("Deu erro"));
  return novaTarefa;
}

async function deletarTarefa(id: number) {
  await axios.delete(`/tarefas/${id}`);
}
async function completarTarefa(id: number) {
  await axios.put(`/tarefas/check/${id}`);
}

export { buscaTodasTarefas, salvarTarefa, deletarTarefa, completarTarefa };
