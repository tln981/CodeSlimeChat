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
        messPrefab: [cc.Prefab],
        playerPrefabs:[cc.Prefab],
        chatBox: cc.ScrollView,
        inputField: cc.EditBox,
        onlineUsers: cc.Label,
        playGround:cc.Sprite,
        clientPlayer:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.clientName = "TheNam";
        this.data = {
            name: "",
            content: "",
            index:0,
            socketId:""
        }
     this.socketNodeMap = {};
    },

    start() {

    },
    sendMess() {
        let mess = this.inputField.string.trim();
        this.inputField.string = "";
        if(mess!=''){
            this.data.name = this.clientName;
            this.data.content = mess;
            let messPre = cc.instantiate(this.messPrefab[0]);
            messPre.getComponent("DisplayMess").displayUi(this.data);
            messPre.parent = this.chatBox.content;
            this.node.getComponent("ServerCall").sendMess(this.data);
            this.clientPlayer.getChildByName("BubleChatController").getComponent("BubbleChat").displayChat(mess);
            this.chatBox.scrollToBottom(0.5);
        }
        this.scheduleOnce(() => {
            this.inputField.focus();
        }, 0.1);
    },
    addMess(obj) {
        let messPre = cc.instantiate(this.messPrefab[1]);
        messPre.getComponent("DisplayMess").displayUi(obj);
        messPre.parent = this.chatBox.content;
      this.socketNodeMap[obj.socketId].getChildByName("BubleChatController").getComponent("BubbleChat").displayChat(obj.content);
      this.chatBox.scrollToBottom(0.5);
    },
    updateUserQuantity(count) {
        this.onlineUsers.string = count;
    },
    updateNotification(content){
        let messPre = cc.instantiate(this.messPrefab[2]);
        messPre.getComponent("DisplayNotification").showDisplay(content);
        messPre.parent = this.chatBox.content;
    },
    addPlayer(){
        let player=cc.instantiate(this.playerPrefabs[0]);
        player.getChildByName("name").getComponent(cc.Label).string=this.clientName;
        player.getComponent("clientPlayerController").server=this.node.getComponent("ServerCall");
        player.parent=this.playGround.node;
        player.x=0;
        player.y=0;
        this.clientPlayer=player;
    },
    addRemotePlayer(socketId,name,posX,posY){
        let player=cc.instantiate(this.playerPrefabs[1]);
        player.getChildByName("name").getComponent(cc.Label).string=name;
        player.parent=this.playGround.node;
        player.x=posX;
        player.y=posY;
        this.socketNodeMap[socketId]=player;
    },
    removeRemotePlayer(socketId){
        this.socketNodeMap[socketId].destroy();
        delete this.socketNodeMap[socketId];
    },
    addAllRemotePlayer(arr){
        arr.forEach(element => {
            this.addRemotePlayer(element.socketId,element.name,element.posX,element.posY);
        });
    }
    // update (dt) {},
});
