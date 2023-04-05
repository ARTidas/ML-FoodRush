class Hud {
    constructor() {
        this.display_position_x           = 20;
        this.display_position_y           = 20;
        this.display_position_increment_y = 20;
        this.move_number                  = 0;
        this.generation_number            = 0;

        this.best_candidate               = null;
        this.second_best_candidate        = null;
        this.population_reached_food      = false;
    };

    display() {
        fill(0);
        text(
            'Current generation: ' + Math.round(this.generation_number),
            this.display_position_x,
            this.display_position_y + this.display_position_increment_y * 0
        );
        text(
            'Current move: ' + Math.round(this.move_number),
            this.display_position_x,
            this.display_position_y + this.display_position_increment_y * 1
        );
        text(
            'Best fitness: ' + Math.round(this.best_candidate.getFitnessScore()),
            this.display_position_x,
            this.display_position_y + this.display_position_increment_y * 2
        );
        text(
            'Second best fitness: ' + Math.round(this.second_best_candidate.getFitnessScore()),
            this.display_position_x,
            this.display_position_y + this.display_position_increment_y * 3
        );
        text(
            'Population fed: ' + this.population_reached_food,
            this.display_position_x,
            this.display_position_y + this.display_position_increment_y * 4
        );
    };
}