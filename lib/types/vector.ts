export class Vector {
    constructor(
        public x:number,
        public y:number) {
        
    }

    add(a:Vector) {
        this.x = this.x+a.x;
        this.y = this.x+a.y;
    }
    mul(a:Vector) {
        this.x = this.x*a.x;
        this.y = this.x*a.y;
    }
    sub(a:Vector) {
        this.x = this.x-a.x;
        this.y = this.x-a.y;
    }
    div(a:Vector) {
        this.x = this.x/a.x;
        this.y = this.x/a.y;
    }
}