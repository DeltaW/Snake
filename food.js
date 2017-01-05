function Food() {



    this.pickLocation = function() {
        var cols = floor(width / scl);
        var rows = floor(height / scl);
        this.pos = createVector(floor(random(cols)), floor(random(rows)));
        //food.mult(scl);
        while (this.pos.x === 0 || this.y === 0) {
            if (this.pos.x === 0) {
                this.pos.x = floor(random(cols));
                //food.x.mult(scl);
            }
            if (this.pos.y === 0) {
                this.pos.y = floor(random(rows));
                //food.y.mult(scl);
            }
        } //damit food.x und food.y nicht 0 sein können da s.eat daran scheitern kann, wenn man von der anderen seite ankommt
        this.pos.mult(scl);
    }

    this.show = function() {
        fill(255, 0, 100);
        ellipse(this.pos.x + (scl / 2), this.pos.y + (scl / 2), scl, scl);
    }

}
