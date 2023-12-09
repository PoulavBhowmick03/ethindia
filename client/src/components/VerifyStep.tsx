import React, { useEffect, useState} from 'react'
import {
  useDisclosure,
  Container,
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import * as faceapi from 'face-api.js'

import VerifyModal from './VerifyModal';

export default function VerifyStep({incrementStep, faceDescriptor, setFaceDescriptor}: {incrementStep: any, faceDescriptor: any, setFaceDescriptor: any}) {

  const [verifyStep, setVerifyStep] = useState(0)
  const [uploaded, setUploaded] = useState(false)
  const [descriptor1, setDescriptor1] = useState(new Float32Array)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const disclosureText = "Your personal data is not stored by Menshen or any third parties. It is used to create a credential that cannot be tied back to your PII."

  function renderStep() {
    return <Box>
      <Button colorScheme='teal' onClick={onOpen} m={4}>Verify</Button>
      <Text mt={4} textAlign="left" fontSize="sm" textColor={"grey"}><b>Your privacy is preserved. </b>{disclosureText}</Text>
    </Box>
  }

  return(
    <>
      <Container>
        {renderStep()}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size='xxl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Face Scan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VerifyModal setFaceDescriptor={setFaceDescriptor}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' isDisabled={(faceDescriptor.length == 0)} onClick={() => {
              onClose()
              incrementStep()
              }} mr={3}>
              Submit
            </Button>
            <Button variant='ghost' onClick={() => {
              setFaceDescriptor([])
              onClose()
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}