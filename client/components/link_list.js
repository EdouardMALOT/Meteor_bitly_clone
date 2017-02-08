import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

const LINK_PER_PAGE = 5;
const SERVER_URL = 'http://localhost:3000';

class LinkList extends React.Component {

    constructor(props) {
        super(props);
        this.more_cpt = 1;
    }

    buttonHandler() {
        this.more_cpt++;
        Meteor.subscribe('links', LINK_PER_PAGE*this.more_cpt);
    }

    renderRow(){
        return this.props.links.map((link) => {
            const {url, token, clicks, lastUpdate} = link;
            let shortLink = `${SERVER_URL}/${token}`;

            return(
                <tr key={token}>
                    <td>{url}</td>
                    <td><a href={shortLink}>{shortLink}</a></td>
                    <td>{clicks}</td>
                    <td>{lastUpdate}</td>
                </tr>
            );            
        })
    }

    displayButton(){
        if (this.props.links.length >=  LINK_PER_PAGE*this.more_cpt){
            return(
                <button 
                    onClick={this.buttonHandler.bind(this)} 
                    className="btn btn-secondary">
                    More
                </button>
            );
        }
    }

    render(){
        return(
            <div>
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Short link</th>                    
                            <th>Nb Clicks</th>                    
                            <th>Last click</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
                {this.displayButton()}
            </div>
        );
    }
}


export default createContainer(() => {

    Meteor.subscribe('links', LINK_PER_PAGE);
    return { links: Links.find({}).fetch() };

},LinkList);
