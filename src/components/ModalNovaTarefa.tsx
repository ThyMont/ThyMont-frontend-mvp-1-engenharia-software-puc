import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input,
  Stack,
} from "@chakra-ui/react";
import { salvarTarefa } from "Api";
import React, { ChangeEventHandler, useState } from "react";

type Props = {
  onSave?: () => void | Promise<void> | null;
};

function ModalNovaTarefa({ onSave }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSalvar = () => {
    salvarTarefa({ titulo, descricao });
    setTitulo("");
    setDescricao("");
    if (onSave) onSave();
    onClose();
  };
  const handleCancelar = () => {
    setTitulo("");
    setDescricao("");
    onClose();
  };

  const handleTituloChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitulo(event.target.value);
  };
  const handleDescricaoChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDescricao(event.target.value);
  };

  return (
    <>
      <Button mb="10" mt="4" onClick={onOpen}>
        Nova Tarefa
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Tarefa</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Stack spacing={4}>
              <Input
                type="text"
                placeholder="Título"
                maxLength={30}
                minLength={3}
                value={titulo}
                onChange={handleTituloChange}
              />
              <Input
                type="text"
                placeholder="Descrição"
                maxLength={300}
                value={descricao}
                onChange={handleDescricaoChange}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSalvar} disabled={titulo.length === 0}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={handleCancelar}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalNovaTarefa;
