let tmp = `
declare @nota2 int;
SET @nota2 = 99;

CASE @nota2
     WHEN 100 THEN "Sobresaliente"
     WHEN 99 THEN "Muy Bueno"
     WHEN 98 THEN "Bueno"
     ELSE "Aprobado"
END AS @mensaje;
`


  console.log(JSON.stringify(tmp))