let tmp = `
--Comentario de una linea

SELECT LOWER("HOLA MUNDO");
SELECT UPPER("hola mundo");
SELECT ROUND(5.678, 2);
SELECT LEN("Hola mundo");
SELECT TRUNCATE(8.945, 1);
SELECT TYPEOF(123);

/* comentario
multi
linea 
ya salio )9782345-0(_)&*($%&%#*/
`


console.log(JSON.stringify(tmp))
