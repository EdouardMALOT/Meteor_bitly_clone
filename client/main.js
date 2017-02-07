import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return(
    <h1>Hello there</h1>
  ); 
};


Meteor.startup(() => {
  // code to run on server at startup
  ReactDOM.render(<App />, document.querySelector('.container'));
});
