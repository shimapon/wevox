import React from 'react'


class Home extends React.Component {

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
        <li>11/7更新</li>
        <li>webox value cardsがオンラインで楽しむことができます</li>
        <li>60枚の山札から5枚手札として持ち，順番に1枚引き，自分の価値観から遠いカードを捨てていくことで，自分だけの5枚の手札を構成しましょう</li>
        <li><a href="https://wevox.io/valuescard" target="_blank">詳しいルール</a></li>
        <li>herokuにサーバをデプロイしているため，基本レスポンスが遅いです</li>
        <li>ゲーム中に誰かが退出してしまうとゲームが続行できません</li>
        <li>部屋一覧に乗っている部屋は昔に立てられてそのまま残っているものもあります．</li>
        <li>友達か自分が新しく部屋を作成して入るようにしましょう</li>
      </div>
    )
  }
}

export default Home;
