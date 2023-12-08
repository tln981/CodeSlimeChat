cc.Class({
    extends: cc.Component,

    properties: {
        inputName: cc.EditBox,
        serverConnect: cc.Node,
        button:cc.Button,
        avatar:cc.Node
    },
    onLoad() {
        this.data = {
            name: "",
            indexAvatar:0
        }
    },
    checkButton(){
        if(this.inputName.string.trim().length==0){
            this.button.interactable=false;
        }else{
            this.button.interactable=true;
        }
    },
    connect() {
        this.data.name = this.inputName.string.trim();
        if(this.data.name!=''){
            this.data.indexAvatar=this.avatar.getComponent("LoadAtlas").indexAvatar;
            this.inputName.string = "";
            this.inputName.blur();
            this.serverConnect.getComponent("ServerCall").connect(this.data);
        }
    }
});
