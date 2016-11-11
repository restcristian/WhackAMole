var WHACKAMOLE = {};

WHACKAMOLE.MODELS = {
    Mole: function(xVal, yVal, speedVal, pointedElement) {
        var self = this;
        var Position = {
            x = xVal || 0,
            y = yVal || 0
        };
        var dx = 0;
        var dy = 0;
        var speed = speedVal || 1;
        var pointer = pointedElement;
        var states = ['normal', 'hitted'];
        var currentState = states[0];
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
    Stage: function(pointedElement, speedVal, molesVal) {
        var self = this;
        var pointer = pointedElement;
        var speed = speedVal || 1;
        var score = 0;
        var Moles = molesVal || []; //Collection of  Moles
        var MAXSCORE = 10;
        var timer = 100;
        var statusInterval = function(){};

        self.increaseScore = function() {
            score++;
        };

        self.checkGameStatus = function() {
            if (score === MAXSCORE || time === 0 ) {
                self.gameOver();
            }
        };

        self.autoUpdateStatus = function(){
            statusInterval = setTimeout(updateStatus,1000);
        };

        self.pauseUpdateStatus = function(){
            clearInterval(statusInterval);
        };

        self.updateStatus = function(){
            self.updateTimer();
        };

        self.updateTimer = function(){
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

