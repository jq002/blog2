
const Tag=require('../models/tag');
const jwt=require('jsonwebtoken');
const config=require('../config');

class TagController{
    static async createTag(ctx){
        const tagName=ctx.request.body.name;
        if(tagName==""){
            ctx.throw(400, 'tagname is empty ');
        }
        const tag=await Tag.findOne({name:tagName}).catch(err=>{
            ctx.throw(500,'server error')
        });
        if(tag!==null){
            ctx.body={
                success:false,
                message:"tag already exist"
            }
            return;
        }
        const newTag=new Tag({
            name:tagName
        });
        const result=await newTag.save().catch(err=>{
            ctx.throw(500,'server error !!!')
        })
        ctx.body={
            success:true,
            tag:result
        }
    }
    static async getAllTag(ctx){
        const tagArr=await Tag.find().catch(err=>{
            ctx.throw(500,'server error !!!')
        });
        ctx.body={
            success:true,
            tagArr
        }
    }
    static async  deleteTag(ctx) {
        const id = ctx.params.id;
        const tag = await Tag.findByIdAndRemove(id).catch(err => {
          if (err.name === 'CastError') {
            ctx.throw(400, 'id is not exist');
          } else {
            ctx.throw(500, 'server error !!!')
          }
        });
        ctx.body = {
          success: true
        }
      }
}
module.exports=TagController