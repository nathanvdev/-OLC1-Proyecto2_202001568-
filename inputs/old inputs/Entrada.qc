declare @prueba String,@prueba2 int;
declare @nombre String default 'hola';
declare @cosa boolean;
set @prueba2 = 15;
set @prueba = 'hola';
select @nombre;

create table prueba(
    cosa1 int,
    cosa2 int,
    cosa3 string
);

Alter Table prueba
rename to nuevoNombre;

DROP table prueba;

insert into nuevoNombre (columna1,columna2,columna3) values (1,2,'hola');

begin 
if 1=1 then
    select * from nuevoNombre;
else
    select * from nuevoNombre;
endif;
end;

DECLARE @nota INT;
SET @nota = 70;
CASE nota
WHEN nota > 85 THEN 'Excelente'
WHEN nota >= 61 AND nota <= 85 THEN 'Aprobado'
ELSE 'No Aprobado'
END;

WHILE @contador < 10
BEGIN
declare @contador int;
SET @contador = @contador+1;
END;

FOR contador IN 1..10
BEGIN
CAST(contador AS VARCHAR);
ENDLOOP;

CREATE FUNCTION CalcularAreaCirculo(@pi FLOAT, @radio FLOAT)
RETURNS FLOAT
BEGIN
DECLARE @area FLOAT;
-- Fórmula para calcular el área del círculo: π * radio^2
SET @area = @pi * @radio * @radio;
RETURN @area;
END;

CREATE PROCEDURE CalcularAreaCirculo
    @pi FLOAT, 
    @radio FLOAT
AS
BEGIN
DECLARE @area FLOAT;
-- Fórmula para calcular el área del círculo: π * radio^2
SET @area = @pi * @radio * @radio;
END;

-- Llamar a la función para calcular el área de un círculo con radio 5.
DECLARE @radioCirculo FLOAT = 5.0;
DECLARE @pi FLOAT = 3.14159265359;
DECLARE @areaCirculo FLOAT;
SET @areaCirculo = CalcularAreaCirculo(@pi, @radioCirculo);
PRINT 'El área del círculo con radio ' + CAST(@radioCirculo AS
VARCHAR)+ CAST(@areaCirculo AS VARCHAR);

SELECT LOWER('HOLA MUNDO');
SELECT UPPER('hola mundo');
SELECT ROUND(5.678, 2); -- Redondea a 2 decimales
SELECT LEN('Hola mundo'); --10
SELECT TRUNCATE(8.945, 1); -- Trunca a 1 decimal
SELECT TYPEOF(123); -- Devuelve el tipo INT