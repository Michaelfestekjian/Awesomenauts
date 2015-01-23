game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    //get shape is for mellon.js its the version our code needs to have to run with it :)
                    return(new me.rect(0, 0, 64, 64,)).toPolygon();
                }
            }]);
    },
    
    update: function(){
        
    }
});

//all of this is to add the player