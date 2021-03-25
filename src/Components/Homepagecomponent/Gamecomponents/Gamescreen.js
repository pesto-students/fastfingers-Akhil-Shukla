import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGamepad, faTimes } from '@fortawesome/fontawesome-free-solid';
import "./Gamescreen.css"
import LastScreen from "../Lastscreencomponent/Lastscreen.js";
import dictionary from "../../data/dictionary.json";
import Timer from "./Timer";



const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let resetChild=null;

export default class Gamescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowLocation: '',
            words: dictionary,
            letter: '',
            difficulty: window.sessionStorage.getItem("difficultylevel"),
            playername:window.sessionStorage.getItem("playername"),
            resetChild:null,
            expiryDuration:0,
            typedWord:'',
            rawWord: '',
            displayTextMatched:'',
            displayTextUnmatched:'',
            displayTextRemaining:'',
            difficultyFactor:0,
            startTime:Date.now(),
            scores:JSON.parse(sessionStorage.getItem(window.sessionStorage.getItem("playername"))).scores,
            lastScore: JSON.parse(sessionStorage.getItem(window.sessionStorage.getItem("playername"))).lastScore
        }
        this.getRandomWord = this.getRandomWord.bind(this);
        this.timeouted=this.timeouted.bind(this);
        this.processWordInput=this.processWordInput.bind(this);
        this.inputWordChanged= this.inputWordChanged.bind(this);

    }

    componentDidMount() {
        this.setState({difficulty : window.sessionStorage.getItem("difficultylevel")});
        console.log(this.state.difficulty);
        let wordData = this.getRandomWord(this.state.difficulty);
        console.log(wordData[0]+" ex "+wordData[1]);
        this.setState({ rawWord: wordData[0] });
        this.setState({ expiryDuration: wordData[1] });
        this.processWordInput("",wordData[0]);
        resetChild(wordData[1]);
    }

    processWordInput= (inp,word) => {
        let matched="";
        let unmatched="";
        let remaining="";
        for(let index=0; index<word.length; index++){
            if(index<inp.length){
                if(word[index].toLowerCase()===inp[index].toLowerCase()){
                    matched+=word[index];
                    if(inp===word) {
                        let currentScore = Date.now() - this.state.startTime;
                        this.setState({lastScore:currentScore});
                        this.setState({displayTextMatched:""});
                        this.setState({displayTextUnmatched:""});
                        this.setState({displayTextRemaining:""});
                        this.setState({difficultyFactor:this.state.difficultyFactor+0.01});
                        let wordData = this.getRandomWord(this.state.difficulty);
                        this.setState({typedWord:""});
                        this.setState({ rawWord: wordData[0] });
                        this.setState({expiryDuration: wordData[1]}); 
                        console.log(wordData);
                        resetChild(wordData[1]);
                        this.processWordInput("",wordData[0]);
                        return;
                        
                    }
                } else if (this.state.rawWord[index].toLowerCase()!==inp[index].toLowerCase()){
                    unmatched+=word[index];
                }
            } else {
                remaining+=word[index];
            }
        }
        console.log(matched+":"+unmatched+":"+remaining);
        this.setState({displayTextMatched:matched});
        this.setState({displayTextUnmatched:unmatched});
        this.setState({displayTextRemaining:remaining});
        return;
    }
    

    getRandomWord(difficulty) {
        const { words } = this.state;
        let randomWord, diffFilter,expiryDuration;
        if (difficulty === "EASY") {
            diffFilter = words.filter((word) => word.length <= 4);
            randomWord = diffFilter[getRandomIntInclusive(0, diffFilter.length)];
            expiryDuration=(randomWord.length/(1))

        } else if (difficulty === "MEDIUM") {
            diffFilter = words.filter((word) => word.length <= 5 && word.length < 9);
            randomWord = diffFilter[getRandomIntInclusive(0, diffFilter.length)];
            expiryDuration=(randomWord.length/(1.5))

        } else if (difficulty === "HARD") {
            diffFilter = words.filter((word) => word.length > 8);
            randomWord = diffFilter[getRandomIntInclusive(0, diffFilter.length)];
            expiryDuration=(randomWord.length/(2))

        }
        // this.setState({ randomWord });
        console.log({randomWord,expiryDuration});
        return [randomWord,expiryDuration];
    }

    resetCallback(reset){
        resetChild=reset;
    }

    timeouted(){
        let finalScore = this.state.scores;
        if(this.state.lastScore) {
            finalScore.push(this.state.lastScore);
        } else {
            finalScore.push(0);
            this.setState({lastScore:0});
        }

        window.sessionStorage.setItem(this.state.playername,JSON.stringify({"scores":finalScore,"lastscore":this.state.lastScore}));
        this.setState({windowLocation:"lastscreen"});
    }

    inputWordChanged = (e) => {
        const {
            target: { name, value }
        } = e;
        console.log(e.target.value);
        this.setState({ [name]: value });
        this.processWordInput(value,this.state.rawWord);
    }

    handleClick = (e) => {
        const { windowLocation } = this.state;
        if (windowLocation === '') {
            console.log("empty")
            this.setState({ windowLocation: 'lastscreen' })
        }
    }

    render() {
        const { windowLocation, displayTextMatched,displayTextUnmatched,displayTextRemaining, difficulty, playername ,typedWord,scores,lastScore} = this.state;
        console.log(scores);
        
        if (windowLocation === 'lastscreen') {
            return (<LastScreen lastScore={this.state.lastScore} />)
        }

        return (<div style={{ backgroundImage: `url(/group.png)`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: "100%" }}>
            <div class="container" style={{ width: "auto", backgroundImage: `url(/rectangle.png)`, opacity: ".9" }}>
                <div class="row">
                    <div class="col-sm-4 playerInfo" >
                        <div style={{ textAlign: "left" }} >
                            <ul style={{ listStyleType: "none" }}>
                                <li><span style={{ fontSize: "30px", color: "red" }}><FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;{playername}</span></li>
                                <li><span style={{ fontSize: "30px", color: "red" }}><FontAwesomeIcon icon={faGamepad} /> &nbsp;&nbsp;{difficulty}</span></li>
                            </ul>
                        </div>
                        <div class="scoreBoard">
                            <ul style={{ listStyleType: "none" ,fontSize:"20px",color:"white" }}>
                                {scores.map((value,index)=>{
                                   return( <li>Game: {index}, Score: {value} </li>)
                                })}
                            </ul>
                        </div>
                        <div>
                            <ul style={{ marginLeft: "5px", color: "red", listStyleType: "none" }}>
                                <li><span style={{ float: "left", fontSize: "30px" }} onClick={this.handleClick}><FontAwesomeIcon icon={faTimes} /> Stop</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4 playerInfo">
                        <div className="timer-wrapper">
                        <Timer resetCallback={this.resetCallback} timeouted={this.timeouted}/>
                        </div>
                        <div style={{fontSize:"60px"}}>
                            <span style= {{ color:"green" }}>{ displayTextMatched }</span>
                            <span style= {{ color:"red" }}>{ displayTextUnmatched }</span>
                            <span style= {{ color:"blue" }}>{ displayTextRemaining }</span> 
                        </div>
                        <div class="playerInput">
                            <input type="text" name="typedWord" id="typedWord" value={typedWord} onChange={this.inputWordChanged} autoFocus autoComplete="off"></input>
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
    };

}




