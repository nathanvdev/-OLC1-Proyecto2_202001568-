const result = 10 + 34.2

console.log(result)

let tmp = `
CREATE TABLE Clientes5
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes4 (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes4 (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes4 (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);

DELETE FROM Clientes5
WHERE Nombre = "Zibas Cbas+";
`


  console.log(JSON.stringify(tmp))