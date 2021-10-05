import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faPlay } from '@fortawesome/fontawesome-free-solid'
// import background from "./rectangle-1@3x.png";

// import background from "../../Group 243@3x.png"
import "./Homepage.css"
import Gamescreen from './Gamecomponents/Gamescreen'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playername: "",
            selectedOption: "EASY",
            options: ["EASY", "MEDIUM", "HARD"],
            hasError: false,
            windowLocation: ''
        }

    }
    handleChange = (e) => {
        
        const {
            target: { name, value }
        } = e;
        // console.log({ name, value });    
        this.setState({ [name]: value });
        if (value === '') {
            this.setState({ hasError: true })
        } else {
            this.setState({ hasError: false })
        }
    };

    handleClick = (e) => {
        const { playername, selectedOption } = this.state
        console.log(playername, selectedOption);
        
        if (playername === '') {
            this.setState({ hasError: true })
        } else {
            this.setState({ windowLocation: 'gamepage' });
            this.setState({ hasError: false });
            window.sessionStorage.setItem("playername",playername);
            window.sessionStorage.setItem("difficultylevel",selectedOption);
            let sessplayer = window.sessionStorage.getItem(playername);
            if(!sessplayer){
                window.sessionStorage.setItem(playername,JSON.stringify({"scores":[],"lastscore":0}));
            }
        }

    };


    render() {
        const { playername, selectedOption, windowLocation, hasError } = this.state;
        console.log(playername, selectedOption)
        if (windowLocation === 'gamepage') {
            return (<Gamescreen playername={playername} selectedOption={selectedOption} />)
        }


        return (
        <div style={{ backgroundImage: `url(/group.png)`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: "100%" }}>
            <div class="container" style={{ width: "auto", position: "relative", backgroundImage: `url(/rectangle.png)`, opacity: ".9" }}>
                <div class="row">

                    <p style={{ color: "red", marginBottom: "-20px" }}> <FontAwesomeIcon icon={faKeyboard} size="8x" />  </p>
                    <p style={{ color: "red", fontSize: "50px", fontWeight: "normal", marginTop: "0px" }}>fast fingers</p>

                    <h2 class="decorated"><span>The ultimate typing game</span></h2>

                    <div class="player-info">
                        <form onSubmit={this.handleClick}>
                            <div class="form-field">
                                <input type="text" name="playername" id="playername" placeholder="Player name" value={playername} onChange={this.handleChange} required autoComplete="off"></input>
                                <div>{hasError ? (<p style={{ color: "red",fontSize:"20px" }}>**** Player name is required ****</p>) : (<p></p>)}</div>
                            </div >
                            <div class="form-field"></div>
                            <select name='selectedOption' onChange={this.handleChange} >
                                {this.state.options.map(i => i === this.state.selectedOption ? (
                                    <option value={i} selected>
                                        {i}
                                    </option>
                                ) : (<option value={i}>{i}</option>))}
                            </select>
                            <div class="row">
                                <div class="form-field-font">
                                    <span style={{ fontSize: "30px" }} onClick={this.handleClick}><FontAwesomeIcon icon={faPlay} size="s" /> &nbsp;&nbsp;Start Game</span>
                                    {/* <button onClick={this.startGame} style={{background:"transparent",color:"red",marginRight:"20px"}}><FontAwesomeIcon  icon={faPlay} size="3x" /></button><p style={{fontSize:"40px",color:"red"}}>start game</p> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        );
    }


}