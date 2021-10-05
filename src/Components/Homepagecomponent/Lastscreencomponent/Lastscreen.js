import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGamepad, faTimes,faRedo } from '@fortawesome/fontawesome-free-solid'
import Gamescreen from '../Gamecomponents/Gamescreen'
import HomePage from '../Homepage'
import "./Lastscreen.css"


export default class LastScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowLocation: '',
            difficulty: window.sessionStorage.getItem("difficultylevel"),
            playername:window.sessionStorage.getItem("playername"),
            lastScore: this.props.lastScore
        }
        console.log(window.sessionStorage.getItem("playername"));
    }

    componentDidMount() {
        this.setState({lastScore:this.props.lastScore});
    }
    playAgain = (e) => {
        const { windowLocation } = this.state;
        if (windowLocation === '') {
            console.log("empty")
            this.setState({ windowLocation: 'gamescreen' })
        }
    }

    quitGame = (e) => {
        const { windowLocation } = this.state;
        if (windowLocation === '') {
            console.log("empty")
            this.setState({ windowLocation: 'homescreen' })
        }
    }


    render() {
        const { windowLocation ,difficulty,playername,lastScore} = this.state;
        console.log(this.state.lastScore);
        if (windowLocation === 'gamescreen') {
            return (<Gamescreen />)
        }
        if (windowLocation === 'homescreen') {
            return (<HomePage />)
        }
        return (
        <div  style={{ backgroundImage: `url(/group.png)`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: "100%" }}>
            <div class="container" style={{ width: "auto", backgroundImage: `url(/rectangle.png)`, opacity: ".9" }}>
                <div class="row ">
                    <div class="col-sm-4 playerInfo" >
                        <div style={{ textAlign: "left" }} >
                            <ul style={{ listStyleType: "none" }}>
                                <li><span style={{ fontSize: "30px", color: "red" }}><FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;{playername}</span></li>
                                <li><span style={{ fontSize: "30px", color: "red" }}><FontAwesomeIcon icon={faGamepad} /> &nbsp;&nbsp;{difficulty}</span></li>
                            </ul>
                        </div>
                        <div>
                            <ul style={{ marginLeft: "5px", color: "red", listStyleType: "none",marginTop:"300px" }}>
                                <li><span style={{ float: "left", fontSize: "30px" }} onClick={this.quitGame}><FontAwesomeIcon icon={faTimes} /> Quit</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4 ">
                        <div style={{ marginTop:"100px", fontSize: "40px", color: "white" }}>
                            LAST SCORE :{this.props.lastScore}
                        </div>
                        <div className="playagain">
                            <span style={{ color:"red", fontSize: "30px" }} onClick={this.playAgain}><FontAwesomeIcon icon={faRedo} /> Play again</span>
                        </div>
                    </div>
                    <div class="col-sm-4 playerInfo">
                        <div >
                            <ul style={{ listStyleType: "none" }}>
                                <li><span style={{ fontSize: "20px", color: "red" }}>fast fingers</span></li>
                                <li><span style={{ fontSize: "30px", color: "white" }}>SCORE: {lastScore}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}