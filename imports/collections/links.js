import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'link.insert' : function(url){
        console.log("We will save : ", url);
    }
});

export const Links = new Mongo.Collection('links');
