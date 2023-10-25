let tmp = `
DECLARE @SumaCuadrados INT DEFAULT 0;
DECLARE @id INT DEFAULT 1;

FOR @id IN 1..10
BEGIN
SET @SumaCuadrados = @SumaCuadrados + (@id * @id);
END;

PRINT "La suma de los cuadrados de los 10 primeros números es: " + CAST(@SumaCuadrados AS VARCHAR);
`


  console.log(JSON.stringify(tmp))