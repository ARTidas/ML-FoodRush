class Genesys {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;

        this.object = null;

        this.fitness_score = null;

        this.is_dragged = false;
        this.is_dead = false;
    };

    compareFitness(candidate_1, candidate_2) {
        return candidate_1.getFitnessScore() - candidate_2.getFitnessScore();
    }

    getX() {
        return this.x;
    };
    getY() {
        return this.y;
    };
};