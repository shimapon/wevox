import React from 'react';
import '../../index.css';
import FormButton from '../Molecules/FormButton';
import FormLabel from '../Molecules/FormLabel';

// 手札のコンポーネント
class Form extends React.Component {
    
    render() {
        return (
            <div className="o-form">
                <form>
                    <FormLabel
                        roomname={this.props.roomname}
                        username={this.props.username}
                        handleChangeroomname={this.props.handleChangeroomname}
                        handleChangeusername={this.props.handleChangeusername}
                    />
                    <FormButton
                        handleSubmit={this.props.handleSubmit}
                        handleAlternate={this.props.handleAlternate}
                    />
                </form>
            </div>
        );
  }
}

export default Form;
