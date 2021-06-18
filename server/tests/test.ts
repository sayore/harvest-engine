import { SQLTest } from "./sql";

export class Test {
    static silent=false;

    static test() {
        console.log((Test.silent?"Tests are silent.":"Tests are not silent."))
        SQLTest();
    }
}