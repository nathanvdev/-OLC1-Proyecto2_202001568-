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
	import Create_Table  from '../instruction/Create_table.js'
	import Alter_Add from '../instruction/Alter_Add.js'
	import Alter_Drop from '../instruction/Alter_Drop.js'
	import Alter_Rename_table from '../instruction/Alter_Rename_table.js'
	import Alter_Rename_column from '../instruction/Alter_Rename_column.js'

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
	|ddl
;

print	
	: RPRINT expresion{
		$$ = new Print(@1.first_line, @1.first_column, $2)
	}
;

declare
	: RDECLARE variable_l {
		$$ = new Declarate($2, @1.first_line, @1.first_column)
	}
	| RDECLARE VARIABLE_NAME data_type RDEFAULT primitivo{
		// DECLARE @id INT DEFAULT 1
		let id_tmp3 = $2.toString().replace("@","")
		$$ = new Declarate_def(id_tmp3, $3, $5, @1.first_line, @1.first_column)
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
		$$ = new Set(id_tmp4, $4, @1.first_line, @1.first_column)
	}
;

select
	: RSELECT VARIABLE_NAME{
		let id_tmp5 = $2.toString().replace("@","")
		$$ = new Select(id_tmp5, @1.first_line, @1.first_column)
	}
;

ddl
	: create{
		$$ = $1
	}
	| alter{
		$$ = $1
	}
;

create
	: RCREATE RTABLE ID PARENIZQ column_list PARENDER PUNTOCOMA{
		$$ = new Create_Table($3, $5, @1.first_line, @1.first_column)
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
		$$ = new Alter_Add($3, $5, $6, @1.first_line, @1.first_column)
	}
	| RALTER RTABLE ID RDROP RCOLUMN ID PUNTOCOMA{
		$$ = new Alter_Drop($3, $6, @1.first_line, @1.first_column)
	}
	| RALTER RTABLE ID RRENAME RTO ID PUNTOCOMA{
		$$ = new Alter_Rename_table($3, $6, @1.first_line, @1.first_column)
	}
	| RALTER RTABLE ID RRENAME RCOLUMN ID RTO ID PUNTOCOMA{
		$$ = new Alter_Rename_column($3, $6, $8, @1.first_line, @1.first_column)
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
		$$ = new Aritmertic($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion LESS expresion{
		$$ = new Aritmertic($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion DIVIDED expresion{
		$$ = new Aritmertic($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion MODUL expresion{
		$$ = new Aritmertic($1, $2, $3, @1.first_line, @1.first_column)
	}
	| LESS expresion %prec NEG{
		$$ = new Aritmertic($2, "!", $2, @1.first_line, @1.first_column)
	}
;

relacional
	: expresion EQUAL expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion DIFERENT expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion MINOR expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion MINOREQUAL expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion GREATER expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion GREATEREQUAL expresion{
		$$ = new Relational($1, $2, $3, @1.first_line, @1.first_column)
	}
;

logica 
	: expresion AND expresion{
		$$ = new Logics($1, $2, $3, @1.first_line, @1.first_column)
	}
	| expresion OR expresion{
		$$ = new Logics($1, $2, $3, @1.first_line, @1.first_column)
	}
	| NOT expresion{
		$$ = new Logics($2, $1, $2, @1.first_line, @1.first_column)
	}
;

primitivo
	: ENTERO{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.INT)
	}
	| DECIMAL{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.DOUBLE)
	}
	| DATE{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.DATE)
	}
	| CADENA{
		let string_tmp = $1.toString().replace('"','')
		string_tmp = string_tmp.replace('"','')
		$$ = new Primitive(@1.first_line, @1.first_column, string_tmp, Type_dxnry.STRING)
	}
	| RTRUE{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.BOOLEAN)
	}
	| RFALSE{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.BOOLEAN)
	}
	| RNULL{
		$$ = new Primitive(@1.first_line, @1.first_column, $1, Type_dxnry.NULL)
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