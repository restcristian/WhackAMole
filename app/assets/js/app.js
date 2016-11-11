//Namespace declaration
var WHACKAMOLE = {};

//Declaring models
WHACKAMOLE.MODELS = {
    Mole: function(params) {
        var self = this;
        var Position = {
            x: (params.xVal) || 0,
            y: (params.yVal) || 0
        };
        var dx = 5;
        var dy = 5;
        var speed = params.speedVal || 1;
        var pointer = params.elementInDOM || {};
        var STATES = {
            VISIBLE: 0,
            INVISIBLE: 1,
            HIT: 2
        };
        var currentState = STATES.VISIBLE;
        var animationInterval = function() {};

        self.moveUp = function() {
            Position.y -= dy;
        };

        self.moveDown = function() {
            Position.y += dx;
        };

        self.initialize = function() {
            //TODO
            pointer.addEventListener('click',
               function(){
                   currentState = STATES.HIT;
                   console.log(pointer.id+' state:'+currentState);
               }
            );

        };
        //Constructor
        (function() {
            self.initialize();
        })();

    },
    Stage: function(params) {
        var self = this;
        var pointer = params.elementInDOM;
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
            statusInterval = setTimeout(self.updateStatus, 1000);
        };

        self.pauseUpdateStatus = function() {
            clearInterval(statusInterval);
        };

        self.updateStatus = function() {
            self.checkGameStatus();
            self.updateTimer();
        };

        self.updateTimer = function() {
            TIMER--;
        }

        self.gameOver = function() {
            //TODO
        };

        self.initialize = function() {
            //TODO
        };


        //Constructor
        (function() {
            self.autoUpdateStatus();
            //self.render();
        })();

    }

};
//Declaring Logic (including eventHandlers)
WHACKAMOLE.LOGIC = {
    EVENTS : {
        gameInit: function() {
            //TODO
            var molesDOM = document.getElementsByClassName('mole'),
                stageDOM = document.getElementsByClassName('stage')[0],
                moles = [];

            for (var it = 0; it < molesDOM.length; it++) {
                var mole = new WHACKAMOLE.MODELS.Mole({
                    elementInDOM: molesDOM[it]
                });
                moles.push(mole);
            }

            var stage = new WHACKAMOLE.MODELS.Stage({
                elementInDOM: stageDOM,
                molesVal: moles
            });


        }

    }

};

var whackAMoleGame = WHACKAMOLE.LOGIC;

console.log('hey');

whackAMoleGame.EVENTS.gameInit();