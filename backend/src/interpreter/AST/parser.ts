/* parser generated by jison 0.3.0 */
/**
 * Returns a Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */

  	import Print from '../instruction/print.js'
	import Primitive from "../expression/primitives.js"
	import {Type_dxnry} from "../abstrac/Return.js"
  	import {Declarate, Declarate_def, Set, Select} from "../instruction/Declarate.js"
  	import {var_list} from "../instruction/Declarate.js"
  	import Aritmertic from "../expression/Aritmetic.js"
	import Relational from "../expression/Relational.js"
	import Logics from "../expression/Logics.js"
	import Create_Table from '../instruction/DDl/Create_Table.js'
	import Add from '../instruction/DDl/Add.js'
	import {Drop_Column, Drop_Table} from '../instruction/DDl/Drop.js'
 	import Rename_table from '../instruction/DDl/Rename_table.js'
	import Rename_Column from '../instruction/DDl/Rename_column.js'
	import Insert from '../instruction/DML/Insert.js'

import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType, o } from '@ts-jison/parser';const $V0=[1,10],$V1=[1,11],$V2=[1,12],$V3=[1,13],$V4=[1,19],$V5=[1,20],$V6=[1,21],$V7=[1,22],$V8=[5,13,15,22,24,28,35,37,43],$V9=[1,37],$Va=[1,39],$Vb=[1,38],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[1,46],$Vk=[1,55],$Vl=[1,61],$Vm=[1,56],$Vn=[1,57],$Vo=[1,58],$Vp=[1,59],$Vq=[1,60],$Vr=[1,51],$Vs=[1,52],$Vt=[1,53],$Vu=[1,54],$Vv=[5,13,15,22,23,24,28,35,37,43,52,53,57,58,59,60,61,62,63,64,65],$Vw=[5,13,15,21,22,23,24,28,33,34,35,37,43,52,53,54,57,58,59,60,61,62,63,64,65],$Vx=[1,67],$Vy=[1,68],$Vz=[1,69],$VA=[1,70],$VB=[1,71],$VC=[1,74],$VD=[21,33,48],$VE=[5,13,15,22,24,28,35,37,43,52,53],$VF=[5,13,15,21,22,24,28,35,37,43],$VG=[5,13,15,19,21,22,24,28,33,34,35,37,43],$VH=[5,13,15,22,23,24,28,35,37,43,52,53,57,58,59,60,61,62,63],$VI=[5,13,15,22,23,24,28,35,37,43,52,53,57,58,59,60,61],$VJ=[1,118],$VK=[1,128],$VL=[1,130],$VM=[34,52,53,54],$VN=[21,33],$VO=[1,148],$VP=[1,158],$VQ=[1,159],$VR=[1,160],$VS=[1,161],$VT=[34,52,53,54,62,63,64,65],$VU=[34,52,53,54,62,63];

export class QueryParserParser extends JisonParser implements JisonParserApi {
    $?: any;

    constructor (yy = {}, lexer = new QueryParserLexer(yy)) {
      super(yy, lexer);
    }

