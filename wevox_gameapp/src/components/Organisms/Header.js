import React from 'react';
import '../../index.css';
import MHeader from '../Molecules/Header';
import Button from '../Atoms/Button';


class Header extends React.Component {
    
  render() {
    return (
        <div className="o_header">
            <Button
                text = {this.props.text}
                onClick={this.props.onClick}
            />
            <MHeader
                headertext={this.props.headertext}
            />
        </div>
    );
  }
}

export default Header;
