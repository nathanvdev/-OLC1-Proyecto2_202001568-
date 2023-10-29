// Archivo Calificacion P1 Nivel Facil

void main (){

    Console.Write("-----------------CALIFICACION ARCHIVO 1-----------------");
    /* operaciones 
    aritmeticas logicas y relacionales
    */
    double aritmetica1 = 2.0;
    double aritmetica2 = 10.0;
    double aritmetica3 = aritmetica2 * aritmetica1;
    double aritmetica4 = aritmetica3 / aritmetica1 + 50;
    int aritmetica5 = 2;
    int aritmetica6 = 10;
    int aritmetica7 = aritmetica6 * aritmetica5;
    int aritmetica8 = aritmetica7 / aritmetica5 + 50;
    Console.Write(aritmetica3);
    Console.Write(aritmetica4);

    bool logica1 = true;
    bool logica2 = false;
    bool logica3 = logica1 && logica2;
    bool logica4 = logica1 || logica2;
    bool logica5 = !logica1;
    bool logica6 = true || false && true;
    Console.Write(logica3);
    Console.Write(logica4);

    bool relacion1 = 1 < 2;
    bool relacion2 = 1 > 2;
    bool relacion3 = 1 <= 2;
    bool relacion4 = 1 >= 2;
    bool relacion5 = 1 == 2;
    bool relacion6 = 1 != 2;
    Console.Write(relacion1);
    Console.Write(relacion2);

	// ------------------ sentencias de control ------------------
    //IF.
    int var1 = 0;
    if (var1 != 0) {
        Console.Write("observemos el if traducido a python");
        Console.Write("lo hace bien");
    }

    //IF ELSEIF.
    if (var1 != 0) {
        Console.Write("observemos el if  traducido a python");
        Console.Write("lo hace bien");
    } else if (var1 == 0) {
        Console.Write("observemos el if else if iftraducido a python");
        Console.Write("lo hace bien");
    } else if ( var1 ==1){
        Console.Write("agreguemos otro else if");
        Console.Write("lo hace bien");
    } 

    // switch
    int precio;
    int valor = 1;
    switch(valor){
        case 1:
            precio = 55;
            break;
        case 2:
            precio = 25;
        case 3:
            precio = 40;
        default:
            Console.Write("No válido. Escoja 1, 2, o 3.");
    }

    //--------------- Funciones estadisticas --------------------
	void DefinirGlobales(){
        string titulobarra = ${ NewValor, "archivo1F.json", "titulo1"};
        string tituloxbarra = "valores";
        double valor1 = ${ NewValor, "archivo1F.json", "var1"};
        double valor2 = 9.8;
	}
	void GraficaBarras(){
		string Titulo= titulobarra;
        string [] Ejex= { "valor1", "valor2"};
        double [] Valores= {5.0,valor2 };
        string TituloX= tituloxbarra;
        string TituloY= "Puntaje";
	}
    void GraficaPIE(){

        string titulo = "reporte2";
        string [] Ejex= { "valor1", "valor2"};
        double [] Valores= {valor1,40.0 };
    }
    // ----------------- Ciclos -----------------
    int a = 1;

	while(a < 10){
		Console.Write("el valor de a es: " + a);
        a = a+1;
	}
    for (int b=0; b<10; b++){
        Console.Write("el valor de b es: " + b);
    }
    int c = 1;
    do {
        Console.Write("el valor de c es: " + c);
        c=c+1;
    } while(c < 5);
    

}

/* no deberia de fallar

este comentario :)

*/