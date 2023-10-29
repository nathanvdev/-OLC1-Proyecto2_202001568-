let tmp = `
DECLARE @num DOUBLE DEFAULT 3.513789141;
DECLARE @string VARCHAR DEFAULT "\\Hola, mundo!\\ ";
PRINT "Número original: " + CAST(@num AS VARCHAR);
PRINT "String original: " + @string;
PRINT "Tamaño de string: " + CAST( LEN(@string) AS VARCHAR);
PRINT "String en minusculas: " + LOWER(@STRING);
PRINT "String en mayusculas: " + UPPER(@sTRing);
--PRINT "Redondear numero: " + CAST(ROUND(@num) AS VARCHAR);
PRINT "Tipo de dato después de redondear: " + TYPEOF(ROUND(@num));
PRINT "Redondear numero a 3 decimales: " + CAST(ROUND(@num, 3) AS VARCHAR);
--PRINT "Truncar número: "+CAST(TRUNCATE(@num) AS VARCHAR);
PRINT "Truncar número a 3 decimales: "+CAST(TRUNCATE(@num, 3) AS VARCHAR);

`


console.log(JSON.stringify(tmp))
