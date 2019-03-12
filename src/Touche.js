import React from 'react'
import './Touche.css'

const Touche = ({ lettre, onClick, bloque }) => (
  <span className={bloque ? "touche bloque" : "touche"} onClick={() => onClick(lettre)}> {lettre} </span>
)

export default Touche
