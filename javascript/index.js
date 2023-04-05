$(document).ready(function() {
    /*initialize();

    var interval_id = window.setInterval(initializeNextRound, settings.time_between_rounds);
    function initializeNextRound() {
        nextRound();
    }*/
});

function initialize() {
    initializeCanvas(); //TODO: Implement function to resize respectively everything when the browser window is resized. [ARTidas]
    initializeDestination();
    initializePopulation();
};

function initializeCanvas() {
    createCanvas(
        window.innerWidth * 0.95,
        window.innerHeight * 0.95
    );
};

function initializeDestination() {
    $('#canvas').drawRect({
        name: 'enemy_factory',
        layer: true,
        fillStyle: '#0f0',
        strokeStyle: '#000',
        strokeWidth: 2,
        x: 25, y: 25,
        width: 20,
        height: 20
    });
};





function nextRound() {
    console.log('Next round...');

    //TODO: Implement function to run the next round. [ARTidas]
};





function getCanvas() {
    return document.getElementById('canvas');
};
function getCanvasHeight() {
    return parseFloat(getCanvas().getBoundingClientRect().height);
};
function getCanvasWidth() {
    return parseFloat(getCanvas().getBoundingClientRect().width);
};
function getCanvasCenterX() {
    return (getCanvasWidth() / 2.00);
};
function getCanvasCenterY() {
    return (getCanvasHeight() / 2.00);
};
function getMouseX(e) {
    return e.pageX - $('#canvas').offset().left;
};
function getMouseY(e) {
    return e.pageY - $('#canvas').offset().top;
};

//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function initializePopulation() {
    for(var candidate_number = 1; candidate_number <= settings.population; candidate_number++) {
        initializecandidate(candidate_number);
    }
};

function initializecandidate(candidate_number) {
    $('#canvas').drawRect({
        name: 'candidate_' + candidate_number,
        layer: true,
        fillStyle: '#0f0',
        strokeStyle: '#000',
        strokeWidth: 2,
        x: (getCanvasCenterX() - 25), y: (getCanvasCenterY() - 25),
        width: 10,
        height: 10
    });

    movecandidate(candidate_number);
};


async function movecandidate(candidate_number) {
    $('#canvas').animateLayer(
        'candidate_' + candidate_number,
        {},
        settings.time_between_rounds,
        function(layer) {
            $(this).animateLayer(layer, {
                x: getNextPositionX(layer.x), y: getNextPositionY(layer.y)
            });
        }
    );

    await sleep(settings.time_between_movements);
    movecandidate(candidate_number);
};


function getNextPositionX(current_position_x) {
    var next_position_x = getRandomNumberWithRange(
        current_position_x - settings.maximum_movement,
        current_position_x + settings.maximum_movement
    );

    return (
        next_position_x < 0 ? 0 : (
            next_position_x > getCanvasWidth() ? getCanvasWidth() : next_position_x
        )
    );
};
function getNextPositionY(current_position_y) {
    var next_position_y = getRandomNumberWithRange(
        current_position_y - settings.maximum_movement,
        current_position_y + settings.maximum_movement
    );

    return (
        next_position_y < 0 ? 0 : (
            next_position_y > getCanvasWidth() ? getCanvasWidth() : next_position_y
        )
    );
};

//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomNumberWithRange(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};