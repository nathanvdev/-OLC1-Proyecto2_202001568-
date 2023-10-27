// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares

date	\d{4}\-\d{2}\-\d{2}
decimal \d+\.\d+
entero  [0-9]+
variable \@[^@\s,;()-]+
cadena 	\"([^"\\]|\\.)*\"
id 		[a-z_][a-z0-9_]*

%%
// -----> Reglas Lexicas
"--".*					{ /* Comentarios de linea */ }
\/\*[\s\S]*?\*\/		{ /* Comentarios multilinea */ }
"*"                     { return 'BY'}
".."					{ return 'RANGO'}
"("                     { return 'PARENIZQ'}
")"                     { return 'PARENDER'}
";"                     { return 'PUNTOCOMA'}
","						{ return 'COMMA'}
"+"                     { return 'PLUS'}
"-"                     { return 'LESS'}
"/"                     { return 'DIVIDED'}
"%"                     { return 'MODUL'}
">="                    { return 'GREATEREQUAL'}
"<="                    { return 'MINOREQUAL'}
"!="                    { return 'DIFERENT'}
"="                     { return 'EQUAL'}
"<"                     { return 'MINOR'}
">"                     { return 'GREATER'}
"and"                   { return 'AND'}
"or"                    { return 'OR'}
"not"                   { return 'NOT'}
"true"					{ return 'RTRUE'}
"false"					{ return 'RFALSE'}
"null"					{ return 'RNULL'}
"print"					{ return 'RPRINT'}
"declare"				{ return 'RDECLARE'}
"int"					{ return 'RINT'}
"double"				{ return 'RDOUBLE'}
"date"					{ return 'RDATE'}
"varchar"				{ return 'RVARCHAR'}	
"boolean"				{ return 'RBOOLEAN'}
"default"				{ return 'RDEFAULT'}
"end"					{ return 'REND'}
"set"					{ return 'RSET'}
"select"				{ return 'RSELECT'}
"create"				{ return 'RCREATE'}
"table"					{ return 'RTABLE'}
"alter"					{ return 'RALTER'}
"add"					{ return 'RADD'}
"drop"					{ return 'RDROP'}
"column"				{ return 'RCOLUMN'}
"rename"				{ return 'RRENAME'}
"to"					{ return 'RTO'}
"insert"				{ return 'RINSERT'}
"into"					{ return 'RINTO'}
"values"				{ return 'RVALUES'}
"from"					{ return 'RFROM'}
"where"					{ return 'RWHERE'}
"update"				{ return 'RUPDATE'}
"truncate"				{ return 'RTRUNCATE'}
"delete"				{ return 'RDELETE'}
"cast"					{ return 'RCAST'}
"as"					{ return 'RAS'}
"if"					{ return 'RIF'}
"then"					{ return 'RTHEN'}
"else"					{ return 'RELSE'}
"when"					{ return 'RWHEN'}
"case"					{ return 'RCASE'}
"begin"					{ return 'RBEGIN'}
"end"					{ return 'REND'}
"while"					{ return 'RWHILE'}
"for"					{ return 'RFOR'}
"in"					{ return 'RIN'}
"break"					{ return 'RBREAK'}
"continue"				{ return 'RCONTINUE'}
"function"				{ return 'RFUNCTION'}
"return"				{ return 'RRETURN'}
"returns"				{ return 'RRETURNS'}
"procedure"				{ return 'RPROCEDURE'}
"call"					{ return 'RCALL'}
"lower"					{ return 'RLOWER'}
"upper"					{ return 'RUPPER'}
"round"					{ return 'RROUND'}
"len"				{ return 'RLENGTH'}
"truncate"				{ return 'RTRUNCATE'}
"typeof"				{ return 'RTYPEOF'}
{variable}				{ return 'VARIABLE_NAME'}
{date}					{ return 'DATE'}
{decimal}               { return 'DECIMAL'} 
{entero}                { return 'ENTERO'}
{cadena}				{ return 'CADENA'}
{id}					{ return 'ID'}

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}
{coment_line}           {/* Comentarios de linea se ignoran */}
{coment_multiline}      {/* Comentarios multilinea se ignoran */}



// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################

// Codigo Typerscript

