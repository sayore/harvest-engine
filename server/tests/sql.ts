import { SQL } from "../lib/database";

export let SQLTest = ()=>{
    var table = new SQL.Table("chunks")
        .addField("uuid",SQL.Fieldtype.VARCHAR,64)
        .addField("x",SQL.Fieldtype.INT)
        .addField("y",SQL.Fieldtype.INT)
        .addField("data",SQL.Fieldtype.TEXT) 
        .addIndex(["x","y"],"spartialindex",true)
        .createOrUpdateTable()
    
    console.log(table.getTableInfo());
    console.log(table.getIndexInfo());
}