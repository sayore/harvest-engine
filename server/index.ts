import { eMap, eTile } from "../lib/mod";

import * as ehttp from "./lib/httpserver";

var map = eMap.createEmptyMap(40,20); 


ehttp.eHTTPServer.start();