import React from 'react';

class LinkCreate extends React.Component{

    constructor(props){
        super(props);
        this.state = {error: ''};
    }

    submitHandler(event) {
        event.preventDefault();
        Meteor.call('link.insert', this.refs.input.value, (error) => {
            if(error){
                this.setState({ error: 'You url is not valid'});            //Display error msg
            }else{
                this.setState({ error: ''});                                //Reset error msg
                this.refs.input.value = '';
            }
        });
    }

    render() {
        return(
            <form onSubmit={this.submitHandler.bind(this)}>
                    <div style={{height:30}}></div>
                    <div className="form-group">
                        <label>Link to shorten</label>
                        <input ref="input" className="form-control" />
                    </div>
                    <div className="text-danger">{this.state.error}</div>
                    <button className="btn btn-primary">Shorten!</button>
                    <div style={{height:50}}></div>
            </form>
        );
    }
}

export default LinkCreate;
