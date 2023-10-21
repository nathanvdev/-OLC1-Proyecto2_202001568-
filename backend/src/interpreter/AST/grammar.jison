// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares

date	\d{4}\-\d{2}\-\d{2};
decimal \d+\.\d+;
entero  [0-9]+;
cadena 	\"([^"\\]|\\.)*\";
variable \@[^@\s,]+;
id 		[a-z][a-z0-9_-]*


%%
// -----> Reglas Lexicas
"("                     { return 'PARENIZQ'}
")"                     { return 'PARENDER'}
";"                     { return 'PUNTOCOMA'}
","						{ return 'COMMA'}
"+"                     { return 'PLUS'}
"-"                     { return 'LESS'}
"/"                     { return 'DIVIDED'}
"*"                     { return 'BY'}
"%"                     { return 'MODUL'}
"="                     { return 'EQUAL'}
"!="                    { return 'DIFERENT'}
"<"                     { return 'MINOR'}
"<="                    { return 'MINOREQUAL'}
">"                     { return 'GREATER'}
">="                    { return 'GREATEREQUAL'}
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
{variable}				{ return 'VARIABLE_NAME'}
{date}					{ return 'DATE'}
{decimal}               { return 'DECIMAL'} 
{entero}                { return 'ENTERO'}
{cadena}				{ return 'CADENA'}
{id}					{ return 'ID'}

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}



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
	import Create_Table from '../instruction/DDl/Create_Table.js'
	import Add from '../instruction/DDl/Add.js'
	import {Drop_Column, Drop_Table} from '../instruction/DDl/Drop.js'
 	import Rename_table from '../instruction/DDl/Rename_table.js'
	import Rename_Column from '../instruction/DDl/Rename_column.js'
	import Insert from '../instruction/DML/Insert.js'
%}



// -------> Precedencia

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'EQUAL' 'DIFERENT' 'MINOR' 'MINOREQUAL' 'GREATER' 'GREATEREQUAL'
%left 'PLUS' 'LESS'
%left 'DIVIDED' 'MODUL'
%right 'NEG'


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
;

print	
	: RPRINT expresion{
		$$ = new Print( $2)
	}
;

declare
	: RDECLARE variable_l {
		$$ = new Declarate($2)
	}
	| RDECLARE VARIABLE_NAME data_type RDEFAULT primitivo{
		// DECLARE @id INT DEFAULT 1
		let id_tmp3 = $2.toString().replace("@","")
		$$ = new Declarate_def(id_tmp3, $3, $5)
	}
;

variable_l
	: variable_l COMMA VARIABLE_NAME data_type{
		let id_tmp1 = $3.toString().replace("@","")
		$1.push(new var_list(id_tmp1, $4))
		$$ = $1
	}
	| VARIABLE_NAME data_type{
		let id_tmp2 = $1.toString().replace("@","")

		$$ = [new var_list(id_tmp2, $2)]
	}
;

set 
	: RSET VARIABLE_NAME EQUAL primitivo{
		let id_tmp4 = $2.toString().replace("@","")
		$$ = new Set(id_tmp4, $4)
	}
;

select
	: RSELECT VARIABLE_NAME{
		let id_tmp5 = $2.toString().replace("@","")
		$$ = new Select(id_tmp5)
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
		$$ = new Create_Table($3, $5)
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
		$$ = new Add($3, $5, $6)
	}
	| RALTER RTABLE ID RDROP RCOLUMN ID PUNTOCOMA{
		$$ = new Drop_Column($3, $6)
	}
	| RALTER RTABLE ID RRENAME RTO ID PUNTOCOMA{
		$$ = new Rename_table($3, $6)
	}
	| RALTER RTABLE ID RRENAME RCOLUMN ID RTO ID PUNTOCOMA{
		$$ = new Rename_Column($3, $6, $8)
	}
;

drop
	: RDROP RTABLE ID PUNTOCOMA{
		$$ = new Drop_Table($3)
	}
;

dml
	: dml_insert{
		$$ = $1
	}
	| dml_select{
		$$ = $1
	}
;

dml_insert
	: RINSERT RINTO ID PARENIZQ id_list PARENDER RVALUES PARENIZQ values_list PARENDER PUNTOCOMA{
		$$ = new Insert($3, $5, $9)
	}
;

id_list
	: id_list COMMA ID{
		$$ = $1
		$1.push($3)
	}
	| ID{
		$$ = []
		$$.push($1)
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
		// $$ = new DML_Select($2, $4)
	}
	| RSELECT BY RFROM ID PUNTOCOMA{
		// $$ = new DML_Select_all($4)
	}
	| RSELECT id_list RFROM ID RWHERE where_conds PUNTOCOMA{
		// $$ = new DML_Select_where($2, $4, $6)
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
	| primitivo{
		$$ = $1
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
;

aritmetica
	: expresion PLUS expresion{
		$$ = new Aritmertic($1, $2, $3)
	}
	| expresion LESS expresion{
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
	| error{
		console.error('Error sintáctico: ' + yytext + ',  linea: ' + this.$.first_line + ', columna: ' + this.$.first_column)
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
;