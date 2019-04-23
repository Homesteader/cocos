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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        maxStarDuration: 20,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        scoreLable: {
            default: null,
            type: cc.Label
        },

        scoreAudio:{
            default: null,
            type: cc.AudioClip
        },

        score: {
            default: 0,
            displayName: "Score (player)",
            tooltip: "The Score of player",
        },

        playBtn: {
            default: null,
            type: cc.Button
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
        this.score = 0;
        this.timer = 0;
        this.maxStarDuration = 20;
    },

    spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        if (newStar != null) {
            this.node.addChild(newStar);
            newStar.setPosition(this.getNewStatPosition());

            newStar.getComponent("Star").game = this;
        }

        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStatPosition() {
        var randX = 0;
        var playerHeight = this.player.getComponent('Player').jumpHeight;
        cc.log(playerHeight)
        var randY = this.groundY + Math.random() * playerHeight + 50;

        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        return cc.v2(randX, randY)

    },

    gainScore() {
        this.score += 1;
        this.scoreLable.string = "score: " + this.score;
        cc.audioEngine.playEffect(this.scoreAudio,false);
    },

    gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('helloworld');
    },

    start() {

    },

    update(dt) {
    
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }

        this.timer += dt;
    },
});
