
const mongoose=require('mongoose')
const moment=require('moment')
moment.locale('zh-cn');
const Schema=mongoose.Schema;
const articleScheme=new Schema({
    title:String,
    content:String,
    abstract:String,
    tags:[{
        type:Schema.Types.ObjectId,
        ref:'tag'
    }],
    publish:{
        type:Boolean,
        default:false
    },
    createTime:{
        type:Date
    },
    lastEditTime:{
        type:Date,
        default:Date.now
    }
},{
    versionKey:false//??
});
articleScheme.set('toJSON',{
    getters:true,
    virtuals:true
});
articleScheme.set('toObject',{
    getters:true,
    virtuals:true
});
articleScheme.path('createTime').get(function(v){
    return moment(v).format('lll');
});
articleScheme.path('lastEditTime').get(function(v){
    return moment(v).format('lll');
});

module.exports=mongoose.model('article',articleScheme);