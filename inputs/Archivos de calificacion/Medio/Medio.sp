// Archivo Calificacion P1 Nivel Medio

void main (){

    Console.Write("-----------------CALIFICACION ARCHIVO 2-----------------");
    /* operaciones 
    aritmeticas logicas y relacionales  
    */
    double a = 20 - 10 + 8 / 2 * 3 + 10 - 10 - 10 + 50;
    double b = 50 / 50 * 50 + 50 - 100 + 100 - 100;
    double c = 100 / 20 * 9 - 78 + 6 - 7 + 8 - 7 + 7 * 1 * 2 * 3 / 3;
    double d = 2 -20 / 5 * 2;
    Console.Write("a) " + a);
    Console.Write("b) " + b);
    Console.Write("c) " + c);
    Console.Write("d) " + d);

    // operaciones logicas
    bool logica1 = true && true || false && false || true;
    bool logica2 = true && true || false && false || true && false;
    bool logica3 = true && true || false && false || true && false && true;
    bool logica4 = true && true || false && false || true && false && true || false;

    Console.Write("a) " + logica1);
    Console.Write("b) " + logica2);
    Console.Write("c) " + logica3);

    // operaciones relacionales + IF
    int salida = 10;
    double n0 = salida + 0.0;
    if (n0 < 34.44) {
        
        if (salida > 44) {
            Console.Write("a) " + salida);

        }else if (salida < 44) {
            Console.Write("b) " + salida);
        }
    }

    if (salida != 1) {
        if (salida == 50) {
            Console.Write("veamos esa traduccion!");
          
        }
        
    }

    // switch 
    int precio;
    int valor = 1;
    switch(valor){
        case 1:
            precio = 55;
            if(10 > 5){
                Console.Write("a) " + precio);
             } else if (10 < 5){
                Console.Write("b) " + precio);
             }
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
        string titulobarra = ${ NewValor, "archivo1M.json", "titulo1"};
        string tituloxbarra = "nombres";
        double valor1 = ${ NewValor, "archivo2M.json", "var1"};
        double valor2 = ${ NewValor, "archivo2M.json", "var2"};
        double valor3 = ${ NewValor, "archivo2M.json", "var3"};
	}
	void GraFicaBarras(){
		string Titulo= titulobarra;
        string [] Ejex= { ${ NewValor, "archivo2M.json", "name1"} , "Pedro","Carlos","Maria"};
        double [] Valores= {5.0,valor2,valor3,8.0 };
        string TituloX= tituloxbarra;
        string TituloY= ${ NewValor, "archivo1M.json", "tituloybarra"};
	}
    void GraFicaPie(){

        string titulo = ${ NewValor, "archivo1M.json", "titulo2"};
        string [] Ejex= { ${ NewValor, "archivo1M.json", "v1"}, "reprobados"};
        double [] Valores= {valor1,30.0 };
    }

    // ----------------- Ciclos -----------------
    int i = 0;

    while (i < 10) { 
        
        if (i != 7 && i != 5) {
            Console.Write("el valor de i es: " + i);
        }
        i=i+1;
    }
    
    for (int e = 1; e <= 10; e++) {
        
        for (int j = 1; j <= 2 ; j++) {
            Console.Write("el valor de j es: " + j);
        }
        
    }
    int d = 1;
    do {
        Console.Write("el valor de d es: " + d);
        if(d == 3){
            Console.Write("el valor de d es: " + d);
        }else if(d == 4){
            Console.Write("el valor de d es: " + d);
        }
        d=d+1;
    } while(d < 5);
}