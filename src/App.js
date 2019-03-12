import React, { Component } from 'react';
import './App.css';
import Touche from './Touche';

const LETTRES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const MOTS = ['bonjour', 'noix', 'fruit', 'calculatrice', 'crayon', 'telephone']

class App extends Component {

  state = {
    motATrouver: this.motAuHasard().toUpperCase().split(''),
    lettresTrouvees: [],
    touches: LETTRES.split(''),
    touchesUtilisees: [],
  }

  motAuHasard() {
    return MOTS[Math.floor(Math.random()*MOTS.length)]
  }

  lettreAAfficher(lettre) {
    const { lettresTrouvees } = this.state
    return lettresTrouvees.includes(lettre) ? lettre : '_'
  }

  toucheABloquer(lettre) {
    const { touchesUtilisees } = this.state
    return touchesUtilisees.includes(lettre) ? true : false
  }

  handleToucheClick = lettre => {
    const { motATrouver, lettresTrouvees, touchesUtilisees } = this.state

    if (!touchesUtilisees.includes(lettre)) {
      this.setState({
        touchesUtilisees: [...touchesUtilisees, lettre]
      })    
      if (motATrouver.includes(lettre)) {
        this.setState({
          lettresTrouvees: [...lettresTrouvees, lettre]
        })
      }
    }

    return

  }

  render() {
    const { motATrouver, touches } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Le jeu du pendu</h1>
        </header>
        <section className="jeu">
          { motATrouver.map((lettre, index) => (
            <span className="lettreWord" key={index} > { this.lettreAAfficher(lettre) } </span>
          ))}
        </section>
        <section className="clavier">
          {touches.map((lettre, index) => (
            <Touche bloque={this.toucheABloquer(lettre)} lettre={lettre} key={index} onClick={this.handleToucheClick} />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
