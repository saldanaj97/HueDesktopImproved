import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Lights from "./Components/Lights";
import Scenes from "./Components/Scenes";
import Header from "./Components/Header";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Box className='App'>
        <Header />
        <Lights />
        <Scenes />
      </Box>
    </ChakraProvider>
  );
}

export default App;