    symbols_: SymbolsType = {"error":2,"start":3,"instrucciones":4,"EOF":5,"instruccion":6,"print":7,"declare":8,"set":9,"select":10,"ddl":11,"dml":12,"RPRINT":13,"expresion":14,"RDECLARE":15,"variable_l":16,"VARIABLE_NAME":17,"data_type":18,"RDEFAULT":19,"primitivo":20,"COMMA":21,"RSET":22,"EQUAL":23,"RSELECT":24,"create":25,"alter":26,"drop":27,"RCREATE":28,"RTABLE":29,"ID":30,"PARENIZQ":31,"column_list":32,"PARENDER":33,"PUNTOCOMA":34,"RALTER":35,"RADD":36,"RDROP":37,"RCOLUMN":38,"RRENAME":39,"RTO":40,"dml_insert":41,"dml_select":42,"RINSERT":43,"RINTO":44,"id_list":45,"RVALUES":46,"values_list":47,"RFROM":48,"BY":49,"RWHERE":50,"where_conds":51,"AND":52,"OR":53,"NOT":54,"condition":55,"arit_cond":56,"DIFERENT":57,"MINOR":58,"MINOREQUAL":59,"GREATER":60,"GREATEREQUAL":61,"PLUS":62,"LESS":63,"DIVIDED":64,"MODUL":65,"aritmetica":66,"relacional":67,"logica":68,"ENTERO":69,"DECIMAL":70,"DATE":71,"CADENA":72,"RTRUE":73,"RFALSE":74,"RNULL":75,"RINT":76,"RDOUBLE":77,"RDATE":78,"RVARCHAR":79,"RBOOLEAN":80,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",13:"RPRINT",15:"RDECLARE",17:"VARIABLE_NAME",19:"RDEFAULT",21:"COMMA",22:"RSET",23:"EQUAL",24:"RSELECT",28:"RCREATE",29:"RTABLE",30:"ID",31:"PARENIZQ",33:"PARENDER",34:"PUNTOCOMA",35:"RALTER",36:"RADD",37:"RDROP",38:"RCOLUMN",39:"RRENAME",40:"RTO",43:"RINSERT",44:"RINTO",46:"RVALUES",48:"RFROM",49:"BY",50:"RWHERE",52:"AND",53:"OR",54:"NOT",57:"DIFERENT",58:"MINOR",59:"MINOREQUAL",60:"GREATER",61:"GREATEREQUAL",62:"PLUS",63:"LESS",64:"DIVIDED",65:"MODUL",69:"ENTERO",70:"DECIMAL",71:"DATE",72:"CADENA",73:"RTRUE",74:"RFALSE",75:"RNULL",76:"RINT",77:"RDOUBLE",78:"RDATE",79:"RVARCHAR",80:"RBOOLEAN"};
    productions_: ProductionsType = [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[7,2],[8,2],[8,5],[16,4],[16,2],[9,4],[10,2],[11,1],[11,1],[11,1],[25,7],[32,4],[32,2],[26,7],[26,7],[26,7],[26,9],[27,4],[12,1],[12,1],[41,11],[45,3],[45,1],[47,3],[47,1],[42,5],[42,5],[42,7],[51,3],[51,3],[51,3],[51,1],[55,3],[55,3],[55,3],[55,3],[55,3],[55,3],[56,3],[56,3],[56,3],[56,3],[56,2],[56,1],[14,1],[14,1],[14,1],[14,1],[66,3],[66,3],[66,3],[66,3],[66,2],[67,3],[67,3],[67,3],[67,3],[67,3],[67,3],[68,3],[68,3],[68,2],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[18,1],[18,1],[18,1],[18,1],[18,1]];
    table: Array<StateType> = [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:$V0,15:$V1,22:$V2,24:$V3,25:14,26:15,27:16,28:$V4,35:$V5,37:$V6,41:17,42:18,43:$V7},{1:[3]},{5:[1,23],6:24,7:4,8:5,9:6,10:7,11:8,12:9,13:$V0,15:$V1,22:$V2,24:$V3,25:14,26:15,27:16,28:$V4,35:$V5,37:$V6,41:17,42:18,43:$V7},o($V8,[2,3]),o($V8,[2,4]),o($V8,[2,5]),o($V8,[2,6]),o($V8,[2,7]),o($V8,[2,8]),o($V8,[2,9]),{2:$V9,14:25,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{16:40,17:[1,41]},{17:[1,42]},{17:[1,43],30:$Vj,45:44,49:[1,45]},o($V8,[2,17]),o($V8,[2,18]),o($V8,[2,19]),o($V8,[2,28]),o($V8,[2,29]),{29:[1,47]},{29:[1,48]},{29:[1,49]},{44:[1,50]},{1:[2,1]},o($V8,[2,2]),o($V8,[2,10],{23:$Vk,52:$Vl,53:[1,62],57:$Vm,58:$Vn,59:$Vo,60:$Vp,61:$Vq,62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($Vv,[2,54]),o($Vv,[2,55]),o($Vv,[2,56]),o($Vv,[2,57]),o($Vw,[2,72]),o($Vw,[2,73]),o($Vw,[2,74]),o($Vw,[2,75]),o($Vw,[2,76]),o($Vw,[2,77]),o($Vw,[2,78]),o($Vw,[2,79]),{2:$V9,14:63,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:64,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($V8,[2,11],{21:[1,65]}),{18:66,76:$Vx,77:$Vy,78:$Vz,79:$VA,80:$VB},{23:[1,72]},o($V8,[2,16]),{21:$VC,48:[1,73]},{48:[1,75]},o($VD,[2,32]),{30:[1,76]},{30:[1,77]},{30:[1,78]},{30:[1,79]},{2:$V9,14:80,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:81,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:82,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:83,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:84,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:85,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:86,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:87,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:88,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:89,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:90,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,14:91,20:26,54:$Va,63:$Vb,66:27,67:28,68:29,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($Vv,[2,62]),o($VE,[2,71],{23:$Vk,57:$Vm,58:$Vn,59:$Vo,60:$Vp,61:$Vq,62:$Vr,63:$Vs,64:$Vt,65:$Vu}),{17:[1,92]},o($VF,[2,14],{19:[1,93]}),o($VG,[2,80]),o($VG,[2,81]),o($VG,[2,82]),o($VG,[2,83]),o($VG,[2,84]),{2:$V9,20:94,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{30:[1,95]},{30:[1,96]},{30:[1,97]},{31:[1,98]},{36:[1,99],37:[1,100],39:[1,101]},{34:[1,102]},{31:[1,103]},o($VH,[2,58],{64:$Vt,65:$Vu}),o($VH,[2,59],{64:$Vt,65:$Vu}),o($Vv,[2,60]),o($Vv,[2,61]),o($VI,[2,63],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VI,[2,64],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VI,[2,65],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VI,[2,66],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VI,[2,67],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VI,[2,68],{62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o($VE,[2,69],{23:$Vk,57:$Vm,58:$Vn,59:$Vo,60:$Vp,61:$Vq,62:$Vr,63:$Vs,64:$Vt,65:$Vu}),o([5,13,15,22,24,28,35,37,43,53],[2,70],{23:$Vk,52:$Vl,57:$Vm,58:$Vn,59:$Vo,60:$Vp,61:$Vq,62:$Vr,63:$Vs,64:$Vt,65:$Vu}),{18:104,76:$Vx,77:$Vy,78:$Vz,79:$VA,80:$VB},{2:$V9,20:105,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($V8,[2,15]),{34:[1,106],50:[1,107]},o($VD,[2,31]),{34:[1,108]},{30:[1,110],32:109},{30:[1,111]},{38:[1,112]},{38:[1,114],40:[1,113]},o($V8,[2,27]),{30:$Vj,45:115},o($VF,[2,13]),o($V8,[2,12]),o($V8,[2,35]),{30:$VJ,51:116,55:117},o($V8,[2,36]),{21:[1,120],33:[1,119]},{18:121,76:$Vx,77:$Vy,78:$Vz,79:$VA,80:$VB},{18:122,76:$Vx,77:$Vy,78:$Vz,79:$VA,80:$VB},{30:[1,123]},{30:[1,124]},{30:[1,125]},{21:$VC,33:[1,126]},{34:[1,127],52:$VK,53:[1,129],54:$VL},o($VM,[2,41]),{23:[1,131],57:[1,132],58:[1,133],59:[1,134],60:[1,135],61:[1,136]},{34:[1,137]},{30:[1,138]},o($VN,[2,22]),{34:[1,139]},{34:[1,140]},{34:[1,141]},{40:[1,142]},{46:[1,143]},o($V8,[2,37]),{30:$VJ,51:144,55:117},{30:$VJ,51:145,55:117},{30:$VJ,51:146,55:117},{2:$V9,20:149,56:147,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:150,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:151,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:152,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:153,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:154,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($V8,[2,20]),{18:155,76:$Vx,77:$Vy,78:$Vz,79:$VA,80:$VB},o($V8,[2,23]),o($V8,[2,24]),o($V8,[2,25]),{30:[1,156]},{31:[1,157]},o([34,52,53],[2,38],{54:$VL}),o([34,53],[2,39],{52:$VK,54:$VL}),o($VM,[2,40]),o($VM,[2,42],{62:$VP,63:$VQ,64:$VR,65:$VS}),{2:$V9,20:149,56:162,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($VT,[2,53]),o($VM,[2,43],{62:$VP,63:$VQ,64:$VR,65:$VS}),o($VM,[2,44],{62:$VP,63:$VQ,64:$VR,65:$VS}),o($VM,[2,45],{62:$VP,63:$VQ,64:$VR,65:$VS}),o($VM,[2,46],{62:$VP,63:$VQ,64:$VR,65:$VS}),o($VM,[2,47],{62:$VP,63:$VQ,64:$VR,65:$VS}),o($VN,[2,21]),{34:[1,163]},{2:$V9,20:165,47:164,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:166,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:167,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:168,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},{2:$V9,20:149,56:169,63:$VO,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($VT,[2,52]),o($V8,[2,26]),{21:[1,171],33:[1,170]},o($VN,[2,34]),o($VU,[2,48],{64:$VR,65:$VS}),o($VU,[2,49],{64:$VR,65:$VS}),o($VT,[2,50]),o($VT,[2,51]),{34:[1,172]},{2:$V9,20:173,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi},o($V8,[2,30]),o($VN,[2,33])];
    defaultActions: {[key:number]: any} = {23:[2,1]};

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
case 4: case 5: case 6: case 7: case 8: case 9: case 17: case 18: case 19: case 28: case 29: case 41: case 53: case 54: case 55: case 56: case 57:

		this.$ = $$[$0]
	
break;
case 10:

		this.$ = new Print( $$[$0])
	
break;
case 11:

		this.$ = new Declarate($$[$0])
	
break;
case 12:

		// DECLARE @id INT DEFAULT 1
		let id_tmp3 = $$[$0-3].toString().replace("@","")
		this.$ = new Declarate_def(id_tmp3, $$[$0-2], $$[$0])
	
break;
case 13:

		let id_tmp1 = $$[$0-1].toString().replace("@","")
		$$[$0-3].push(new var_list(id_tmp1, $$[$0]))
		this.$ = $$[$0-3]
	
break;
case 14:

		let id_tmp2 = $$[$0-1].toString().replace("@","")

		this.$ = [new var_list(id_tmp2, $$[$0])]
	
break;
case 15:

		let id_tmp4 = $$[$0-2].toString().replace("@","")
		this.$ = new Set(id_tmp4, $$[$0])
	
break;
case 16:

		let id_tmp5 = $$[$0].toString().replace("@","")
		this.$ = new Select(id_tmp5)
	
break;
case 20:

		this.$ = new Create_Table($$[$0-4], $$[$0-2])
	
break;
case 21:

		this.$ = $$[$0-3]
		$$[$0-3].push([$$[$0-1], $$[$0]])
	
break;
case 22:

		this.$ = []
		this.$.push([$$[$0-1], $$[$0]])
	
break;
case 23:

		this.$ = new Add($$[$0-4], $$[$0-2], $$[$0-1])
	
break;
case 24:

		this.$ = new Drop_Column($$[$0-4], $$[$0-1])
	
break;
case 25:

		this.$ = new Rename_table($$[$0-4], $$[$0-1])
	
break;
case 26:

		this.$ = new Rename_Column($$[$0-6], $$[$0-3], $$[$0-1])
	
break;
case 27:

		this.$ = new Drop_Table($$[$0-1])
	
break;
case 30:

		this.$ = new Insert($$[$0-8], $$[$0-6], $$[$0-2])
	
break;
case 31: case 33:

		this.$ = $$[$0-2]
		$$[$0-2].push($$[$0])
	
break;
case 32: case 34:

		this.$ = []
		this.$.push($$[$0])
	
break;
case 35:

		// this.$ = new DML_Select($$[$0-3], $$[$0-1])
	
break;
case 36:

		// this.$ = new DML_Select_all($$[$0-1])
	
break;
case 37:

		// this.$ = new DML_Select_where($$[$0-5], $$[$0-3], $$[$0-1])
	
break;
case 38: case 39: case 40: case 69: case 70:

		this.$ = new Logics($$[$0-2], $$[$0-1], $$[$0])
	
break;
case 42: case 43: case 44: case 45: case 46: case 47: case 63: case 64: case 65: case 66: case 67: case 68:

		this.$ = new Relational($$[$0-2], $$[$0-1], $$[$0])
	
break;
case 48: case 49: case 50: case 51: case 58: case 59: case 60: case 61:

		this.$ = new Aritmertic($$[$0-2], $$[$0-1], $$[$0])
	
break;
case 52: case 62:

		this.$ = new Aritmertic($$[$0], "!", $$[$0])
	
break;
case 71:

		this.$ = new Logics($$[$0], $$[$0-1], $$[$0])
	
break;
case 72:

		this.$ = new Primitive( $$[$0], Type_dxnry.INT)
	
break;
case 73:

		this.$ = new Primitive( $$[$0], Type_dxnry.DOUBLE)
	
break;
case 74:

		this.$ = new Primitive( $$[$0], Type_dxnry.DATE)
	
break;
case 75:

		let string_tmp = $$[$0].toString().replace('"','')
		string_tmp = string_tmp.replace('"','')
		this.$ = new Primitive( string_tmp, Type_dxnry.STRING)
	
break;
case 76: case 77:

		this.$ = new Primitive( $$[$0], Type_dxnry.BOOLEAN)
	
break;
case 78:

		this.$ = new Primitive( $$[$0], Type_dxnry.NULL)
	
break;
case 79:

		console.error('Error sintáctico: ' + yytext + ',  linea: ' + this.$.first_line + ', columna: ' + this.$.first_column)
	
break;
case 80:

		this.$ = Type_dxnry.INT
	
break;
case 81:

		this.$ = Type_dxnry.DOUBLE
	
break;
case 82:

		this.$ = Type_dxnry.DATE
	
break;
case 83:

		this.$ = Type_dxnry.STRING
	
break;
case 84:

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

    rules: RegExp[] = [/^(?:\()/i,/^(?:\))/i,/^(?:;)/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\/)/i,/^(?:\*)/i,/^(?:%)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:null\b)/i,/^(?:print\b)/i,/^(?:declare\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:date\b)/i,/^(?:varchar\b)/i,/^(?:boolean\b)/i,/^(?:default\b)/i,/^(?:set\b)/i,/^(?:select\b)/i,/^(?:create\b)/i,/^(?:table\b)/i,/^(?:alter\b)/i,/^(?:add\b)/i,/^(?:drop\b)/i,/^(?:column\b)/i,/^(?:rename\b)/i,/^(?:to\b)/i,/^(?:insert\b)/i,/^(?:into\b)/i,/^(?:values\b)/i,/^(?:from\b)/i,/^(?:where\b)/i,/^(?:(@[^@\s,]+))/i,/^(?:(\d{4}-\d{2}-\d{2}))/i,/^(?:(\d+\.\d+))/i,/^(?:([0-9]+))/i,/^(?:("([^"\\]|\\.)*"))/i,/^(?:([a-z][a-z0-9_-]*))/i,/^(?:[ \s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0: return 31
      break;
    case 1: return 33
      break;
    case 2: return 34
      break;
    case 3: return 21
      break;
    case 4: return 62
      break;
    case 5: return 63
      break;
    case 6: return 64
      break;
    case 7: return 49
      break;
    case 8: return 65
      break;
    case 9: return 23
      break;
    case 10: return 57
      break;
    case 11: return 58
      break;
    case 12: return 59
      break;
    case 13: return 60
      break;
    case 14: return 61
      break;
    case 15: return 52
      break;
    case 16: return 53
      break;
    case 17: return 54
      break;
    case 18: return 73
      break;
    case 19: return 74
      break;
    case 20: return 75
      break;
    case 21: return 13
      break;
    case 22: return 15
      break;
    case 23: return 76
      break;
    case 24: return 77
      break;
    case 25: return 78
      break;
    case 26: return 79
      break;
    case 27: return 80
      break;
    case 28: return 19
      break;
    case 29: return 22
      break;
    case 30: return 24
      break;
    case 31: return 28
      break;
    case 32: return 29
      break;
    case 33: return 35
      break;
    case 34: return 36
      break;
    case 35: return 37
      break;
    case 36: return 38
      break;
    case 37: return 39
      break;
    case 38: return 40
      break;
    case 39: return 43
      break;
    case 40: return 44
      break;
    case 41: return 46
      break;
    case 42: return 48
      break;
    case 43: return 50
      break;
    case 44: return 17
      break;
    case 45: return 71
      break;
    case 46: return 70
      break;
    case 47: return 69
      break;
    case 48: return 72
      break;
    case 49: return 30
      break;
    case 50:/* Espacios se ignoran */
      break;
    case 51:return 5;
      break;
    case 52: console.error('Error léxico: \"' + yy_.yytext + '\", linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column);  
      break;
        }
    }
}

