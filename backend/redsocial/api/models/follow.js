'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


var Schema = mongoose.Schema;

var FollowSchema = Schema({
    emitter:{ type: Schema.ObjectId, ref:'User'},
        followed: { type: Schema.ObjectId,ref:'User'} 
        

        
        
});
FollowSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Follow', FollowSchema);