%{
  	import Print from '../instruction/print.js'
	import Primitive from "../expression/primitives.js"
	import {Type_dxnry} from "../abstrac/Return.js"
  	import {Declarate, Declarate_def, Set, Select} from "../instruction/Declarate.js"
  	import {var_list} from "../instruction/Declarate.js"
  	import Aritmertic from "../expression/Aritmetic.js"
	import Relational from "../expression/Relational.js"
	import Logics from "../expression/Logics.js"
	import ddl_Create_Table from '../instruction/DDl/ddl_Create_Table.js'
	import ddl_Add from '../instruction/DDl/ddl_Add.js'
	import { ddl_Drop_Column, ddl_Drop_Table } from '../instruction/DDl/ddl_Drop.js'
	import ddl_Rename_table from '../instruction/DDl/ddl_Rename_table.js'
	import ddl_Rename_Column from '../instruction/DDl/ddl_Rename_column.js'
	import dml_Insert from '../instruction/DML/dml_Insert.js'
	import { dml_Select, dml_Select_where } from '../instruction/DML/dml_Select.js'
	import dml_Update from '../instruction/DML/dml_update.js'
	import dml_Truncate from '../instruction/DML/dml_Truncate.js'
	import dml_Delete from '../instruction/DML/dml_Delete.js'
	import Cast from '../expression/Cast.js'
	import Statement from '../instruction/Statement.js'
	import If from '../instruction/If.js'
	import Variable from '../expression/Variable.js'
	import Case from '../instruction/Case.js'
  	import Group from '../expression/Group.js'
    import While from '../instruction/While.js'
    import For from '../instruction/For.js'
    import Ffunction from '../instruction/Ffunction.js'
    import Param from '../expression/Param.js'
    import ReturnExpression from '../expression/ReturnExp.js'
    import CallFunction from '../instruction/CallFunction.js'
	import Procedure from '../instruction/Procedure.js'
    import CallProcedure from '../instruction/CallProcedure.js'
	import ToLower from '../expression/Lower.js'
    import TOUpper from '../expression/Upper.js'
    import Round from '../expression/Round.js'
    import Lenght from '../expression/Lenght.js'
    import Truncate from '../expression/Truncate.js'
    import TypeOf from '../expression/TypeOf.js'

%}



// -------> Precedencia

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'EQUAL' 'DIFERENT' 'MINOR' 'MINOREQUAL' 'GREATER' 'GREATEREQUAL' 
%left 'PLUS' 'LESS'
%left 'BY' 'DIVIDED' 'MODUL' 
++++++%right 'NEG'


// -------> Simbolo Inicial
%start start


%% // ------> Gramatica

start
	: instrucciones EOF{
		return $1
	}
;

instrucciones 	
	: instrucciones instruccion{
		$1.push($2)
		$$ = $1
	}
	| instruccion{
		$$ = [$1]
	}
;

instruccion 	
	: print{
		$$ = $1
	}
	| declare{
		$$ = $1
	}
	| set{
		$$ = $1
	}
	| select{
		$$ = $1
	}
	| ddl{
		$$ = $1
	}
	| dml{
		$$ = $1
	}
	| if{
		$$ = $1
	}
	| case{
		$$ = $1
	}
	| while{
		$$ = $1
	}
	| for{
		$$ = $1
	}
	|function{
		$$ = $1
	}
	|call_function{
		$$ = $1
	}
	|procedure{
		$$ = $1
	}
	|call_procedure{
		$$ = $1
	}
	| RBREAK PUNTOCOMA{
		$$ = new Primitive( null, Type_dxnry.BREAK)
	}
	| RCONTINUE PUNTOCOMA{
		$$ = new Primitive( null, Type_dxnry.CONTINUE)
	}
	| RRETURN PUNTOCOMA{ 
		$$ = new ReturnExpression( null, Type_dxnry.RETURN); 
	}
	| RRETURN expresion PUNTOCOMA{ 
		$$ = new ReturnExpression( $2, Type_dxnry.RETURN); 
	}
;

print	
	: RPRINT expresion PUNTOCOMA{
		$$ = new Print( $2)
	}
;

declare
	: RDECLARE variable_l PUNTOCOMA{
		$$ = new Declarate($2)
	}
	| RDECLARE VARIABLE_NAME data_type RDEFAULT primitivo PUNTOCOMA{
		// DECLARE @id INT DEFAULT 1
		$$ = new Declarate_def($2, $3, $5)
	}
