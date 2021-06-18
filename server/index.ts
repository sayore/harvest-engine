import { Install } from "./dbinstall/install";
import * as ehttp from "./lib/httpserver";
import { Test } from "./tests/test";

Test.test();

Install.installAll();

ehttp.eHTTPServer.start(); 