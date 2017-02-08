import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup

    Meteor.publish('links', function(link_per_page) {
      return Links.find({}, {limit: link_per_page});
    })

});


function onRoute(req, res, next) {

  let link = Links.findOne({ token: req.params.token});

  if(link){
    //Increment clicks in DB
      Links.update(link, { $inc: { clicks: 1}});

    //Update last click date
      let today = new Date();
      let date = today.toISOString().substring(0, 19).replace("T", " ");

      link = Links.findOne({ token: req.params.token});
      Links.update(link, { $set: { lastUpdate: date}});

    //Redirect
      res.writeHead(307, {'Location': link.url});
      res.end();
  }else{
      next();
  }

}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});


//WebApp.connectHandlers.use( req => console.log(req));
WebApp.connectHandlers.use( middleware);