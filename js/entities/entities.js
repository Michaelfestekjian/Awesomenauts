game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    //get shape is for mellon.js its the version our code needs to have to run with it :)
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        this.body.setVelocity(5, 20);
         me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //all we did this video is make the player on the floor and changed the tiled code and stuff 

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
         this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        //if u have delta here u need to also have it at the bottom 
        if (me.input.isKeyPressed("right")) {

            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
        }
        else if (me.input.isKeyPressed("left")) {
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        //this is a tick so on key when u his the ky is will go right 
        else {
            this.body.vel.x = 0;
        }
       
    
        
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }

        }
        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }


        } else {
            this.renderable.setCurrentAnimation("idle");
        }
        
         if (me.input.isKeyPressed("attack")){
        if(!this.renderable.isCurrentAnimation("attack")){
            //setd the current animation to attack and once that is over then
            // goas back toy the idle animation
            this.renderable.setCurrentAnimation("attack", "idle");
            //the next time we dtatt rhis we begin 
            //from the first anumation not when we switched to another animation 
            this.renderable.setAnimationFrame();
        }   
        
        }
        
        
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);

        return true;
        //need this code to make player move 

    }
});

//all of this is to add the player

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.allwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "PlayerBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken, [1]");
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }

});
//_____________________________________________________________________________________________________________________________________________________

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.allwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "EnemyBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken, [1]");
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }

});