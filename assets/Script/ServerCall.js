const io = require('socket.io-client');
cc.Class({
    extends: cc.Component,

    properties: {
        currentScene: cc.Node,
        targetScene: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },
    sendMess(data) {
        this.socket.emit('chatMessage', data.content);
    },
    connect(data) {
        //172.16.1.50
        //https://chat-atar.onrender.com
        this.socket = io('https://chat-atar.onrender.com');
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.socket.emit('join', {name:data.name,indexAvatar:data.indexAvatar});
            this.currentScene.active = false;
            this.targetScene.active = true;
            this.node.getComponent("ChatManager").data.socketId = this.socket.id;
            this.node.getComponent("ChatManager").data.indexAvatar =data.indexAvatar;
            this.node.getComponent("ChatManager").clientName = data.name;
            this.node.getComponent("ChatManager").addPlayer();
            this.addEventListener();
        });
    },
    updatePos(posX, posY) {
        this.socket.emit('updatePosition', { posX: posX, posY: posY });
    },
    addEventListener() {
        this.socket.on('onlineUsers', data => {
            if (data.flag) {
                this.node.getComponent("ChatManager").updateNotification(data.userName + " has joined");
                if (this.socket.id != data.socketId) {
                    cc.log(data);
                    this.node.getComponent("ChatManager").addRemotePlayer(data.socketId, data.userName,data.onlineUsers[data.socketId].posX,data.onlineUsers[data.socketId].posY);
                }
                if (Object.keys(data.onlineUsers).length > Object.keys(this.node.getComponent("ChatManager").socketNodeMap).length) {
                    let remotePlayers = [];
                    //cc.log(this.node.getComponent("ChatManager").socketNodeMap);
                    for (const socketId in data.onlineUsers) {
                        if (!(socketId in this.node.getComponent("ChatManager").socketNodeMap)) {
                            if (socketId != this.socket.id) {
                                data.onlineUsers[socketId].socketId = socketId;
                                remotePlayers.push(data.onlineUsers[socketId]);
                            }
                        }
                    }
                    this.node.getComponent("ChatManager").addAllRemotePlayer(remotePlayers);
                    //cc.log("arr",remotePlayers);
                }
            } else {
                this.node.getComponent("ChatManager").updateNotification(data.userName + " has out");
                //cc.log(data.socketId);
                this.node.getComponent("ChatManager").removeRemotePlayer(data.socketId);
            }
            this.node.getComponent("ChatManager").updateUserQuantity(Object.keys(data.onlineUsers).length);
        })
        this.socket.on('remoteMessage', data => {
            if (this.socket.id != data.socketId) {
                this.node.getComponent("ChatManager").addMess(data);
            }
        })
        this.socket.on('remotePosition', data => {
            if (data.socketId != this.socket.id) {
                this.node.getComponent("ChatManager").socketNodeMap[data.socketId].getComponent("remoteController").move(data.posX, data.posY);
            }
        });
        this.socket.on('remoteAnimation',data=>{
            if (this.socket.id != data.socketId){
                let remotePlayer=this.node.getComponent("ChatManager").socketNodeMap[data.socketId];
                remotePlayer.getComponent("remoteController").setAnimation(data.animation);
            }    
        });
    },
    sendAnimation(anim){
        this.socket.emit('animation',anim);
    }
    // update (dt) {},
});
