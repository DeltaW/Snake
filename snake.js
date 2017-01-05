function Snake() {
    this.x = floor(random(floor(width / scl)));
    this.y = floor(random(floor(height / scl)));
    this.startingvector = createVector(this.x, this.y);
    this.startingvector.mult(scl);
    this.x = this.startingvector.x;
    this.y = this.startingvector.y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0; //länge
    this.tail = [];
    this.current_x;
    this.last_x;
    this.current_y;
    this.last_y;

    this.output;

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;

    }

    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                console.log('RIP Snake - with a total length of ' + (this.tail.length + 1));
                var score = this.total + 1;
                if (score > Highscore) {
                    Highscore = score;
                    Leader = name;
                    console.log(Highscore + "new Highscore");
                    var temp = Highscore + "";
                    saveStrings(temp, 'score.txt');
                    temp = Leader + "";
                    saveStrings(temp, 'name.txt')
                }
                this.total = 0;
                this.tail = []
                this.pause();
                this.output = select('#output');
                this.output.html('You died with a total length of ' + score + '.');
                //text('You died with a total length of ' + score + '.',20,20);
            }
        }
    }

    this.pause = function() {
        this.xspeed = 0;
        this.yspeed = 0;
    }

    this.update = function() {
        //console.log('xpos: ' + this.x + ' ypos:' + this.y);
        if (this.x >= (fenster - 1)) {
            console.log('xright reached');
            this.x = 0;
        } //x richtung
        if (this.x < 0) { // <= (0 - scl)) {
            console.log('xleft reached');
            this.x = (fenster - (scl + 1));
        } //-x richtung
        if (this.y >= (fenster - 1)) {
            console.log('ybottom reached');
            this.y = 0;
        } //y richtung
        if (this.y < 0) { //<= (0 - scl)) {
            console.log('ytop reached');
            this.y = (fenster - (scl + 1));
        } //-y richtung

        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        this.last_y = this.y;
        this.last_x = this.x;
        //
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        //
        this.current_x = this.x;
        this.current_y = this.y;

        var laenge;
        laenge = select('#currentlength');
        laenge.html('Length ' + (this.tail.length + 1));
        //text('Length: ' + (s.total + 1), 100, 100);
        //text('test');
        //this.x = constrain(this.x, 0, width - (scl + 1)); //Damit man nicht aus dem
        //this.y = constrain(this.y, 0, height - (scl + 1)); //Canvas raus kann

        //auf der anderen Seite ankommen
        //console.log('xpos' + this.x);
        /*if (this.x >= fenster && this.xspeed === 1) {
            console.log('xright reached');
            this.x = 0;
        } //x richtung
        if (this.x <= (0 - scl) && this.xspeed === -1) {
            console.log('xleft reached');
            this.x = (fenster - (scl + 1));
        } //-x richtung

        if (this.y >= fenster && this.yspeed === 1) {
            console.log('ybottom reached');
            this.y = 0;
        } //y richtung
        if (this.y <= (0 - scl) && this.yspeed === -1) {
            console.log('ytop reached');
            this.y = (fenster - (scl + 1));
        } //-y richtung */
    }

    this.show = function() {
        fill(255);
        for (var i = 0; i < this.total; i++) {
            //rect(this.tail[i].x, this.tail[i].y, scl, scl);
            ellipse(this.tail[i].x + (scl / 2), this.tail[i].y + (scl / 2), scl, scl);
        }
        fill(255);
        //rect(this.x, this.y, scl, scl);
        ellipse(this.x + (scl / 2), this.y + (scl / 2), scl, scl);
    }
}