;

variable_l
	: variable_l COMMA VARIABLE_NAME data_type{
		$1.push(new var_list($3, $4))
		$$ = $1
	}
	| VARIABLE_NAME data_type{


		$$ = [new var_list($1, $2)]
	}
;

set 
	: RSET VARIABLE_NAME EQUAL expresion PUNTOCOMA{
		$$ = new Set($2, $4)
	}
;

select
	: RSELECT expresion PUNTOCOMA{
		$$ = new Select($2)
	}
;

ddl
	: create{
		$$ = $1
	}
	| alter{
		$$ = $1
	}
	| drop{
		$$ = $1
	}
;

create
	: RCREATE RTABLE ID PARENIZQ column_list PARENDER PUNTOCOMA{
		$$ = new ddl_Create_Table($3, $5)
	}
;

column_list
	: column_list COMMA ID data_type{
		$$ = $1
		$1.push([$3, $4])
	}
	| ID data_type{
		$$ = []
		$$.push([$1, $2])
	}
;

alter
	: RALTER RTABLE ID RADD ID data_type PUNTOCOMA{
		$$ = new ddl_Add($3, $5, $6)
	}
	| RALTER RTABLE ID RDROP RCOLUMN ID PUNTOCOMA{
		$$ = new ddl_Drop_Column($3, $6)
	}
	| RALTER RTABLE ID RRENAME RTO ID PUNTOCOMA{
		$$ = new ddl_Rename_table($3, $6)
	}
	| RALTER RTABLE ID RRENAME RCOLUMN ID RTO ID PUNTOCOMA{
		$$ = new ddl_Rename_Column($3, $6, $8)
	}
;

drop
	: RDROP RTABLE ID PUNTOCOMA{
		$$ = new ddl_Drop_Table($3)
	}
;

dml
	: dml_insert{
		$$ = $1
	}
	| dml_select{
		$$ = $1
	}
	| dml_update{
		$$ = $1
	}
	|dml_truncate{
		$$ = $1
	}
	|dml_delete{
		$$ = $1
	}
;

dml_insert
	: RINSERT RINTO ID PARENIZQ id_list PARENDER RVALUES PARENIZQ values_list PARENDER PUNTOCOMA{
		$$ = new dml_Insert($3, $5, $9)
	}
;

values_list
	: values_list COMMA primitivo{
		$$ = $1
		$1.push($3)
	}
	| primitivo{
		$$ = []
		$$.push($1)
	}
;

dml_select
	: RSELECT id_list RFROM ID PUNTOCOMA{
		$$ = new dml_Select($2, $4)
	}
	| RSELECT BY RFROM ID PUNTOCOMA{
		$$ = new dml_Select("*", $4)
	}
	| RSELECT id_list RFROM ID RWHERE where_conds PUNTOCOMA{
		$$ = new dml_Select_where($2, $4, $6)
	}
	| RSELECT BY RFROM ID RWHERE where_conds PUNTOCOMA{
		$$ = new dml_Select_where("*", $4, $6)
	}
;

dml_update
	: RUPDATE ID RSET set_columns RWHERE where_conds PUNTOCOMA{
		$$ = new dml_Update($2, $4, $6)
	}
;

set_columns
	: ID EQUAL primitivo{
		$$ = []
		$$.push([$1, $3])
	}
	| set_columns COMMA ID EQUAL primitivo{
		$$ = $1
		$1.push([$3, $5])
	}
;

dml_truncate
	: RTRUNCATE RTABLE ID PUNTOCOMA{
		$$ = new dml_Truncate($3)
	}
;

dml_delete
	: RDELETE RFROM ID RWHERE where_conds PUNTOCOMA{
		$$ = new dml_Delete($3, $5)
	}
;




where_conds
	: where_conds AND where_conds{
		$$ = new Logics($1, $2, $3)
	}
	| where_conds OR where_conds{
		$$ = new Logics($1, $2, $3)
	}
	| where_conds NOT where_conds{
		$$ = new Logics($1, $2, $3)
	}
	| condition{
		$$ = $1
	}
;

