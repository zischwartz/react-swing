/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Swing from '../dist/Swing.js';
import {Direction, Card} from '../dist/Swing.js';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        window.app = this // for debug
        this.state = {
            // stack: null,
            cards: ['a', 'b', 'c']
        };
    }
    swingThrowOutDone(e){
      console.log("swingThrowOutDone", e)
      // probs don't do this XXX
      // something slightly more sophisticated is in order, some sort of cleanup?
      // or at least don't let the user do anything during this timeout
      setTimeout( ()=>{
        let cards = this.state.cards
        cards.pop()
        this.setState({cards})
      }, 150)

    }
    addCard(){
      let cards = this.state.cards
      cards.unshift('n'+this.state.cards.length) // these will need to be unique
      this.setState({cards})
    }
    // programatically throw the top card
    // we'll use this mostly for dev/debug, but
    // i'm sure this will come up in game too
    throwTopCard() {
      let top = this.state.cards[this.state.cards.length-1]
      let el = this.refs.stack.refs[top]
      el = ReactDOM.findDOMNode(el) // ??? needed or no
      let card = this.stack.getCard(el)
      // card.throwOut(100, -200)
      card.throwOut(-0.1, -1) // doesn't seem to matter bah
      // can't use the directions symbols here, or it won't move the dom element (until )
    }
    shouldComponentUpdate(nextProps, nextState){
      return true // default
    }
    render() {
        // https://github.com/gajus/swing#configuration
        let config = {allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]}
        // let config = {};
        console.log('render', this.state.cards)
        //moved stack simply to this.stack from this.state. causing rerenders we don't want
        return (
            <div>
                <div id="viewport">
                    <Swing
                        className="stack"
                        tagName="div"
                        setStack={(stack)=> this.stack = stack }
                        ref="stack"
                        config={config}
                        throwout={e=>this.swingThrowOutDone(e)} >

                      {this.state.cards.map( (x,i)=> {
                        return <div key={i} ref={x} className="card">🥑{i}{x}</div> }
                      )}
                    </Swing>
                </div>
                <div className="control">
                    <button type="button" onClick={this.throwTopCard.bind(this)}>
                        throw card
                    </button>
                    <button type="button" onClick={this.addCard.bind(this)}>
                        add card
                    </button>
                </div>
            </div>
        )
    }
}



                        {/*
                            children elements will be Cards
                            also XXX removed refs
                            <div className="card spades">🥑</div>
                            <div className="card clubs" >z♣</div>
                            <div className="card diamonds"  ref="card2" >♦</div>
                            <div className="card hearts" >♥</div>
                            <div className="card spades">z♠</div>

                        */}

// <div className="card diamonds"  ref="card2" >♦</div>
// <div className="card hearts" >♥</div>
// <div className="card spades">z♠</div>

// XXX removed throwout
//  <div className="card clubs" ref="card1" throwout={(e)=>console.log('card throwout',e)}>z♣</div>


ReactDOM.render(<App/>, document.getElementById('app'));
