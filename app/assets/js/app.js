var WHACKAMOLE = {};

WHACKAMOLE.MODELS = {
    Mole: function(xVal, yVal,speedVal,pointedElement) {
        var self = this;
        var Position = {
            x = xVal || 0,
            y = yVal || 0
        };
        var speed = speedVal || 1;
        var pointer = pointedElement;
        var states = ['normal','hitted'];
        var currentState = states[0];

    },
    Stage:function(pointedElement,speedVal){
        var self = this;
        var pointer = pointedElement;
        var speed = speedVal || 1;
        var score = 0;
        
    }

};