condition
	: ID EQUAL arit_cond{
		$$ = new Relational($1, $2, $3)
	}
	| ID DIFERENT arit_cond{
		$$ = new Relational($1, $2, $3)
	}
	| ID MINOR arit_cond{
		$$ = new Relational($1, $2, $3)
	}
	| ID MINOREQUAL arit_cond{
		$$ = new Relational($1, $2, $3)
	}
	| ID GREATER arit_cond{
		$$ = new Relational($1, $2, $3)
	}
	| ID GREATEREQUAL arit_cond{
		$$ = new Relational($1, $2, $3)
	}
;

arit_cond
	: arit_cond PLUS arit_cond{
		$$ = new Aritmertic($1, $2, $3)
	}
	| arit_cond LESS arit_cond{
		$$ = new Aritmertic($1, $2, $3)
	}
	| arit_cond DIVIDED arit_cond{
		$$ = new Aritmertic($1, $2, $3)
	}
	| arit_cond MODUL arit_cond{
		$$ = new Aritmertic($1, $2, $3)
	}
	| LESS arit_cond %prec NEG{
		$$ = new Aritmertic($2, "!", $2)
	}
	| arit_cond BY arit_cond{
		$$ = new Aritmertic($1, $2, $3)
	}
	| primitivo{
		$$ = $1
	}
;


if
	: RIF expresion RTHEN newStatement REND RIF PUNTOCOMA{
		$$ = new If($2, $4, null)
	}
	| RIF expresion RTHEN newStatement RELSE newStatement REND RIF PUNTOCOMA{
		$$ = new If($2, $4, $6)
	}
;

case 
	: RCASE expresion case_list RELSE expresion REND PUNTOCOMA{
		$$ = new Case($2, $3, $5, null)
	}
	| RCASE expresion case_list RELSE expresion REND a_s PUNTOCOMA{
		$$ = new Case($2, $3, $5, $7)
	}
	| RCASE case_list RELSE expresion REND PUNTOCOMA{
		$$ = new Case(null, $2, $4, null)
	}
	| RCASE case_list RELSE expresion REND a_s PUNTOCOMA{
		$$ = new Case(null, $2, $4, $6)
	}
;

a_s
	: RAS expresion{
		$$ = $2
	}
;

case_list
	: case_list RWHEN expresion RTHEN expresion{
		$$ = $1
		$1.push([$3, $5])
	}
	| RWHEN expresion RTHEN expresion{
		$$ = []
		$$.push([$2, $4])
	}
;


newStatement
	: instrucciones{
		$$ = new Statement($1)
	}
;


while
	: RWHILE expresion RBEGIN newStatement REND PUNTOCOMA{
		$$ = new While($2, $4)
	}
;

for
	: RFOR VARIABLE_NAME RIN ENTERO RANGO ENTERO RBEGIN newStatement REND PUNTOCOMA{
		$$ = new For(new Variable($2), parseInt($4), parseInt($6), $8)
	}

;

function
	: RCREATE RFUNCTION ID PARENIZQ params PARENDER RRETURN data_type RBEGIN newStatement REND PUNTOCOMA{
		$$ = new Ffunction($3, $5, $8, $10)
	}
	| RCREATE RFUNCTION ID PARENIZQ params PARENDER RRETURNS data_type RBEGIN newStatement REND PUNTOCOMA{
		$$ = new Ffunction($3, $5, $8, $10)
	}
;


args
	: args COMMA expresion{
		$1.push($3)
		$$ = $1
	}
	| expresion{
		$$ = [$1]
	}
	|{
		$$ = []
	}
;

procedure
	: RCREATE RPROCEDURE ID params RAS RBEGIN newStatement REND PUNTOCOMA{
		$$ = new Procedure($3, $4, $7)
	}
;

call_procedure
	: RCALL ID PARENIZQ args PARENDER PUNTOCOMA{
		$$ = new CallProcedure($2, $4)
	}
;

params
	: params COMMA VARIABLE_NAME data_type{
		$1.push( new Param($3, $4));
        $$ = $1;
	}
	| VARIABLE_NAME data_type{
		let param = new Param($1, $2)
		let params = [];
		params.push(param);
		$$ = params;
	}
;

