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
        server:cc.Component,
        deltatime:0.2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.moving = false;
        this.moveSpeed = 20;
        this.anim=this.node.getChildByName("slimeSprite").getComponent(cc.Animation);
        this.currentAnimation="idle";
    },

    start() {

    },
    onKeyDown: function (event) {
        this.moving = true;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.playAnimation("left");
               
                if(this.node.x - this.deltatime * this.moveSpeed>-600){
                    this.server.updatePos( this.node.x - this.deltatime * this.moveSpeed,this.node.y);
                    this.node.runAction(cc.moveTo(this.deltatime, this.node.x - this.deltatime * this.moveSpeed, this.node.y));
                }

                break;
            case cc.macro.KEY.d:
                this.playAnimation("right");
                if(this.node.x + this.deltatime * this.moveSpeed<140){
                    this.server.updatePos(this.node.x + this.deltatime * this.moveSpeed,this.node.y);
                    this.node.runAction(cc.moveTo(this.deltatime, this.node.x + this.deltatime * this.moveSpeed, this.node.y));
                }
                break;
            case cc.macro.KEY.w:
                this.playAnimation("up");
                if(this.node.y + this.deltatime * this.moveSpeed<230){
                    this.server.updatePos(this.node.x, this.node.y + this.deltatime * this.moveSpeed);
                    this.node.runAction(cc.moveTo(this.deltatime, this.node.x, this.node.y + this.deltatime * this.moveSpeed));
                    
                }
                break;
            case cc.macro.KEY.s:
                this.playAnimation("idle");
                if( this.node.y - this.deltatime * this.moveSpeed>-230){
                    this.server.updatePos(this.node.x, this.node.y - this.deltatime * this.moveSpeed);
                    this.node.runAction(cc.moveTo(this.deltatime, this.node.x, this.node.y - this.deltatime * this.moveSpeed));
                }
                break;
        }
    },

    onKeyUp: function (event) {
        this.node.stopAllActions();
        this.playAnimation("idle");
        this.moving = false;
        this.node.stopAllActions();
    },
    playAnimation(animName){
        if(this.currentAnimation!=animName){
            this.currentAnimation=animName;
            this.anim.play(this.currentAnimation);
            this.server.sendAnimation(this.currentAnimation);
        }
    }
    // update (dt) {},
});
