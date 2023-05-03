import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { buscaTodasTarefas } from "./Api";
import Main from "./page/Main";

function App() {
  buscaTodasTarefas();
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}

export default App;
