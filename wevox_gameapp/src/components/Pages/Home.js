import React from 'react'



class Home extends React.Component {
  // Component が Mount された後に実行されるメソッド
  componentDidMount() {
    console.log("start");
  }

  handleToTopPage = () => {
  this.props.history.push('/Top')
}


  render(){
    return(
      <div>
        <h1>Home</h1>
        <button onClick={this.handleToTopPage}>
          部屋入室ページへ
        </button>
      </div>
    )
  }
}

export default Home;
