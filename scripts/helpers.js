// insert any functions that are useful throughout the experiment here
var shuffleComb = function(comb) {
    // while this one is trivial, this just to show that we CAN define a function here
    return _.shuffle(comb);
};

// draws the shapes on the canvas
// gets the canvas element and the trial info as arguments
//
// canvas.draw expects the following arguments:
// shape (circle, sqaure or triangle)
// size of the shape
// x and y coords
// color
//
// canvas.getCoords expects the following arguments:
// the number of the elements to be drawn (int)
// the size of a sinlgle elemen (int)
// returns: a list of objects with x and y properties
var drawOnCanvas = function(canvasElem, trialInfo) {
    var canvas = createCanvas(canvasElem);
    var coords = canvas.getRandomCoords(trialInfo.total_set_size, trialInfo.shape_size);
    for (var i=0; i<trialInfo.total_set_size; i++) {
        if (i < trialInfo.focal_set_size) {
            canvas.draw(trialInfo.shape, trialInfo.shape_size, coords[i].x, coords[i].y, trialInfo.focal_color);
        } else {
            canvas.draw(trialInfo.shape, trialInfo.shape_size, coords[i].x, coords[i].y, trialInfo.other_color);
        }
    }
};


var generateTrial = function() {

    // generate canvas settings
    var trialInfo = {};
    trialInfo.total_set_size = _.sample([10, 25, 50])
    trialInfo.focal_set_size = _.random(trialInfo.total_set_size)
    trialInfo.shape = _.sample(["circle", "square", "triangle"])
    trialInfo.colors = _.sampleSize(["blue", "red", "green", "yellow"], 2)
    trialInfo.shape_size = 20
    trialInfo.focal_color = trialInfo.colors[0]
    trialInfo.other_color = trialInfo.colors[1]
    trialInfo.question = "some of the " + trialInfo.shape + "s are " + trialInfo.focal_color
    trialInfo.option1 = "false"
    trialInfo.option2 = "true"

    return trialInfo
}
