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
        var currentState = STATES.INVISIBLE;
        var animationInterval = function() {};

        self.getState = function() {
            return currentState;
        };

        self.comeIn = function() {
            if (pointer.classList.contains('come-Out')) {
                pointer.classList.remove('come-Out');
            }

            pointer.classList.add('come-In');
            currentState = STATES.VISIBLE;
            console.log(pointer);
        };

        self.comeOut = function() {
            if (pointer.classList.contains('come-In')) {
                pointer.classList.remove('come-In');
            }
            pointer.classList.add('come-Out');
            console.log(pointer);
        };

        self.animateUpDown = function(velocity) {
            self.comeOut();
            setTimeout(function() {
                self.comeIn();
            }, velocity); //Make this value a parameter
            currentState = STATES.INVISIBLE;

        };

        self.animateHit = function() {
            pointer.classList.remove('come-Out');
            pointer.classList.remove('come-In');
            pointer.classList.add('smack');
            currentState = STATES.HIT;
        };

        self.initialize = function() {
            //TODO
            pointer.addEventListener('click',
                function() {
                    self.animateHit();
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
        var scoreDOM = pointer.getElementsByClassName('score')[0];
        self.Moles = []; //Collection of  Mole;
        var MAXSCORE = 10;
        var TIMER = 100;
        var statusInterval = function() {};

        self.getScore = function() {
            return score;
        };

        self.getTimer = function() {
            return TIMER;
        };

        self.increaseScore = function() {
            score++;
            scoreDOM.innerHTML = score;
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
        };

        self.gameOver = function() {
            //TODO
        };

        self.initialize = function() {

            var molesInDOM = pointer.getElementsByClassName('mole');

            for (var it = 0; it < molesInDOM.length; it++) {
                var mole = new WHACKAMOLE.MODELS.Mole({
                    elementInDOM: molesInDOM[it]
                });
                self.Moles.push(mole);
            }


        };


        //Constructor
        (function() {
            //self.initialize();
            //self.autoUpdateStatus();
            //self.render();
        })();

    }

};
//Declaring Logic (including eventHandlers)
WHACKAMOLE.LOGIC = {
    EVENTS: {
        gameInit: function() {
            //TODO
            var stageDOM = document.getElementsByClassName('stage')[0];

            var stage = new WHACKAMOLE.MODELS.Stage({
                elementInDOM: stageDOM
            });

            stage.initialize();

            //LOGIC BEGINS
            var RandomMoleIdx = function(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            };

            var handicapVelocity = 1000;
            //Mole Appearing rate thread
            setInterval(function() {
                var idx = RandomMoleIdx(0, stage.Moles.length - 1);
                stage.Moles[idx].animateUpDown(handicapVelocity);

            }, handicapVelocity);

        }

    }

};

window.onload = function() {
    var whackAMoleGame = WHACKAMOLE.LOGIC.EVENTS;

    whackAMoleGame.gameInit();
};