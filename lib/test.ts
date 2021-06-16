import { Vector } from "./types/Vector"

enum TestGroups {
    Vector,
    Atan2
}
let testGroup = TestGroups.Vector;

if(testGroup == TestGroups.Vector){
    let test = new Vector(510,125)
    for (let i = 0; i < 65535; i++) {
        test.x=i;
        test.y=i;
        //console.log(test," - " , Vector.deserializeFrom2char(test.serializeInto2char()));
        if(localStorage.getItem("vect"+i)==null)
        {
                localStorage.setItem("vect"+i,(test.serializeInto2char()));
        }
        else {
            let item = localStorage.getItem("vect"+i);
            if(item==null) {console.log("NULL" + "vect"+i); }
            if(Vector.deserializeFrom2char(localStorage.getItem("vect"+i)).x != i) {
                console.log("BROKE"+" vect"+i + " "+ JSON.stringify(Vector.deserializeFrom2char(localStorage.getItem("vect"+i)) )); 
                }
        } 
    }

    //let test = new Vector(510,125)
    for (let i = 0; i < 65535; i++) {
        test.x=i;
        test.y=i;
        //console.log(test," - " , Vector.deserializeFrom2char(test.serializeInto2char()));
        if(Vector.deserializeFrom2char(test.serializeInto2char()).x != i) {console.log("BROKE"); }
    }
    console.log("Done testing.")
}
//@ts-ignore
if(testGroup == TestGroups.Atan2) {
var tests = 1000;

var v1000vectors = []
for (let i = 0; i < 1000; i++) {
    v1000vectors.push(new Vector(Math.random(), Math.random()))
}
var v1000vectors2 = []
for (let i = 0; i < 1000; i++) {
    v1000vectors2.push(new Vector(Math.random(), Math.random()))
}
var results=[];
var result = 0;


console.log("Full(self): ")
before = performance.now();
for (let j = 0; j < tests; j++)
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir2 = Vector.rotateByEightOfPi(Vector.sub(v1000vectors[i], v1000vectors2[i])).directionTo4D();
        results.push(lookingDir);
    }
console.log(performance.now() - before);

console.log("Atan2:      ")
var before = performance.now();
for (let j = 0; j < tests; j++)
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir = v1000vectors[i].directionToDeg(v1000vectors2[i]);
        results.push(lookingDir);
    }
console.log(performance.now() - before);

console.log("Full(Atan2):      ")
var before = performance.now();
for (let j = 0; j < tests; j++)
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir = v1000vectors[i].directionToDeg(v1000vectors2[i]);

        if (lookingDir <= 45 && lookingDir >= -45) {
            result = 0 // Right
        } else
            if (lookingDir >= 45 && lookingDir <= 90 + 45) {
                result = 1 //Down
            } else
                if (lookingDir >= 180 - 45 && lookingDir <= 180 + 45 || lookingDir == 0) {
                    result = 2 //Left
                } else {
                    //Up
                    result = 3 // Up
                }
        results.push(result);
    }
console.log(performance.now() - before);

console.log("Full(self w elsif): ")
before = performance.now();
for (let j = 0; j < tests; j++)
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir2 = Vector.rotateByEightOfPi(Vector.sub(v1000vectors[i], v1000vectors2[i])).directionTo4D();

        if (lookingDir2.x == 1 && lookingDir2.y == 1) {
            result = 0 // Right
        } else
            if (lookingDir2.x == -1 && lookingDir2.y == 1) {
                result = 1 //Down
            } else
                if (lookingDir2.x == -1 && lookingDir2.y == -1) {
                    result = 2 //Left
                } else {
                    //Up
                    result = 3 // Up
                }
                results.push(result);
    }
console.log(performance.now() - before);



console.log("rotateBy8: ")
before = performance.now();
for (let j = 0; j < tests; j++)
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir3 = Vector.rotateByEightOfPi(v1000vectors[i]);
        results.push(lookingDir3);
    }
console.log(performance.now() - before);

console.log("static sub: ")
before = performance.now();
for (let j = 0; j < tests; j++) {
    for (let i = 0; i < v1000vectors.length; i++) {
        var lookingDir4 = Vector.sub(v1000vectors[i], v1000vectors2[i]);
        results.push(lookingDir4);
    }
}

console.log(performance.now() - before);

console.log("Tests ended. "+results.length);

}