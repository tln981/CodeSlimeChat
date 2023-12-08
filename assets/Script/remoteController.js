
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    onLoad(){
        this.anim=this.node.getChildByName("slimeSprite").getComponent(cc.Animation);
    },
move(posX,posY){
    this.node.stopAllActions();
    this.node.runAction(cc.moveTo(0.2, posX,  posY));
},
setAnimation(anim){
this.anim.play(anim);
}
});
