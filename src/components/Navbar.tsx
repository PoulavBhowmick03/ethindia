'use client'
import React from 'react'
import logo from './images/logo.png'
import Link from "next/link";
import { useState } from 'react';
import Style from "./App.module.css";
export default function Navbar() {
 
    return (
        <div className={Style.nav} style={{width:"100vw",height:"6vh",display:'flex',justifyContent:"center",alignItems:"center", backgroundColor: '#330033',marginBottom:30}}>
          <div style={{width:"20vw",marginLeft:0,display:'flex',justifyContent:'flex-start',alignItems:"center"}}>
            <img src={logo} style={{height:120}}></img>
          </div>
           <ul style={{listStyle:"none",overflow:"hidden",width:"60vw",display:"flex",justifyContent:"center",alignItems:"center",height:100}}>
            <li style={{  float: 'left'}}>
            <a href='/' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20}}>Home</a>
            </li>
            <li  style={{  float: 'left'}}>
                <a href='#' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20,}}>About</a>
            </li>
            <li style={{  float: 'left'}}>
                <a href='#' className={Style.x} style={{'display': 'block', 'color': 'white', textAlign: 'center', padding: '10px',textDecoration:"none",fontSize:20,height:50,width:100,borderRadius:20}}>Contact</a>
            </li>
           </ul>
        </div>
    )
}
