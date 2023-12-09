import React, {useEffect, useState} from 'react'
import {
  Container,
  Heading,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import Style from "./App.module.css"


export default function ClaimStep({faceDescriptor}: {faceDescriptor: Float32Array}) {
    const [credential, setCredential] = useState<String | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    function getFaceDescriptorNumbers(faceDescriptor: any) {
        var result = []

        for (const item of faceDescriptor) {
            result.push(Number(item))
        }

        return result
    }

    async function generateCredential() {

        setIsLoading(true)
        setCredential(null)

        const faceDescriptorNumbers = getFaceDescriptorNumbers(faceDescriptor)

        const body = JSON.stringify({
            faceDescriptor: faceDescriptorNumbers
        })

        try {
            const result = await fetch(`http://localhost:4000/join-group`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            })

            const resultJson = await result.json()

            setCredential(JSON.stringify(resultJson))
            setIsLoading(false)
        } catch(e) {
            console.log(e)
            setIsLoading(false)
        }    
   }

    return(
        <>
        <Text fontSize="3xl" fontWeight="" color={"#fff"} textAlign="left">Claim Proof of Personhood</Text>
        <Container>
        <Box>
            <Button className={Style.btn} colorScheme='rgb(120,32,178)' isLoading={isLoading} onClick={generateCredential}>Claim credential</Button>
            {credential !== null && 
                <Text mt={4}  color={"#fff"} textAlign="left">Proof: {credential.toString()}</Text>
            }
            
        </Box>
        </Container>
        </>
    )
}