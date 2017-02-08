import React from 'react';

class LinkCreate extends React.Component{

    submitHandler(event) {
        event.preventDefault();
        Meteor.call('link.insert', this.refs.input.value);
    }

    render() {
        return(
            <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="form-group">
                        <label>Link to shorten</label>
                        <input ref="input" className="form-control" />
                    </div>
                    <button className="btn btn-primary">Shorten!</button>
            </form>
        );
    }
}

export default LinkCreate;
