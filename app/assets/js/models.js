//Declaring namespace.
var WHACKAMOLE = {};

//Declaring models.
WHACKAMOLE.MODELS = {
    Mole: function(params) {
        var self = this;
        var pointer = params.elementInDOM || {};
        var STATES = {
            VISIBLE: 0,
            INVISIBLE: 1,
            HIT: 2
        };
        var currentState = STATES.INVISIBLE;
        var animationInterval = function() {};
        //Returns currentState.
        self.getState = function() {
            return currentState;
        };
        //Adds animation class when mole hides.
        self.comeIn = function() {
            if (pointer.classList.contains('mole-Come-Out')) {
                pointer.classList.remove('mole-Come-Out');
            }
            pointer.classList.add('mole-Come-In');
        };
        //Adds animation class when mole shows up.(Changes state to Visible)
        self.comeOut = function() {
            currentState = STATES.VISIBLE;
            if (pointer.classList.contains('mole-Come-In')) {
                pointer.classList.remove('mole-Come-In');
            }
            pointer.classList.add('mole-Come-Out');
        };
        //Mole animation sequence.
        self.animateUpDown = function(velocity) {
            self.comeOut();

            setTimeout(function() {
                self.comeIn();
            }, velocity);
       
            setTimeout(function() {
                currentState = STATES.INVISIBLE;
            },velocity+1);

        };
        //Mole being hit animation sequence.
        self.animateHit = function() {
            pointer.classList.remove('mole-Come-Out');
            pointer.classList.remove('mole-Come-In');
            pointer.classList.add('mole-Hit');
            currentState = STATES.HIT;
        };
        //On Click CallBack.
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
        var score = 0;
        var scoreDOM = pointer.getElementsByClassName('score')[0];
        var timerDOM = pointer.getElementsByClassName('timer')[0];
        self.Moles = []; //Collection of  Mole;
        var MAXSCORE = 15;
        var TIMER = 100;
        var statusInterval = function() {};
        self.STATUS = {
            RUNNING:0,
            PAUSED:1,
            OVER:2
        };
        var currentStatus = self.STATUS.RUNNING;
        //Returns the current score value.
        self.getScore = function() {
            return score;
        };
        //Returns the current Timer Value
        self.getTimer = function() {
            return TIMER;
        };
        //Returns current Stage status.
        self.getCurrentStatus = function(){
            return currentStatus;
        }
        //Increases the current score value but it is returned as a callback.
        self.increaseScore = function() {
            return function() {
                score+=5;
                scoreDOM.innerHTML = score;
            };
        };
        //Verifies whether the game ended or not.
        self.checkGameStatus = function() {
            if (score === MAXSCORE || TIMER === 0) {
                self.gameOver();
            }
        };
        //Executes every second to update timer and check game status.
        self.autoUpdateStatus = function() {
            statusInterval = setInterval(self.updateStatus, 1000);
        };
        //Clears the stage status interval
        self.pauseUpdateStatus = function() {
            clearInterval(statusInterval);
        };
        //Verifies game status and updates the current timer.
        self.updateStatus = function() {
            self.checkGameStatus();
            self.updateTimer();
        };
        //Updates current timer value
        self.updateTimer = function() {
            TIMER-=(TIMER === 0)?0:1;
            timerDOM.innerHTML = TIMER;
        };
        //Generates Game Over DOM Element and pauses the Status Update
        self.gameOver = function() {
            var p = document.createElement('p');
            p.innerHTML = 'Game Over';
            pointer.appendChild(p);
            currentStatus = self.STATUS.OVER;
            self.pauseUpdateStatus();
            
        };
        //Gets the moles DOM element, creates moles instances and adds callback.
        self.initialize = function() {

            var molesInDOM = pointer.getElementsByClassName('mole');
            timerDOM.innerHTML = TIMER;
            scoreDOM.innerHTML = score;

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
