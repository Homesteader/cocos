// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Item = cc.Class({
    name : "item",
    properties:{
        id : 0,
        itemName : '',
        itemPrice : 0,
        iconStr : cc.SpriteFrame,
    },
});

cc.Class({
    extends: cc.Component,

    properties: {
        items: {
            default : [],
            type: Item
        },
        itemPrefabe : cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (var i = 0; i < this.items.length; ++i){
            var item = cc.instantiate(this.itemPrefabe);
            var data = this.items[i];
            this.node.addChild(item);
            item.getComponent('ItemTemplate').init({
                id: data.id,
                itemName: data.itemName,
                itemPrice: data.itemPrice,
                icon: data.iconStr
            })
        }
    },

    start () {

    },

    // update (dt) {},
});
