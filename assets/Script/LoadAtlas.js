// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        avatar:cc.SpriteAtlas,
        indexAvatar:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.spriteFrames = this.avatar.getSpriteFrames();
      this.changeAvatar(this.indexAvatar);
      console.log("load");
    },

    start () {
    },

    update (dt) {

    },
    changeAvatar(index){
        if(isNaN(index)){
            this.indexAvatar++;
            index=this.indexAvatar;
        }
        if(this.indexAvatar>=this.spriteFrames.length)
        {
            this.indexAvatar=0;
            index=this.indexAvatar;
        }else{
           this.indexAvatar=index;
        }
        this.node.getComponent(cc.Sprite).spriteFrame=this.spriteFrames[index];
    },
    changeAvatarPre(index){
        if(isNaN(index)){
            this.indexAvatar--;
            index=this.indexAvatar;
        }
        if(this.indexAvatar<0)
        {
            this.indexAvatar=this.spriteFrames.length-1;
            index=this.indexAvatar;
        }else{
           this.indexAvatar=index;
        }
        this.node.getComponent(cc.Sprite).spriteFrame=this.spriteFrames[index];
    },
    changeAvatarWithIndex(index){
        this.spriteFrames = this.avatar.getSpriteFrames();
        this.changeAvatar(index);
    }
});
