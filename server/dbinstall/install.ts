import { SQL } from "../lib/database"

export class Install {
    static installAll(){
        Install.player()
        Install.chunks()
        Install.account()

    }
    static chunks() {
        new SQL.Table("chunks")
            .addField("x",SQL.Fieldtype.INT)
            .addField("y",SQL.Fieldtype.INT)
            .addField("data",SQL.Fieldtype.TEXT) 
            .createOrUpdateTable()
            .addIndex(["x","y"],"spartialindex",true)
    }
    static player() {
        new SQL.Table("player")
            .addField("uuid",SQL.Fieldtype.VARCHAR,64,["PRIMARY KEY"])
            .addField("accountid",SQL.Fieldtype.INT)
            .addField("data",SQL.Fieldtype.TEXT) 
            .createOrUpdateTable() 
            .addIndex(["uuid"],"nameindex",true)
    }
    static account() {
        new SQL.Table("account")
            .addField("id",SQL.Fieldtype.INT,64,["PRIMARY KEY"])
            .addField("loginname",SQL.Fieldtype.TEXT)
            .addField("password",SQL.Fieldtype.TEXT)
            .addField("data",SQL.Fieldtype.TEXT) 
            .createOrUpdateTable()
            .addIndex(["loginname"],"nameindex",true)
    }
}