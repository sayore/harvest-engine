export class Vector {
    negate() : Vector {
        this.x=-this.x;
        this.y=-this.y;
        return this;
    }

    constructor(
        public x: number = 0,
        public y: number) {
        if(x!=0 && y==undefined) this.y=x;
    }

    private static _Zero: Vector = new Vector(0, 0);
    static get Zero(): Vector { return this._Zero; }
    private static _One: Vector = new Vector(1, 1);
    static get One(): Vector { return this._One; }
    private static _Up: Vector = new Vector(0, -1);
    static get Up(): Vector { return this._Up; }
    private static _Left: Vector = new Vector(-1, 0);
    static get Left(): Vector { return this._Left; }
    private static _Down: Vector = new Vector(0, 1);
    static get Down(): Vector { return this._Down; }
    private static _Right: Vector = new Vector(1, 0);
    static get Right(): Vector { return this._Right; }


    static add(a: Vector, b: Vector): Vector { return new Vector(a.x + b.x, a.y + b.y); }
    static sub(a: Vector, b: Vector): Vector { return new Vector(a.x - b.x, a.y - b.y); }
    static mul(a: Vector, b: Vector): Vector { return new Vector(a.x * b.x, a.y * b.y); }
    static div(a: Vector, b: Vector): Vector { return new Vector(a.x / b.x, a.y / b.y); }
    static mod(a: Vector, b: Vector): Vector { return new Vector(a.x % b.x, a.y % b.y); }
    static addNumber(a: Vector, b: number): Vector { return new Vector(a.x + b, a.y + b); }
    static subNumber(a: Vector, b: number): Vector { return new Vector(a.x - b, a.y - b); }
    static mulNumber(a: Vector, b: number): Vector { return new Vector(a.x * b, a.y * b); }
    static divNumber(a: Vector, b: number): Vector { return new Vector(a.x / b, a.y / b); }
    static modNumber(a: Vector, b: number): Vector { return new Vector(a.x % b, a.y % b); }


    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a Vector to add to this one.
     * @returns this
     */
    add(a: Vector): Vector { this.x = this.x + a.x; this.y = this.y + a.y; return this; }
    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a number to add to this one.
     * @returns this
     */
    addNumber(a: number): Vector { this.x = this.x + a; this.y = this.y + a; return this; }
    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a Vector to mul to this one.
     * @returns this
     */
    mul(a: Vector): Vector { this.x = this.x * a.x; this.y = this.y * a.y; return this; }
    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a number to mul to this one.
     * @returns this
     */
    mulNumber(a: number): Vector { this.x = this.x * a; this.y = this.y * a; return this; }
    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a Vector to sub from this one.
     * @returns this
     */
    sub(a: Vector): Vector { this.x = this.x - a.x; this.y = this.y - a.y; return this; }
    /**
     * Even though these functions have callback, the original WILL be modified.
     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.
     * @param a number to sub from this one.
     * @returns this
     */
    subNumber(a: number): Vector { this.x = this.x - a; this.y = this.y - a; return this; }
    div(a: Vector): Vector { this.x = this.x / a.x; this.y = this.y / a.y; return this; }
    divNumber(a: number): Vector { this.x = this.x / a; this.y = this.y / a; return this; }
    mod(a: Vector): Vector { this.x = this.x % a.x; this.y = this.y % a.y; return this; }
    modNumber(a: number): Vector { this.x = this.x % a; this.y = this.y % a; return this; }

    /**
     * Normalizes this vector.
     * @returns this
     */
    normalize(): Vector {
        if (this.x == 0 && this.y == 0) return this;
        var distance = Math.sqrt(this.x * this.x + this.y * this.y);
        this.modNumber(distance);
        return this;
    }

    /**
     * Calculates the distance(1d) to the other Vector.
     * @param target Vector to look at.
     * @returns 
     */
    distance(target: Vector) {
        var a = this.x - target.x;
        var b = this.y - target.y;
        return Math.sqrt(a * a + b * b);
    };
    /**
     * Calculates the distance(1d) to the other Vector.
     * @param target Vector to look at.
     * @returns 
     */
    round() : Vector {
        this.x=Math.round(this.x);
        this.y=Math.round(this.y);
        return this;
    };
    /**
     * Calculates the distance(1d) to the other Vector.
     * @param target Vector to look at.
     * @returns 
     */
    floor() : Vector {
        this.x=Math.floor(this.x);
        this.y=Math.floor(this.y);
        return this;
    };
    /**
     * Calculates the distance(1d) to the other Vector.
     * @param target Vector to look at.
     * @returns 
     */
    ceil() : Vector {
        this.x=Math.ceil(this.x);
        this.y=Math.ceil(this.y);
        return this;
    };
    /**
     * Calculates the distance(1d) to the other Vector.
     * @param target Vector to look at.
     * @returns 
     */
    distanceSqrt(target: Vector) {
        var a = this.x - target.x;
        var b = this.y - target.y;
        return a * a + b * b;
    };
    /**
     * For a given vector it returns a copied version.
     * @param {Vector2} vector Vector to clone.
     * @returns {Vector2} 
    
     */
    clone(): Vector {
        return new Vector(this.x, this.y);
    }
}