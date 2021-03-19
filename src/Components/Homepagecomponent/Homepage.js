import React , {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faPlay } from '@fortawesome/fontawesome-free-solid'
// import background from "./rectangle-1@3x.png";
import vectorimage from "./Group 243@3x.png"
import "./Homepage.css"

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            playername:"",
            selectedOption:"MEDIUM",
            options:["EASY","MEDIUM","HARD"]
        }
    }
    handleChange = (e) => {
        const {
          target: { name, value }
        } = e;
        console.log({ name, value });
        this.setState({ [name]: value });
      };

    handleClick = (e) =>{
        const {playername,selectedOption}=this.state;

        console.log({playername,selectedOption})
        console.log("clicked")
    };
    render(){
        const{playername} = this.state;
        return (  
<div class="container" style={{backgroundImage:`url(${vectorimage})`,width:"auto",position:"relative"}}>
<div class="row">

         <p style={{color:"red",marginBottom:"-20px"}}> <FontAwesomeIcon  icon={faKeyboard} size="8x" />  </p>
         <p style={{color:"red",fontSize:"50px",fontWeight:"normal",marginTop:"0px"}}>fast fingers</p>
        
         <h2 class="decorated"><span>The ultimate typing game</span></h2>
        
   <div class="player-info">
       <form onSubmit={this.handleClick}>
           <div class="form-field">
          <input type="text" name="playername" id="playername" placeholder="Player name" value={playername} onChange={this.handleChange}></input>
          </div >
           <div class="form-field"></div>
           <select name='selectedOption' onChange={this.handleChange} >
        {this.state.options.map(i => i === this.state.selectedOption ? (
        <option value={i} selected>
          {i}
        </option>
        ) : (<option value={i}>{i}</option>) )}
      </select>
           <div class="row">
           <div class="form-field-font">
     
      <button onClick={this.handleClick} style={{background:"transparent",color:"red",marginRight:"20px"}}><FontAwesomeIcon  icon={faPlay} size="3x" /></button><p style={{fontSize:"40px",color:"red"}}>start game</p>
      </div>
           </div>
      
        

       </form>
   </div>

   
</div>  



<div class="row">
               

<div class="col-lg-6" style={{marginLeft:"20%"}}>


</div>
</div>

</div>
            
        );
    }


}