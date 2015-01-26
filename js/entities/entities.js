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
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        this.body.setVelocity(5, 20);
        //all we did this video is make the player on the floor and changed the tiled code and stuff 
    },
    
    update: function(delta){
        //if u have delta here u need to also have it at the bottom 
        if(me.input.isKeyPressed("right")){
           
            this.body.vel.x += this.body.accel.x *me.timer.tick;
            //this is a tick so on key when u his the ky is will go right 
        }else{
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        return true;
        //need this code to make player move 
        
    }
});

//all of this is to add the player