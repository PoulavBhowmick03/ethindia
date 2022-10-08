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
import MintForm from './components/MintForm'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box display="flex" alignItems="center" padding="10px" borderBottom="1px solid lightgrey">
      <Logo height='2em' width='72px'/>
      <Heading>Menshen </Heading>
    </Box>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<MintForm />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
