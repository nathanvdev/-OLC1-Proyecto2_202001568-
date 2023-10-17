/* parser generated by jison 0.3.0 */
/**
 * Returns a Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */

	// const {Print} = require("../instruction/print.ts")
	// const {Primitive} = require("../expression/primitives.ts")
	// const {Type_dxnry} = require("../abstrac/Return.ts")
	// const {Declarate, Declarate_def, Set, Select} = require("../instruction/Declarate.ts")
	// const {var_list} = require("../instruction/Declarate.ts")
	// const {Aritmertic} = require("../expression/Aritmetic.ts")


  	import Print from '../instruction/print.js'
	import Primitive from "../expression/primitives.js"
	import {Type_dxnry} from "../abstrac/Return.js"
  	import {Declarate, Declarate_def, Set, Select} from "../instruction/Declarate.js"
  	import {var_list} from "../instruction/Declarate.js"
  	import Aritmertic from "../expression/Aritmetic.js"
	



import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType, o } from '@ts-jison/parser';const $V0=[1,8],$V1=[1,9],$V2=[1,10],$V3=[1,11],$V4=[5,11,13,20,22],$V5=[1,24],$V6=[1,17],$V7=[1,18],$V8=[1,19],$V9=[1,20],$Va=[1,21],$Vb=[1,22],$Vc=[1,23],$Vd=[5,11,13,20,22,24],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[5,11,13,19,20,22],$Vk=[5,11,13,17,19,20,22];

export class QueryParserParser extends JisonParser implements JisonParserApi {
    $?: any;

    constructor (yy = {}, lexer = new QueryParserLexer(yy)) {
      super(yy, lexer);
    }

    symbols_: SymbolsType = {"error":2,"start":3,"instrucciones":4,"EOF":5,"instruccion":6,"print":7,"declare":8,"set":9,"select":10,"RPRINT":11,"expresion":12,"RDECLARE":13,"variable_l":14,"VARIABLE_NAME":15,"data_type":16,"RDEFAULT":17,"primitivo":18,"COMMA":19,"RSET":20,"EQUAL":21,"RSELECT":22,"aritmetica":23,"PLUS":24,"ENTERO":25,"DECIMAL":26,"DATE":27,"CADENA":28,"RTRUE":29,"RFALSE":30,"RNULL":31,"RINT":32,"RDOUBLE":33,"RDATE":34,"RVARCHAR":35,"RBOOLEAN":36,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",11:"RPRINT",13:"RDECLARE",15:"VARIABLE_NAME",17:"RDEFAULT",19:"COMMA",20:"RSET",21:"EQUAL",22:"RSELECT",24:"PLUS",25:"ENTERO",26:"DECIMAL",27:"DATE",28:"CADENA",29:"RTRUE",30:"RFALSE",31:"RNULL",32:"RINT",33:"RDOUBLE",34:"RDATE",35:"RVARCHAR",36:"RBOOLEAN"};
    productions_: ProductionsType = [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,2],[8,2],[8,5],[14,4],[14,2],[9,4],[10,2],[12,1],[12,1],[23,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[16,1],[16,1],[16,1],[16,1],[16,1]];
    table: Array<StateType> = [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:$V0,13:$V1,20:$V2,22:$V3},{1:[3]},{5:[1,12],6:13,7:4,8:5,9:6,10:7,11:$V0,13:$V1,20:$V2,22:$V3},o($V4,[2,3]),o($V4,[2,4]),o($V4,[2,5]),o($V4,[2,6]),o($V4,[2,7]),{2:$V5,12:14,18:15,23:16,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,30:$Vb,31:$Vc},{14:25,15:[1,26]},{15:[1,27]},{15:[1,28]},{1:[2,1]},o($V4,[2,2]),o($V4,[2,8]),o($V4,[2,15],{24:[1,29]}),o($V4,[2,16]),o($Vd,[2,18]),o($Vd,[2,19]),o($Vd,[2,20]),o($Vd,[2,21]),o($Vd,[2,22]),o($Vd,[2,23]),o($Vd,[2,24]),o($Vd,[2,25]),o($V4,[2,9],{19:[1,30]}),{16:31,32:$Ve,33:$Vf,34:$Vg,35:$Vh,36:$Vi},{21:[1,37]},o($V4,[2,14]),{2:$V5,18:38,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,30:$Vb,31:$Vc},{15:[1,39]},o($Vj,[2,12],{17:[1,40]}),o($Vk,[2,26]),o($Vk,[2,27]),o($Vk,[2,28]),o($Vk,[2,29]),o($Vk,[2,30]),{2:$V5,18:41,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,30:$Vb,31:$Vc},o($V4,[2,17]),{16:42,32:$Ve,33:$Vf,34:$Vg,35:$Vh,36:$Vi},{2:$V5,18:43,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,30:$Vb,31:$Vc},o($V4,[2,13]),o($Vj,[2,11]),o($V4,[2,10])];
    defaultActions: {[key:number]: any} = {12:[2,1]};

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:

		return $$[$0-1]
	
break;
case 2:

