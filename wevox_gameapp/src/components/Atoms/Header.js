import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function Header(props){
  return(
      <header className="header">
        {props.headertext}
      </header>
  );
}

export default Header;
