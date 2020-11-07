import React from 'react';
import '../../index.css';
import ResultMain from '../Organisms/ResultMain';
import Button from '../Atoms/Button';
import MHeader from '../Molecules/Header';

class Result extends React.Component {

  handleClickexitbutton(e){
    alert("退出します．")
    this.props.history.push('/Top')
  }

  render(){
    return(
      <div className="result">
          <MHeader
            headertext={"結果"}
          />
          <div className="result-main">
            <ResultMain
              owncards={this.props.history.location.state.owncards}
            />
          </div>
          <div className="result-button">
            <Button
              text="退出"
              onClick={(e)=>this.handleClickexitbutton(e)}            
            />
          </div>
      </div>
    )
  }
}


export default Result
