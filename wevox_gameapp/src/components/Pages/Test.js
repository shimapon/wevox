import React from 'react';
import '../../index.css';
import ResultMain from '../Organisms/ResultMain';
import Button from '../Atoms/Button';
import MHeader from '../Molecules/Header';



class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      owncards:[
        ["A",["大切","心","まさき","ないちゅ","画面"]],
        ["B",["大切","心","まさき","ないちゅ","画面"]],
        ["C",["大切","心","まさき","ないちゅ","画面"]],
        ["D",["大切","心","まさき","ないちゅ","画面"]]
      ]
    }
  }

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
          <div className="p-result">
            <ResultMain
              owncards={this.state.owncards}
            />

          </div>
          <div className="result-button">
            <Button
                text="退出"
            />
          </div>
      </div>
    )
  }
}


export default Test
