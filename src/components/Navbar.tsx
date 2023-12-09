'use client'
import React from 'react'
import Link from "next/link";
import { useState } from 'react';
import Style from "./App.module.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
 
    return (
        <div className={Style.nav} style={{width:"100vw",height:"9vh",display:'flex',justifyContent:"space-around",alignItems:"center", backgroundColor: '#330033',marginBottom:30}}>
          <div style={{width:"20vw",marginLeft:0,display:'flex',justifyContent:'flex-start',alignItems:"center"}}>
          </div>
           <ul style={{listStyle:"none",overflow:"hidden",width:"50vw",display:"flex",justifyContent:"center",alignItems:"center",height:100}}>
            <li style={{  float: 'left'}}>
            <a href='/' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20}}>Home</a>
            </li>
            <li  style={{  float: 'left'}}>
                <a href='#' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20,}}>About</a>
            </li>
            <li style={{  float: 'left'}}>
                <a href='#' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',paddingRight:'3rem',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20}}>Contact</a>
            </li>
            <li><ConnectButton/>
</li>
           </ul>
        </div>
    )
}
