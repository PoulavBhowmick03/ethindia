import Head from "next/head";
import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter(); 

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
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <main className="flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
        <h1 className="font-bold text-2xl">Welcome to Anon Aadhaar Example</h1>
        <p>Prove your Identity anonymously using your Aadhaar card.</p>

        <LogInWithAnonAadhaar />
      </main>
      <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <p>Got your Aadhaar Identity Proof</p>
            <>Welcome anon!</>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
    </div>
  );
}
