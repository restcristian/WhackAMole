//Namespace declaration
var WHACKAMOLE = {};

//Declaring models
WHACKAMOLE.MODELS = {
    Mole: function(params) {
        var self = this;
        var Position = {
            x = params.xVal || 0,
            y = params.yVal || 0
        };
        var dx = 5;
        var dy = 5;
        var speed = params.speedVal || 1;
        var pointer = params.pointedElement || {};
        var states = {
            VISIBLE: 0,
            INVISIBLE: 1,
            HIT: 2
        };
        var currentState = states.VISIBLE;
        var animationInterval = function() {};

        self.moveUp = function() {
            Position.y -= dy;
        };

        self.moveDown = function() {
            Position.y += dx;
        };

        self.render = function() {
            //TODO
        };
        //Constructor
        (function() {
            self.render();
        })();

    },
    Stage: function(params) {
        var self = this;
        var pointer = params.pointedElement;
        var speed = params.speedVal || 1;
        var score = 0;
        var Moles = params.molesVal || []; //Collection of  Moles
        var MAXSCORE = 10;
        var TIMER = 100;
        var statusInterval = function() {};

        self.increaseScore = function() {
            score++;
        };

        self.checkGameStatus = function() {
            if (score === MAXSCORE || TIMER === 0) {
                self.gameOver();
            }
        };

        self.autoUpdateStatus = function() {
            statusInterval = setTimeout(updateStatus, 1000);
        };

        self.pauseUpdateStatus = function() {
            clearInterval(statusInterval);
        };

        self.updateStatus = function() {
            self.checkGameStatus();
            self.updateTimer();
        };

        self.updateTimer = function() {
            timer--;
        }

        self.gameOver = function() {
            //TODO
        };

        self.render = function() {
            //TODO
        };


        //Constructor
        (function() {
            self.autoUpdateStatus();
            self.render();
        })();

    }

};
//Declaring Logic (including eventHandlers)
WHACKAMOLE.LOGIC = {
    EVENTS = {
        onStageInit: function() {
            //TODO

        },
        onMoleClick: function(e) {
            //TODO
            this.currentState = states.HIT;
        }

    }

};