		$$[$0-1].push($$[$0])
		this.$ = $$[$0-1]
	
break;
case 3:

		this.$ = [$$[$0]]
	
break;
case 4: case 5: case 6: case 7: case 15: case 16:

		this.$ = $$[$0]
	
break;
case 8:

		this.$ = new Print(_$[$0-1].first_line, _$[$0-1].first_column, $$[$0])
	
break;
case 9:

		this.$ = new Declarate($$[$0], _$[$0-1].first_line, _$[$0-1].first_column)
	
break;
case 10:

		// DECLARE @id INT DEFAULT 1
		let id_tmp3 = $$[$0-3].toString().replace("@","")
		this.$ = new Declarate_def(id_tmp3, $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column)
	
break;
case 11:

		let id_tmp1 = $$[$0-1].toString().replace("@","")
		$$[$0-3].push(new var_list(id_tmp1, $$[$0]))
		this.$ = $$[$0-3]
	
break;
case 12:

		let id_tmp2 = $$[$0-1].toString().replace("@","")

		this.$ = [new var_list(id_tmp2, $$[$0])]
	
break;
case 13:

		let id_tmp4 = $$[$0-2].toString().replace("@","")
		this.$ = new Set(id_tmp4, $$[$0], _$[$0-3].first_line, _$[$0-3].first_column)
	
break;
case 14:

		let id_tmp5 = $$[$0].toString().replace("@","")
		this.$ = new Select(id_tmp5, _$[$0-1].first_line, _$[$0-1].first_column)
	
break;
case 17:

		this.$ = new Aritmertic($$[$0-2], $$[$0-1], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column)
	
break;
case 18:

		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, $$[$0], Type_dxnry.INT)
	
break;
case 19:

		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, $$[$0], Type_dxnry.DOUBLE)
	
break;
case 20:

		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, $$[$0], Type_dxnry.DATE)
	
break;
case 21:

		let string_tmp = $$[$0].toString().replace('"','')
		string_tmp = string_tmp.replace('"','')
		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, string_tmp, Type_dxnry.STRING)
	
break;
case 22: case 23:

		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, $$[$0], Type_dxnry.BOOLEAN)
	
break;
case 24:

		this.$ = new Primitive(_$[$0].first_line, _$[$0].first_column, $$[$0], Type_dxnry.NULL)
	
break;
case 25:

		console.error('Error sintáctico: ' + yytext + ',  linea: ' + this.$.first_line + ', columna: ' + this.$.first_column)
	
break;
case 26:

		this.$ = Type_dxnry.INT
	
break;
case 27:

		this.$ = Type_dxnry.DOUBLE
	
break;
case 28:

		this.$ = Type_dxnry.DATE
	
break;
case 29:

		this.$ = Type_dxnry.STRING
	
break;
case 30:

		this.$ = Type_dxnry.BOOLEAN
	
break;
        }
    }
}


/* generated by ts-jison-lex 0.3.0 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';
export class QueryParserLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"case-insensitive":true,"moduleName":"QueryParser"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [/^(?:,)/i,/^(?:\+)/i,/^(?:\\-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:null\b)/i,/^(?:print\b)/i,/^(?:declare\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:date\b)/i,/^(?:varchar\b)/i,/^(?:boolean\b)/i,/^(?:default\b)/i,/^(?:set\b)/i,/^(?:select\b)/i,/^(?:(@[^@\s,]+))/i,/^(?:(\d{4}-\d{2}-\d{2}))/i,/^(?:(\d+\.\d+))/i,/^(?:([0-9]+))/i,/^(?:("([^"\\]|\\.)*"))/i,/^(?:[ \s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0: return 19
      break;
    case 1: return 24
      break;
    case 2: return 'LESS'
      break;
    case 3: return 'BY'
      break;
    case 4: return 'DIVIDED'
      break;
    case 5: return 'MODUL'
      break;
    case 6: return 21
      break;
    case 7: return 'DIFERENT'
      break;
    case 8: return 'MINOR'
      break;
    case 9: return 'MINOREQUAL'
      break;
    case 10: return 'GREATER'
      break;
    case 11: return 'GREATEREQUAL'
      break;
    case 12: return 'AND'
      break;
    case 13: return 'OR'
      break;
    case 14: return 'NOT'
      break;
    case 15: return 29
      break;
    case 16: return 30
      break;
    case 17: return 31
      break;
    case 18: return 11
      break;
    case 19: return 13
      break;
    case 20: return 32
      break;
    case 21: return 33
      break;
    case 22: return 34
      break;
    case 23: return 35
      break;
    case 24: return 36
      break;
    case 25: return 17
      break;
    case 26: return 20
      break;
    case 27: return 22
      break;
    case 28: return 15
      break;
    case 29: return 27
      break;
    case 30: return 26
      break;
    case 31: return 25
      break;
    case 32: return 28
      break;
    case 33:/* Espacios se ignoran */
      break;
    case 34:return 5;
      break;
    case 35: console.error('Error léxico: \"' + yy_.yytext + '\", linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column);  
      break;
        }
    }
}

