import { Mongo } from 'meteor/mongo';
import validUri from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
    'link.insert' : function(url){
        //Check is it is a valid URL
        check(url, Match.Where(url => validUri.isUri(url)));

        //Create a token (random number)
        const token = Math.random().toString(36).slice(-5);

        //Save it into MongoDB
        Links.insert({url, token, clicks: 0, lastUpdate: "Not yet"});
        console.log("New linked added");
    }
});

export const Links = new Mongo.Collection('links');
