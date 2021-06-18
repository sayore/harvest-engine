import { Chunk } from "../../lib/types/Chunk";
import { SQL } from "../lib/database";

export let SQLTest = ()=>{
    console.log((new SQL.Table("testcanneverexist").fields.length==0?"✅ Table that never should exist, has no fields. ":"Table that never exists is either undefined or filled???"));

    var chunksTable=new SQL.Table("thisisalsoatablethatisdeadmeat");
    if(chunksTable.exists()) {
        //chunksTable.delete() 
        //console.log("✅ Deleting 'thisisalsoatablethatisdeadmeat' table.")
    }
    

    chunksTable
        .addField("uuid",SQL.Fieldtype.VARCHAR,64)
        .addField("x",SQL.Fieldtype.INT)
        .addField("y",SQL.Fieldtype.INT)
        .addField("data",SQL.Fieldtype.TEXT) 
        .createOrUpdateTable()
        .addIndex(["x","y"],"spartialindex",true)
    

    let fieldlength = chunksTable.getTableInfo().length==4;
    console.log((fieldlength)?"✅ Fields are correct!":"Fieldlength is not correct");
    let indexlength = chunksTable.getIndexInfo().length==1;
    console.log((indexlength)?"✅ Indexes are correct!":"Indexlength is not correct \n",chunksTable.getIndexInfo());
    
    let myChunk = chunksTable.where<Chunk>("x=4 AND y=2");

    console.log((fieldlength&&indexlength)?"✅ SQLTest's succesful":"SQLTest's failed");
}

