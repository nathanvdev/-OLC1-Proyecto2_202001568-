// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares

date	\d{4}\-\d{2}\-\d{2};
decimal \d+\.\d+;
entero  [0-9]+;
cadena 	\"([^"\\]|\\.)*\";
variable \@[^@\s,]+;

%%
// -----> Reglas Lexicas
","						{ return 'COMMA'}
"+"                     { return 'PLUS'}
"\-"                    { return 'LESS'}
"*"                     { return 'BY'}
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
{variable}				{ return 'VARIABLE_NAME'}
{date}					{ return 'DATE'}
{decimal}               { return 'DECIMAL'} 
{entero}                { return 'ENTERO'}
{cadena}				{ return 'CADENA'}

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}

// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################

// Codigo Typerscript

%{
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
	


%}



// -------> Precedencia

//%left 'MAS' 'MENOS'

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


expresion	
	: primitivo{
		$$ = $1
	}
	| aritmetica{
		$$ = $1
	}
;

aritmetica
	: primitivo PLUS primitivo{
		$$ = new Aritmertic($1, $2, $3, @1.first_line, @1.first_column)
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