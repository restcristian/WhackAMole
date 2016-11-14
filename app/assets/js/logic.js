//Declaring Logic (including eventHandlers)
WHACKAMOLE.LOGIC = {
    EVENTS: {
        gameInit: function() {
            //TODO
            var randomMoleAnimationInterval = function(){};
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
            randomMoleAnimationInterval = setInterval(function() {
                var idx = RandomMoleIdx(0, stage.Moles.length - 1);
                stage.Moles[idx].animateUpDown(handicapVelocity);

            }, handicapVelocity);


        }

    }

};