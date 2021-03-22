import React , {Component}  from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faGamepad ,faTimes} from '@fortawesome/fontawesome-free-solid'
import "./Gamescreen.css"


export default class Gamescreen extends Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        window.location.href='http://localhost:3000/home'
        console.log(window.location.href)
        alert(window.location.href)
    }
    render(){
        return(<div class="container" style={{backgroundImage:"linear-gradient(to right , black,blue)",width:"auto",padding:"30px"}}>
            <div class="row">
                <div class="col-sm-4" style={{float:"left"}}>
                    <div class="row">
                <div className="playerInfo">
                   <ul style={{listStyleType:"none"}}>
                       <li><span style={{float:"left",fontSize:"40px",color:"red"}}><FontAwesomeIcon  icon={faUser} /> {this.props.playername}</span></li>
                       <li><span style={{float:"left",fontSize:"40px",color:"red"}}><FontAwesomeIcon  icon={faGamepad}/>{this.props.selectedOption}</span></li>
                   </ul>
                    </div>
                    
                    </div>
                    
                    <div class="row">
                        <div class="scoreBoard">
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                        </div>
                    </div>
                    <div class="row">


                        <ul style={{marginLeft:"5px",color:"red",listStyleType:"none"}}>
                            <li><span style={{float:"left",fontSize:"40px"}}><FontAwesomeIcon  icon={faTimes}/> Stop</span></li>
                        </ul>
                        
                        
                        
                    
                    </div>

                </div>
                <div class="col-sm-4">  
                <div>
                    
                </div>
                    <div class="playerInput">
                        <input type="text"></input>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="score">
                        <ul style={{listStyleType:"none"}}>
                            <li><span style={{fontSize:"30px",color:"red"}}>fast fingers</span></li>
                            <li><span style={{fontSize:"30px",color:"red"}}>SCORE: </span></li>
                        </ul>
                    </div>  
                </div>
            </div>
            <button onClick={this.handleClick}>click me</button>
        </div>)
    };

}




