const result = 10 + 34.2

console.log(result)

let tmp = `
CREATE TABLE Clientes
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);

SELECT * FROM Clientes;
SELECT Nombre, CorreoElectronico FROM Clientes;
SELECT * FROM Clientes WHERE Nombre = "Zibas Cbas+";`


  console.log(JSON.stringify(tmp))