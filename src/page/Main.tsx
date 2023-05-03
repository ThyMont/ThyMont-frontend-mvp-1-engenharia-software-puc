import React, { useState, useEffect } from "react";
import { Container, Button, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { buscaTodasTarefas, deletarTarefa, completarTarefa } from "../Api";
import { tarefaType } from "Types";
import ModalNovaTarefa from "components/ModalNovaTarefa";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

function Main() {
  const [listaTarefas, setListaTarefas] = useState<tarefaType[]>([]);

  const load = async () => {
    setTimeout(async () => {
      await buscaTodasTarefas().then((resp) => setListaTarefas(resp));
    }, 500);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSalvar = async () => {
    await load();
  };

  const handleCheck = async (id: number) => {
    await completarTarefa(id);
    await load();
  };
  const handleDelete = async (id: number) => {
    await deletarTarefa(id);
    await load();
  };

  return (
    <Container maxW="" w="xl">
      <Heading mb="3" mt="3">
        Lista de tarefas
      </Heading>
      <ModalNovaTarefa onSave={handleSalvar} />
      <Table variant="simple" colorScheme="pink">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Descrição</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listaTarefas.map((tarefa) => (
            <Tr color={tarefa.feito ? "gray.400" : "gray.900"} key={tarefa.id}>
              <Td>{tarefa.titulo}</Td>
              <Td>{tarefa.descricao}</Td>
              <Td textAlign="center">
                {!tarefa.feito && (
                  <Button onClick={() => handleCheck(tarefa.id)}>
                    <CheckIcon />
                  </Button>
                )}
                <Button onClick={() => handleDelete(tarefa.id)}>
                  <DeleteIcon />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

export default Main;
