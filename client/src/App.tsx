import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Heading,
  theme
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import {ReactComponent as Logo} from "./logo.svg"
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import AppContainer from './components/AppContainer'
import MintPage from './components/MintPage'

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/mint" element={<MintPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