expresion	
	: primitivo{
		$$ = $1
	}
	| aritmetica{
		$$ = $1
	}
	| relacional{
		$$ = $1
	}
	| logica{
		$$ = $1
	}
	| cast{
		$$ = $1
	}
	| natives{
		$$ = $1
	}
	| PARENIZQ expresion PARENDER{
		$$ = new Group($2)
	} 

	| VARIABLE_NAME{
		$$ = new Variable($1)
	}
	| ID PARENIZQ args PARENDER{
		$$ = new CallFunction($1, $3)
	}
;


id_list
	: id_list COMMA ID{
		$1.push($3)
		$$ = $1
	}
	| ID{
		$$ = []
		$$.push($1)
	}
;

aritmetica
	: expresion PLUS expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| expresion LESS expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| expresion BY expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| expresion DIVIDED expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| expresion MODUL expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| LESS expresion %prec NEG{
		$$ = new Aritmertic($2, "!", $2)
	}
;

relacional
	: expresion EQUAL expresion{
		$$ = new Relational($1, $2, $3)
	}
	| expresion DIFERENT expresion{
		$$ = new Relational($1, $2, $3)
	}
	| expresion MINOR expresion{
		$$ = new Relational($1, $2, $3)
	}
	| expresion MINOREQUAL expresion{
		$$ = new Relational($1, $2, $3)
	}
	| expresion GREATER expresion{
		$$ = new Relational($1, $2, $3)
	}
	| expresion GREATEREQUAL expresion{
		$$ = new Relational($1, $2, $3)
	}
;

logica 
	: expresion AND expresion{
		$$ = new Logics($1, $2, $3)
	}
	| expresion OR expresion{
		$$ = new Logics($1, $2, $3)
	}
	| NOT expresion{
		$$ = new Logics($2, $1, $2)
	}
;

primitivo
	: ENTERO{
		$$ = new Primitive( $1, Type_dxnry.INT)
	}
	| DECIMAL{
		$$ = new Primitive( $1, Type_dxnry.DOUBLE)
	}
	| DATE{
		$$ = new Primitive( $1, Type_dxnry.DATE)
	}
	| CADENA{
		let string_tmp = $1.toString().replace('"','')
		string_tmp = string_tmp.replace('"','')
		$$ = new Primitive( string_tmp, Type_dxnry.STRING)
	}
	| RTRUE{
		$$ = new Primitive( $1, Type_dxnry.BOOLEAN)
	}
	| RFALSE{
		$$ = new Primitive( $1, Type_dxnry.BOOLEAN)
	}
	| RNULL{
		$$ = new Primitive( $1, Type_dxnry.NULL)
	}
;

cast
	: RCAST PARENIZQ expresion RAS data_type PARENDER{
		$$ = new Cast( $3, $5)
	}
;

natives
	: RLOWER PARENIZQ expresion PARENDER{
		$$ = new ToLower($3)
	}
	| RUPPER PARENIZQ expresion PARENDER{
		$$ = new TOUpper($3)
	}
	| RROUND PARENIZQ expresion COMMA ENTERO PARENDER{
		$$ = new Round($3, new Primitive( $5, Type_dxnry.INT))
	}
	| RROUND PARENIZQ expresion PARENDER{
		$$ = new Round($3, null)
	}
	| RLENGTH PARENIZQ expresion PARENDER{
		$$ = new Lenght($3)
	}
	| RTRUNCATE PARENIZQ expresion COMMA ENTERO PARENDER{
		$$ = new Truncate($3, new Primitive( $5, Type_dxnry.INT))
	}
	| RTRUNCATE PARENIZQ expresion PARENDER{
		$$ = new Truncate($3, null)
	}
	| RTYPEOF PARENIZQ expresion PARENDER{
		$$ = new TypeOf($3)
	}
;

data_type
	: RINT{
		$$ = Type_dxnry.INT
	}
	| RDOUBLE{
		$$ = Type_dxnry.DOUBLE
	}
	| RDATE{
		$$ = Type_dxnry.DATE
	}
	| RVARCHAR{
		$$ = Type_dxnry.STRING
	}
	| RBOOLEAN{
		$$ = Type_dxnry.BOOLEAN
	}
	| error{
		console.error('Error sintáctico: ' + yytext + ',  linea: ' + this.$.first_line + ', columna: ' + this.$.first_column)
	}
;