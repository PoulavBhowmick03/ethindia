"use client";
import Head from "next/head";
import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { LinearGradient } from 'react-text-gradients'
import { useSDK } from '@metamask/sdk-react'
import metamask from '../components/images/metamask.webp'
import Style from '../components/App.module.css'
import bgI from '../components/images/1686649357536.jpg'
import Cards from '../components/Cards'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter(); 
  const { sdk, connected, connecting, provider, chainId ,account} = useSDK();
  const [accountAdd, setaccountAdd] = useState()

  useEffect(() => {
    console.log(account)
  }, [])
  const connect = async () => {
    try {
      await sdk?.connect();
      setaccountAdd(account)
      console.log(account)
      console.log(provider)
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };
  // useEffect(() => {
  //   console.log("Anon Aadhaar: ", anonAadhaar.status);

  //   if (anonAadhaar.status === "logged-in") {
  //     router.push("/home");
  //   }
  //   else
  //   {
  //     router.push("/");
  //   }
  // }, [anonAadhaar, router]);


  return (
    <div className={Style.background}  style={{maxWidth:"100%"}}  >
      <Navbar/>
      {anonAadhaar?.status==='logged-out'&&<main className="flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
        <h1 className="font-bold text-2xl">Welcome to Anon Aadhaar Example</h1>
        <p>Prove your Identity anonymously using your Aadhaar card.</p>

        <LogInWithAnonAadhaar />
      </main>}
      <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
        {anonAadhaar?.status === "logged-in" && (
          <>
            <div>
    <div style={{display:"flex",justifyContent:'center',alignItems:"center",height:"60vh",padding:60}}>

    <div style={{width:"50vw",display:'flex',justifyContent:'center',alignItems:"center",flexDirection:'column'}}>
    <h1 className="px-20" style={{fontSize:60}}>
  <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </LinearGradient>
</h1>
<div style={{paddingLeft:"-120px"}}>

</div>
</div>
    <div style={{display:"flex",justifyContent:'center',alignItems:"center",width:"50vw",}}>
      <Image alt="logo image" style={{height:350, width:450, paddingRight:" -121px" , borderRadius:'2rem' , zIndex:'11111'}} src={bgI}></Image>
      </div>
    </div>
    <Cards/>
    </div>
          </>
        )}
      </div>
    </div>
  );
}
