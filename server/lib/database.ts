import Database from "better-sqlite3";
const db = new Database('./foobar.db', {  });
//const db = new Database('./foobar.db', { verbose: console.log });


export namespace SQL {
    export enum Fieldtype {
        VARCHAR = "VARCHAR",
        INT = "INT",
        TEXT = "TEXT"
    }

    export enum Extras {
        PK="PRIMARY KEY",
        AI="AUTOINCREMENT",
        NNULL="NOT NULL",
        NULL="NULL",
        DEF0="DEFAULT 0"
    }

    export class Info {
        /**
         * Returns info about the tables in the Database. (No columns, only pure internal info.)
         * @returns 
         */
         static getTables() {
            return db.prepare("SELECT * FROM sqlite_master").all();
        }
        /**
         * Returns an Array with info about the fields of a table.
         * @returns 
         */
         static getTableInfo(table:string | Table) : ColumnInformation[] {
            if(typeof(table)=="string")
            return db.prepare("PRAGMA table_info('"+table+"')").all();
            else 
            return db.prepare("PRAGMA table_info("+table.tblname+")").all();
        }
        static getIndexInfo(table:string | Table) : ColumnInformation[] {
            if(typeof(table)=="string")
            return db.prepare("PRAGMA index_list('"+table+"')").all();
            else 
            return db.prepare("PRAGMA index_list("+table.tblname+")").all();
        }

        static existsTable(table:string) {
            return !!db.prepare("SELECT * FROM sqlite_master WHERE tbl_name='"+table+"'").get();
        }
    }

    export class Request {
        
    }

    export class Table {
        public fields:Field[]=[];

        addIndex(fieldnames:string[], indexname:string=null, unique:boolean=true) {
            db.exec(`CREATE ${unique?"UNIQUE":""} INDEX IF NOT EXISTS ${indexname==null?"idx_"+this.tblname:"idx_"+this.tblname+"_"+indexname}
              ON ${this.tblname} 
                (${fieldnames.join(",")})`);
            
            return this;
        }
        
        constructor(
            public tblname:string,
            public tableInfo = Info.getTableInfo(tblname)
        ) {
            tableInfo.forEach((ci)=>{
                this.fields.push(new Field(ci.name,null,null,null).setTypeAsString(ci.type))
            })
        }

        getStatements() : string[] {
            var statements : string[] = [];
            statements.push()
            return statements;
        }

        private create() {
            return db.exec(`CREATE TABLE ${this.tblname}(
                ${this.fields.map(f=>f.asSQL()).join(",\n")}
            )`);
        }

        where<T>(where:string) : T[] {
            return db.prepare(`SELECT * FROM ${this.tblname} WHERE ${where}`).all() as T[];
        }

        find<T>(where:string) : T {
            return db.prepare(`SELECT * FROM ${this.tblname} WHERE ${where}`).get() as T;
        }

        delete() {
            db.exec(`DROP TABLE ${this.tblname}`);
        }

        exists() {
            return this.tableInfo.length==1;
        }

        /**
         * Will create the table & append columns that do not exist on a table.
         * Will info on columns that exist but are not defined in the table object.
         * @param table 
         */
        createOrUpdateTable() {
            //Check for existence of table
            if(Info.existsTable(this.tblname)) {
                var crntColumns = this.tableInfo.map(c=>c.name);
                var wishedColumns = this.fields.map(c=>c.name);

                wishedColumns.forEach(c=>{
                    if(crntColumns.indexOf(c)==-1) {
                        // Column at this point in time does not exist.
                        // Create column
                        console.log(c+" does not exist yet. Will be created.")
                        this.callToField(this.fields.find(f=>f.name==c));
                    }
                })
                crntColumns.forEach(c=>{
                    if(wishedColumns.indexOf(c)==-1) {
                        // Inform that there is a column in DB that could be unused.
                        //
                        console.log(c+" does exist. But could be unused.")
                    }
                })
            } else {
                //Create whole table.
                this.create();
            }
            return this;
        }

        addField(name:string |Field, 
                    fieldtype = Fieldtype.INT,
                    size:number = null,
                    extra:string[] = []):this {
            if(typeof(name)=="string"){
                this.fields.push(new Field(name,fieldtype,size,extra))
            }else {
                this.fields.push(name);
            }
            return this;
        }

        private callToField(field: Field) {
            //check if the column maybe already exists, if it does do nothing
            var crntColumns = this.tableInfo.map(c=>c.name);
            if(crntColumns.indexOf(field.name)==-1) {
                let retval = db.exec(`ALTER TABLE ${this.tblname}
                                        ADD ${field.asSQL()};`);
                this.updateTableInfo();
                return true;
            }
            return false;
        }

        removeField(field: Field) {
            //check if the column maybe already exists, if it does do nothing
            var crntColumns = this.tableInfo.map(c=>c.name);
            if(crntColumns.indexOf(field.name)==1) {
                let retval = db.exec(`ALTER TABLE ${this.tblname}
                                        REMOVE ${field.asSQL()};`);
                this.updateTableInfo();
                return true;
            }
            return false;
        }

        getTableInfo() { return Info.getTableInfo(this.tblname); }
        getIndexInfo() { return Info.getIndexInfo(this.tblname); }

        private updateTableInfo() {
            this.tableInfo = Info.getTableInfo(this.tblname);
        }
    }

    export class Field {
        asSQL() {
            return `${this.name} ${this.fieldtype}${(this.size?"("+this.size+")":"")} ${this.extra.join(" ")}`;
        }
        constructor(
            public name:string, 
            public fieldtype = Fieldtype.INT,
            public size:number = null,
            public extra:string[] = []) {

            if(this.fieldtype==Fieldtype.INT && !this.size) { this.size=9 }
            if(this.fieldtype==Fieldtype.VARCHAR && !this.size) { this.size=255 }
        }

        setTypeAsString(type:string) {
            let typename="";
            let typelength="";
            for (let i = 0; i < type.length; i++) {
                const char = type[i];
                
                if(char.match(/[A-Za-z]/)) {typename+=char;}
                if(char.match(/[0-9]/)) {typelength+=char;}
            }
            this.fieldtype=typename as Fieldtype;
            this.size=(typelength==""?null:Number(typelength));

            return this;
        }

        addExtra(extra:Extras) {
            this.extra.push(extra);
        }
    }

    // Generated by https://quicktype.io

    export interface ColumnInformation {
        cid:        number;
        name:       string;
        type:       string;
        notnull:    number;
        dflt_value: null;
        pk:         number;
    }
}

export let permanentDatabase = db;