class Target extends Genesys {
    constructor(canvas) {
        super();
        this.canvas = canvas;

        this.x = this.canvas.getCanvasWidth() - settings.population_starting_position_x * 2;
        this.y = this.canvas.getCanvasHeight() - settings.population_starting_position_y * 2;
        //this.y = 0 + settings.population_starting_position_y * 2;
        this.width = settings.candidate_width;
    };

    display() {
        fill('#0f0');
        this.object = circle(
            this.x,
            this.y,
            this.width
        );

        return this.object;
    };
};