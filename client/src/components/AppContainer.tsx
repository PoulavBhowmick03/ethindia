import React, {useEffect, useState} from 'react'
import {
  Container,
  Box,
  Text,
  VStack,
  Grid,
  Spacer,
} from '@chakra-ui/react'
import StepsComponent from './StepsComponent'
import VerifyStep from './VerifyStep'
import ClaimStep from './ClaimStep'
import * as faceapi from 'face-api.js'


export default function AppContainer() {
  

  const [step, setStep] = useState(1)
  const [faceDescriptor, setFaceDescriptor] = useState(new Float32Array)
  
  function incrementStep() {
    setStep(step + 1)
  }

  return (

    <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
        
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <VStack spacing={9} minWidth="300px" width="75vw" justifySelf="center">
            <VStack spacing={1} width="100%">
            </VStack>
            <StepsComponent activeStep={step}/>
            <Container px={10} py={6} maxWidth="inherit" border="1px solid #E2E8F0">
              {(step === 1) && <VerifyStep incrementStep={incrementStep} faceDescriptor={faceDescriptor} setFaceDescriptor={setFaceDescriptor}/>}
              {(step === 2) && <ClaimStep faceDescriptor={faceDescriptor} />}
            </Container>
        </VStack>
    </Grid>
    </Box>
  )
}