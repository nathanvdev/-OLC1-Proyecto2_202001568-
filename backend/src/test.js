let tmp = `
declare @contador int;
set @contador = 0;

while @contador < 10;
begin
    break;
    SET @contador = @contador + 1;
end;

`


  console.log(JSON.stringify(tmp))