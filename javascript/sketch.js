let genesys = new Genesys();
let canvas = new Canvas();
let target = new Target(canvas);
let hud = new Hud();
let candidates = [];
let obstacles = [];

/** ********************************************************************
 ** *** MAIN ENTRY FUNCTION ********************************************
 ** ********************************************************************/
function setup() {
    canvas.object = createCanvas(
        canvas.getCanvasWidth(),
        canvas.getCanvasHeight()
    );

    for (let candidate_number = 0; candidate_number < settings.population_size; candidate_number++) {
        candidates[candidate_number] = new Candidate(canvas, hud, target);
        candidates[candidate_number].display();
    };
};

//TODO: Implement a process on resizing of the browser window [ARTidas]
/*function windowResized() {
    resizeCanvas(
        window.innerWidth * 0.95,
        window.innerHeight * 0.95
    );
}*/

/** ********************************************************************
 ** *** MAIN LOOPING FUNCTION ******************************************
 ** ********************************************************************/
function draw() {
    console.log('Next cycle...');

    if (hud.population_reached_food) {
        noLoop();
    }

    background('#888');

    hud.move_number++;
    if (hud.best_candidate === null || hud.best_candidate === undefined) {
        hud.best_candidate = candidates[1]
    }
    if (hud.second_best_candidate === null || hud.second_best_candidate === undefined) {
        hud.second_best_candidate = candidates[2]
    }
    hud.display();

    if (target.is_dragged) {
        target.x = mouseX;
        target.y = mouseY;
    }
    target.display();

    obstacles.forEach((obstacle) => {
        if (obstacle.is_dragged) {
            obstacle.x = mouseX;
            obstacle.y = mouseY;
        }
        obstacle.display();
    });

    candidates.forEach((candidate) => {
        candidate.move(obstacles);
        candidate.display();

        //Check for obstacles
        obstacles.forEach((obstacle, index) => {
            //And flag the candidate for kill if touches any obstacle
            if (candidate.getDistanceFromObject(obstacle) < obstacle.width) {
                candidate.is_dead = true;
            }
        });
    });
    candidates.sort(genesys.compareFitness);

    //After no feeding in a few steps, then lets evolve the popultation.
    if (hud.move_number % settings.evolve_after_cycles === 0) {
        evolvePopulation();
    }
};

/** ********************************************************************
 ** *** MOUSE HANDLING AND DRAGGING ************************************
 ** ********************************************************************/
function mousePressed() {
    var mouse_pressed_on_empty_space = true;

    obstacles.forEach((obstacle) => {
        if (dist(obstacle.x, obstacle.y, mouseX, mouseY) < obstacle.width) {
            obstacle.is_dragged = true;
            mouse_pressed_on_empty_space = false;
        }
    });

    if (dist(target.x, target.y, mouseX, mouseY) < target.width) {
        target.is_dragged = true;
        mouse_pressed_on_empty_space = false;
    }
    
    if (mouse_pressed_on_empty_space) {
        obstacles.push(new Obstacle(mouseX, mouseY));
    }
}
function mouseReleased() {
    target.is_dragged = false;

    obstacles.forEach((obstacle) => {
        obstacle.is_dragged = false;
    });
}

function evolvePopulation() {
    hud.generation_number++;
    hud.best_candidate = candidates.shift();
    hud.second_best_candidate = candidates.shift();

    candidates = []; //Kill all the Darwinian race loosing candidates
    candidates[0] = hud.best_candidate;
    candidates[0].x = settings.population_starting_position_x;
    candidates[0].y = settings.population_starting_position_y;
    candidates[1] = hud.second_best_candidate;
    candidates[1].x = settings.population_starting_position_x;
    candidates[1].y = settings.population_starting_position_y;
    for (candidate_number = 2; candidate_number < settings.population_size; candidate_number++) {
        candidates[candidate_number] = new Candidate(
            canvas, 
            hud, 
            target, 
            candidates[0], 
            candidates[1]
        );
        candidates[candidate_number].display();
    };
};

