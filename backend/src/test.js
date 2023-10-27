let tmp = `
CREATE PROCEDURE print_together
    @str1 VARCHAR,
    @str2 VARCHAR,
    @separator VARCHAR
AS
BEGIN
    print @str1 + @separator + @str2;
END;

CALL print_together("Hola","Adios", ", ");
CALL print_together("Cadena1","Cadena2", ", ");
`


  console.log(JSON.stringify(tmp))
