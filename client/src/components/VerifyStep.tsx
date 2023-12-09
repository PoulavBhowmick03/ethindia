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
  ModalCloseButton,
  Center
} from '@chakra-ui/react'
import * as faceapi from 'face-api.js'
import Style from "./App.module.css";

import VerifyModal from './VerifyModal';

export default function VerifyStep({incrementStep, faceDescriptor, setFaceDescriptor}: {incrementStep: any, faceDescriptor: any, setFaceDescriptor: any}) {

  const [verifyStep, setVerifyStep] = useState(0)
  const [uploaded, setUploaded] = useState(false)
  const [descriptor1, setDescriptor1] = useState(new Float32Array)
  const { isOpen, onOpen, onClose } = useDisclosure()


  function renderStep() {
  return <Button colorScheme='rgb(120,32,178)' className={Style.btn} onClick={onOpen} m={4}>Verify</Button>
  }

  return(
    <>
      <Container>
        {renderStep()}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size='xxl'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VerifyModal setFaceDescriptor={setFaceDescriptor}/>
          </ModalBody>
          <ModalFooter alignItems={"center"} >
            <Button colorScheme='rgb(120,32,178)' className={Style.btn} isDisabled={(faceDescriptor.length == 0)} onClick={() => {
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