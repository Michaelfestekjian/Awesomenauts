game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;
        me.levelDirector.loadLevel("level01");

        this.resetPlayer(0, 420);

        var gamemanager = me.pool.pull("GameManager", 0, 0, {});
        me.game.world.addChild(gamemanager, 0);

        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "attack");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        //this it to acutelly show the player on the screen in the game 
        //so you can run and see somthing on the screen 

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    resetPlayer: function(x, y){
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 5);
    }
});
