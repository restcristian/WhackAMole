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
            // console.log(pointer);
        };

        self.comeOut = function() {
            currentState = STATES.VISIBLE;
            if (pointer.classList.contains('come-In')) {
                pointer.classList.remove('come-In');
            }
            pointer.classList.add('come-Out');
            // console.log(pointer);
        };

        self.animateUpDown = function(velocity) {
            self.comeOut();

            setTimeout(function() {
                self.comeIn();
            }, velocity);
       
            setTimeout(function() {
                currentState = STATES.INVISIBLE;
            },velocity+1);

        };

        self.animateHit = function() {
            pointer.classList.remove('come-Out');
            pointer.classList.remove('come-In');
            pointer.classList.add('smack');
            currentState = STATES.HIT;
        };

        self.onMoleClickCB = function(cb) {
            pointer.addEventListener('click', function() {
                console.log(currentState + ' clicked');
                if (currentState === STATES.VISIBLE) {
                    cb();
                    self.animateHit();
                }
            })
        };

        //Constructor
        (function() {
            //self.initialize();
        })();

    },
    Stage: function(params) {
        var self = this;
        var pointer = params.elementInDOM;
        var speed = params.speedVal || 1;
        var score = 0;
        var scoreDOM = pointer.getElementsByClassName('score')[0];
        var timerDOM = pointer.getElementsByClassName('timer')[0];
        self.Moles = []; //Collection of  Mole;
        var MAXSCORE = 3;
        var TIMER = 10;
        var statusInterval = function() {};
        var STATUS = {
            RUNNING:0,
            PAUSED:1,
            LOST:2,
            WIN:3
        };
        var currentStatus = STATUS.RUNNING;

        self.getScore = function() {
            return score;
        };

        self.getTimer = function() {
            return TIMER;
        };

        self.getCurrentStatus = function(){
            return currentStatus;
        }

        self.increaseScore = function() {
            return function() {
                score++;
                scoreDOM.innerHTML = score;
            };
        };

        self.checkGameStatus = function() {
            if (score === MAXSCORE || TIMER === 0) {
                self.gameOver();
            }
        };

        self.autoUpdateStatus = function() {
            statusInterval = setInterval(self.updateStatus, 1000);
        };

        self.pauseUpdateStatus = function() {
            clearInterval(statusInterval);
        };

        self.updateStatus = function() {
            self.checkGameStatus();
            self.updateTimer();
        };

        self.updateTimer = function() {
            TIMER-=(TIMER === 0)?0:1;
            timerDOM.innerHTML = TIMER;
        };

        self.gameOver = function() {
            var p = document.createElement('p');
            p.innerHTML = 'Game Over';
            pointer.appendChild(p);
            self.pauseUpdateStatus();
            
            //TODO
        };

        self.initialize = function() {

            var molesInDOM = pointer.getElementsByClassName('mole');
            timerDOM.innerHTML = TIMER;

            for (var it = 0; it < molesInDOM.length; it++) {
                var mole = new WHACKAMOLE.MODELS.Mole({
                    elementInDOM: molesInDOM[it]
                });
                mole.onMoleClickCB(self.increaseScore());
                self.Moles.push(mole);
            }


        };

        //Constructor
        (function() {
            //self.initialize();
            self.autoUpdateStatus();
            //self.render();
        })();

    }

};
