import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';


class LinkList extends React.Component {

    renderRow(){

        return this.props.links.map((link) => {

            const {url, token, clicks} = link;

            let shortLink = `http://localhost:3000/${token}`;

            return(
                <tr key={token}>
                    <td>{url}</td>
                    <td><a href={shortLink}>shortLink</a></td>
                    <td>{clicks}</td>
                </tr>
            );
            
        })
    }

    render(){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Adress</th>                    
                        <th>Clicks</th>                    
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        );
    }
}


export default createContainer(() => {

    Meteor.subscribe('links');
    return { links: Links.find({}).fetch() };

},LinkList);
