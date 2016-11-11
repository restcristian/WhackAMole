//Namespace declaration
var WHACKAMOLE = {};

//Declaring models
WHACKAMOLE.MODELS = {
    Mole: function(params) {
        var self = this;
        var speed = params.speedVal || 1;
        var pointer = params.elementInDOM || {};
        var STATES = {
            VISIBLE: 0,
            INVISIBLE: 1,
            HIT: 2
        };
        var currentState = STATES.VISIBLE;
        var animationInterval = function() {};

        self.getState = function() {
            return currentState;
        };

        self.getPosition = function() {
            return Position();
        };

        self.comeIn = function() {
            if (pointer.classList.contains('come-Out')) {
                pointer.classList.remove('come-Out');
            }
            pointer.classList.add('come-In');
            console.log(pointer.classList);
        };

        self.comeOut = function() {
            if (pointer.classList.contains('come-In')) {
                pointer.classList.remove('come-Out');
            }
            pointer.classList.add('come-Out');
            console.log(pointer.classList);
        };

        self.animate = function(){
            self.comeOut();
           setTimeout(function(){
               self.comeIn();
           },2000);
            
        };


        self.initialize = function() {
            //TODO
            pointer.addEventListener('click',
                function() {
                    currentState = STATES.HIT;
                    console.log(pointer.id + ' state:' + currentState);
                    //self.comeOut();
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
        //var Moles = params.molesVal || []; //Collection of  Moles
        var MAXSCORE = 10;
        var TIMER = 100;
        var statusInterval = function() {};

        self.getScore = function() {
            return score;
        };

        self.getTimer = function() {
            return TIMER;
        }

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
    EVENTS: {
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
                elementInDOM: stageDOM
            });

            //LOGIC BEGINS
            var RandomMoleIdx = function(min,max){
                return Math.round(Math.random() * (max-min) + min);
            };

            setInterval(function(){
                moles[RandomMoleIdx(0,2)].animate();
            },2000);



        }

    }

};

window.onload = function() {
    var whackAMoleGame = WHACKAMOLE.LOGIC.EVENTS;

    whackAMoleGame.gameInit();
}