
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0,
        enemyBaseHealth: 10,
        playerBaseHealth: 10,
        enemycreephealth: 10,
        playerhealth: 10,
        enemyCreepAtack: 1,
        playerAttack: 1,
        playerAttackTimer: 1000,
        creepAtackTimer: 1000,
        playerMoveSpeed: 5,
        creepMoveSpeed: 5,
        gameManager: "",
        player: "",
    },
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        //changed the nimbers so our screen can see and know what size to run

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    //loads the function to run 
    "loaded": function() {
        me.pool.register("player", game.PlayerEntity, true);
        me.pool.register("PlayerBase", game.PlayerBaseEntity);
        me.pool.register("EnemyBase", game.EnemyBaseEntity);
        me.pool.register("EnemyCreep", game.EnemyCreep, true);
        me.pool.register("GameManager", game.GameManager);



        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
