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
                    //shapes for melon.js 
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        this.type = "PlayerEntity";
        this.health = game.data.playerhealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.faceing = "right";
        this.now = new Date().getTime;
        this.lastHit = this.now;
        this.latsAttack = new Date().getTime();
        //keeps track of the direction of wich way your carekter is going 
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
            this.faeing = "right";
            this.facing = "right";
            this.flipX(true);
        }
        else if (me.input.isKeyPressed("left")) {
            this.facing = "left";
            this.flipX(false);
            this.facing = "left";
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



            if (me.input.isKeyPressed("attack")) {
                if (!this.renderable.isCurrentAnimation("attack")) {
                    console.log(!this.renderable.isCurrentAnimation("attack"));
                    //setd the current animation to attack and once that is over then
                    // goas back toy the idle animation
                    this.renderable.setCurrentAnimation("attack", "idle");
                    //the next time we dtatt rhis we begin 
                    //from the first anumation not when we switched to another animation 
                    this.renderable.setAnimationFrame();
                }

            }

        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }


        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log(!this.renderable.isCurrentAnimation("attack"));
                //setd the current animation to attack and once that is over then
                // goas back toy the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //the next time we dtatt rhis we begin 
                //from the first anumation not when we switched to another animation 
                this.renderable.setAnimationFrame();
            }

        }

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
        //need this code to make player move 

    },
    losehealth: function(damage) {
        //console.log(this.health)
        this.health = this.health - damage;
    },
    collideHandler: function(responce) {
        if (responce.b.type === 'EnemyBaseEntity') {
            var ydif = this.body.pos.y - responce.b.pos.y;
            var xdif = this.body.pos.x - responce.b.pos.x;
            console.log("xdif " + xdif + " ydif " + ydif);
            if (xdif > -35 && this.true.facing === 'right') {
                this.body.vel.x = 0;
                this.body.pos.x = this.pos.x - 1;
            } else if (xdif < 70 && this.facing === 'left') {
                this.body.vel.x = 0;
                this.body.pos.x = this.body.pos.x + 1;
                //makes so you are faceing your way when walking 
            }

            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000) {
                ;
                this.lastHit = this.now;
                responce.b.loseHealth();
            }
        } else if (responce.b.type === 'EnemyCreep') {
            var xdif = this.pos.x - responce.b.pos.x;
            var ydif = this.pos.y - responce.b.pos.y;

            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                if (this.faceing === "left") {
                    this.vel.x = 0;
                h
            } else {
                this.pos.x = this.pos.x - 1;
                if (this.faceing === "right") {
                    this.vel.x = 0;
     
                
                
                
                
                
                
                
                
                }
            }
        }

        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.faceing === "left") || ((xdif < 0) && this.faceing === 'right'))) {

            this.lastHit = this.now;
            responce.b.loseHealth(1);
        }
    }
;
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
        if (this.health <= 0) 
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    loseHealth: function(damage) {
        this.this.heath = this.health - damage;
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

    },
    loseHealth: function() {
        this.health--;
    }
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).stoPolygon();
                }
            }]);

        this.health = 10;
        this.allwaysUpdate = true;

        this.attacking = false;

        this.lestAttacking = new Date().getTime();

        this.lastHit = new Date().getTime();tt
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        this.type = "EnemyCreep";


        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }
        this.now = new Date().getTime();
        this.body.vel.x -= this.accel.x * me.timer.tick;
        me.collision.check(this, true, this.collidHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(responce) {
        if (responce.b.type === 'PlayerBase') {
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;

            if ((this.now - this.lastHit >= 1000)) {
                this.lastHit = this.now;
                responce.b.loseHealth(1);
            }
        } else if (responce.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - responce.b.pos.x;

            this.attacking = true;
            this.lastAttacking = this.now;

            if (xdif > 0) {
                console.log(xdif);
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }


            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                this.lastHit = this.now;
                responce.b.loseHealth(1);
            }
        }
    }
});

game.GameManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime;
        this.lastCreep = new Date().getTime;
        this.now = new Date().getTime();
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime;

        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creeps = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.worldaddChild("creepe", 5);
        }
        return true;
    }
});
//