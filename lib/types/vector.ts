export class Vector {

    constructor(
        public x: number = 0,
        public y: number = 0) {

    }

    static add(a: Vector, b: Vector): Vector {
        return new Vector(a.x + b.x, a.y + b.y);
    }
    static sub(a: Vector, b: Vector): Vector {
        return new Vector(a.x - b.x, a.y - b.y);
    }
    static mul(a: Vector, b: Vector): Vector {
        return new Vector(a.x * b.x, a.y * b.y);
    }
    static div(a: Vector, b: Vector): Vector {
        return new Vector(a.x / b.x, a.y / b.y);
    }
    static addNumber(a: Vector, b: number): Vector {
        return new Vector(a.x + b, a.y + b);
    }
    static subNumber(a: Vector, b: number): Vector {
        return new Vector(a.x - b, a.y - b);
    }
    static mulNumber(a: Vector, b: number): Vector {
        return new Vector(a.x * b, a.y * b);
    }
    static divNumber(a: Vector, b: number): Vector {
        return new Vector(a.x / b, a.y / b);
    }

    add(a: Vector): Vector {
        this.x = this.x + a.x; this.y = this.y + a.y;
        return this;
    }
    addNumber(a: number): Vector {
        this.x = this.x + a; this.y = this.y + a;
        return this;
    }
    mul(a: Vector): Vector {
        this.x = this.x * a.x; this.y = this.y * a.y;
        return this;
    }
    mulNumber(a: number): Vector {
        this.x = this.x * a; this.y = this.y * a;
        return this;
    }
    sub(a: Vector): Vector {
        this.x = this.x - a.x; this.y = this.y - a.y;
        return this;
    }
    subNumber(a: number): Vector {
        this.x = this.x - a; this.y = this.y - a;
        return this;
    }
    div(a: Vector): Vector {
        this.x = this.x / a.x; this.y = this.y / a.y;
        return this;
    }
    divNumber(a: number): Vector {
        this.x = this.x / a; this.y = this.y / a;
        return this;
    }
}
