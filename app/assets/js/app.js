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

        self.increaseScore = function() {
            score++;
        };

        self.checkGameStatus = function() {
            if (score === MAXSCORE) {
                self.gameOver();
            }
        };

        self.gameOver = function() {

        };

        self.render = function() {

        };


        //Constructor
        (function() {
            self.render();
        })();

    }

};

