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
    score: 0,
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
    const { motATrouver, lettresTrouvees, touchesUtilisees, score } = this.state

    if (!touchesUtilisees.includes(lettre)) {
      this.setState({
        touchesUtilisees: [...touchesUtilisees, lettre]
      })    
      if (motATrouver.includes(lettre)) {
        this.setState({
          lettresTrouvees: [...lettresTrouvees, lettre],
          score: score + 2
        })
        return
      } else {
        this.setState({
          score: score - 1
        })
        return
      }
    }
    this.setState({
      score: score - 2
    })
    return

  }

  finPartie() {
    const { motATrouver, lettresTrouvees } = this.state

    return !motATrouver.every((lettre) => {
      return lettresTrouvees.includes(lettre)
    })

  }

  render() {
    const { motATrouver, touches, score } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Le jeu du pendu</h1>
          <h3>Score : { score } </h3>
        </header>
        <p className="jeu">
          { motATrouver.map((lettre, index) => (
            <span className="lettreWord" key={index} > { this.lettreAAfficher(lettre) } </span>
          ))}
        </p>
        { this.finPartie() ? (
          <section className="clavier">
            {touches.map((lettre, index) => (
              <Touche bloque={this.toucheABloquer(lettre)} lettre={lettre} key={index} onClick={this.handleToucheClick} />
            ))}
          </section>
        ) : (
          <button>Recommencer</button>
        )}
        
      </div>
    );
  }
}

export default App;
