
cc.Class({
    extends: cc.Component,

    properties: {
        bubbleChat:cc.Node,
      content:cc.Label,
      topSpace:cc.Node,
      bottomSpace:cc.Node
    },


    // onLoad () {},

    start () {

    },
    displayChat(content){
        var sqe=cc.sequence(
            cc.callFunc(()=>{
                this.bubbleChat.active=true;
                this.content.string=content;
                this.topSpace.width=this.content.width/3;
                this.bottomSpace.width=this.content.width/3;
            }),
            cc.delayTime(3),
        cc.callFunc(()=>{
            this.bubbleChat.active=false;
        }),
        );
        this.node.runAction(sqe);
    }
    // update (dt) {},
});
