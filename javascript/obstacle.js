class Obstacle extends Genesys {
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;
        this.width = settings.candidate_width;
        this.color = '#000';
    }

    display() {
        fill(this.color);
        this.object = circle(this.x, this.y, this.width);
    };
}