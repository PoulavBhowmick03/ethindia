import React from 'react'
import CardPhoto from './images/cardmockphoto.jpg'
import { LinearGradient } from 'react-text-gradients'
import Storage from './images/storage.png'
import Style from './App.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Cards() {
  // const navigate=useNavigate()
  const router=useRouter()
  return (
    <div>
    <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}><h1 style={{fontSize:60}}>
  <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
  What We Offer
  </LinearGradient>
</h1></div>
      <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
       <div className={Style.card}>
        <Image src={Storage} style={{borderRadius:5}}></Image>
        <div><h1 style={{fontSize:18,color:"white"}}>DAO</h1></div>
        <div>
        <button className={Style.btn} style={{height:40,width:100,color:"white",borderRadius:10,fontWeight:"bold"}} onClick={()=>{ router.push('/dao')}}>Go there</button>
        </div>
       </div>
       <div className={Style.card}>
       <Image src={CardPhoto} style={{borderRadius:5}}></Image>
        <div><h1 style={{fontSize:18,color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h1></div>
        <div>
        <button className={Style.btn} style={{height:40,width:100,color:"white",borderRadius:10,fontWeight:"bold"}} onClick={()=>{ router.push('/Room/fge-bxdp-hwr')}} >Go there</button>
        </div>
       </div>
       <div className={Style.card}>
       <Image src={CardPhoto} style={{borderRadius:5}}></Image>
        <div><h1 style={{fontSize:18,color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h1></div>
        <div>
        <button className={Style.btn} style={{height:40,width:100,color:"white",borderRadius:10,fontWeight:"bold"}}>Go there</button>
        </div>
       </div>
      </div>
    </div>
  )
}
