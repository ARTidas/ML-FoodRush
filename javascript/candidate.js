class Candidate extends Genesys {
    constructor(canvas, hud, target, parent_1, parent_2) {
        super();
        this.canvas = canvas;
        this.hud = hud;
        this.target = target;

        this.object = null;
        this.x = settings.population_starting_position_x;
        this.y = settings.population_starting_position_y;
        this.width = settings.candidate_width;
        this.color = this.getRandomHexColor();
        this.reached_food = false;
        
        var offset_x = 0;
        var offset_y = 0;
        if (
            parent_1 !== null && parent_1 !== undefined && 
            parent_2 !== null && parent_2 !== undefined
        ) {
            offset_x = randomGaussian((parent_1.offset_x + parent_2.offset_x) / 2);
            offset_y = randomGaussian((parent_1.offset_y + parent_2.offset_y) / 2);
        }
        else {
            var maximum = 0.03;
            var minimum = -0.03;
            offset_x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            offset_y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        }
        //Evolutionary traits
        this.offset_x = offset_x
        this.offset_y = offset_y;
    };
  
    display() {
        fill(this.color);
        this.object = rect(this.x, this.y, this.width);
        this.displayAttributes();
    };

    displayAttributes() {
        fill(0);
        text(
            Math.round(this.fitness_score),
            this.x ,
            this.y + this.width / 2
        );
    };

    move(obstacles) {
        if (this.is_dead) {
            return;
        }

        this.x += this.getRandomMovement() + this.offset_x;
        this.y += this.getRandomMovement() + this.offset_y;

        this.x = (this.x < 0 ? 0 : this.x);
        this.y = (this.y < 0 ? 0 : this.y);
        this.x = (this.x > this.canvas.getCanvasWidth() ? this.canvas.getCanvasWidth() - this.width : this.x);
        this.y = (this.y > this.canvas.getCanvasHeight() ? this.canvas.getCanvasHeight() - this.width : this.y);

        //Check for canvas boundaries
        if (
            this.x - settings.target_search_treshold < this.target.x && 
            this.x + settings.target_search_treshold > this.target.x &&
            this.y - settings.target_search_treshold < this.target.y && 
            this.y + settings.target_search_treshold > this.target.y 
        ) {
            this.reached_food = true;
            this.hud.population_reached_food = true;
        }

        this.fitness_score = this.getFitnessScore();
    };

    getFitnessScore() {
        return this.getDistanceFromTarget();
    };

    getDistanceFromTarget() {
        return Math.sqrt(
            Math.pow(
                target.getX() - this.x,
                2
            ) +
            Math.pow(
                target.getY() - this.y,
                2
            )
        );
    };

    getDistanceFromObject(object) {
        return Math.sqrt(
            Math.pow(
                object.x - this.x,
                2
            ) +
            Math.pow(
                object.y - this.y,
                2
            )
        );
    };

    getRandomHexColor() {
        return (
            '#' + 
            this.getRandomHexNumber() + 
            this.getRandomHexNumber() + 
            this.getRandomHexNumber()
        );
    };
    getRandomHexNumber() {
        var possible_hex_numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

        return (
            possible_hex_numbers[
                Math.floor(Math.random() * possible_hex_numbers.length)
            ]
        );
    };
    getRandomMovement() {
        return (
            Math.floor(
                Math.random() * (
                    settings.candidate_movement_max - settings.candidate_movement_min + 1
                )
            ) + 
            settings.candidate_movement_min
        );
    };
};