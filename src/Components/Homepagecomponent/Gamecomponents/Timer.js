import React from 'react';
import { CircularProgressbar , buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 2000,
      timePercentage: 0,
      displayTime:"0:00",
      end: 2000
    }
    
    this.interval = null;
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timeToString = this.timeToString.bind(this);
    this.props.resetCallback(this.resetTimer);
  }

  startTimer() {
    // const totalTime = this.state.end;
    this.timer = setInterval(() => {
      const timePercentage = ((this.state.end - this.state.time) / this.state.end) * 100;
      this.setState({ timePercentage });
      if (this.state.time<10){ 
        clearInterval(this.timer);
        this.props.timeouted();
        return;
      }
      this.setState({time:this.state.time-10});
      this.setState({displayTime:this.timeToString(this.state.time)});
 
    }, 10)
  }

  resetTimer(newTime) {
    
    console.log("calling from child"+newTime)
    clearInterval(this.timer);
    this.setState({end:newTime*1000});
    this.setState({time:newTime*1000});
    this.setState({timePercentage:0})
    this.startTimer();
  }

  timeToString(durationInMillis) {
    var second = Math.floor(durationInMillis/1000);
    var millis = (durationInMillis-(second*1000))/10;
    return second.toString()+":"+millis.toString();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
 
  render() {
    return(<div style={{width:"200px",height:"200px"}}>
        <CircularProgressbar 
        value={this.state.timePercentage}
        text={this.state.displayTime}
        strokeWidth={5}
        styles={buildStyles({
            // Colors
            pathColor: `rgba(62, 152, 199, ${this.state.timePercentage / 100})`,
            textColor: 'red',
            trailColor: 'red',
            backgroundColor: '#3e98c7',
          })}
        
        /></div>
    );
  }
}


export default Timer;