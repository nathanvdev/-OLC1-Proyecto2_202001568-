// Archivo Calificacion P1 Nivel Medio

void main (){

    Console.Write("-----------------CALIFICACION ARCHIVO 3-----------------");

    /* operaciones 
    aritmeticas logicas y relacionales  
    */
    double a = 100 / 20 * 9 - 78 + 6 - 1 + 3 - 4 + 7 * 1 * 3 * 3 / 3 - 4;
    string art1 = "Hola " + "mundo";
    char c1 = 'c';
    char c2 = 'o';
    char c3 = 'm';
    char c4 = 'p';
    char c5 = 'i';
    char c6 = '1';
    string art2 = c1 + c2 + c3 + c4 + c5 + c6;

    Console.Write(art1);
    Console.Write(art2);
    Console.Write(a);

    // operaciones logicas + relacionales con if

    if (!!!!!!!!!!!!!!!!!!true) {
        console.Write("tu gramatica podra con este reto?");
    }
    if (true && true || false && false && false == true || !true) {
        console.Write("sale izi");
    }

    int n1 = 2 / 16;
    bool condicion1 = n1 != 2; //esto es falso
    bool condicion2 = 4 == n1; //falso
    bool condicion3 = !true; //falso
    bool condicion4 = true;
    if (!!!condicion1 || !condicion2 || !!!!condicion3) {
        console.Write("a ver si esto es de tu talla");
    } 

    // veamos que tal con mas anidaciones :)

    if(condicion1){
        if(condicion2){
            if(condicion3){
                if(condicion4){
                    console.Write("si logras hacer la traduccion bien eres un crack :)");
                }
            }
        }
    }
    //un switch mas potente con mas anidaciones a ver que tal tu gramatica

    int n2 = 2;
    // switch 
    int precio;
    int valor = 1;
    switch(valor){
        case 1:
            precio = 55;
            if(10 > 5){
                Console.Write("a) " + precio);
             } else if (10 < 5){
                if(10 > 5){
                    Console.Write("b) " + precio);
                 } else if (10 < 5){
                    Console.Write("c) " + precio);
                 }
             }
            break;
        case 2:
            precio = 25;
            if(10 > 5){
                Console.Write("a) " + precio);
             } else if (10 < 5){
                if(10 > 5){
                    Console.Write("b) " + precio);
                 } else if (10 < 5){
                    Console.Write("c) " + precio);
                 }
             }
        case 3:
            precio = 40;
            if(10 > 5){
                Console.Write("a) " + precio);
             } else if (10 < 5){
                if(10 > 5){
                    Console.Write("b) " + precio);
                 } else if (10 < 5){
                    Console.Write("c) " + precio);
                 }
             }
        default:
            Console.Write("No válido. Escoja 1, 2, o 3.");
    }

    
    //--------------- Funciones estadisticas --------------------
	void DefinirGlobales(){
        string titulobarra = ${ NewValor, "archivo1D.json", "titulo1"};
        double e1 = ${ NewValor,"archivo2D.json", "edad1"};
        double e2 = ${ NewValor,"archivo2D.json", "edad2"};
        double e3 = ${ NewValor,"archivo2D.json", "edad3"};
        double e4 = ${ NewValor,"archivo2D.json", "edad4"};
        double e5 = ${ NewValor,"archivo2D.json", "edad5"};
        string nm1 = ${ NewValor,"archivo1D.json", "name1"};
        string nm2 = ${ NewValor,"archivo1D.json", "name2"};
        string nm3 = ${ NewValor,"archivo1D.json", "name3"};
        string nm4 = "Maynor";
        string nm5 = "Maria";

	}
	void GraFicaBarras(){
		string Titulo= titulobarra;
        string [] Ejex= { nm1, nm2, nm3, nm4, nm5};
        double [] Valores= {e1, e2, e3, e4, e5 };
        string TituloY= ${ NewValor, "archivo1D.json", "tituloybarra"};
        string TituloX= tituloxbarra;
        
	}
    void GraFicaPie(){

        string titulo = ${ NewValor, "archivo3D.json", "titulo2"};
        string [] Ejex= { ${ NewValor, "archivo3D.json", "v1"}, ${ NewValor, "archivo3D.json", "v2"},${ NewValor, "archivo3D.json", "v3"}, "prob4"};
        double [] Valores= {10.5 ${ NewValor, "archivo3D.json", "p1"}, ${ NewValor, "archivo3D.json", "p2"}, 30.0, 18.8 };
    }
    // ----------------- Ciclos -----------------
    int i = 0;

    while (i < 10) { 
        
        if (i != 7 && i != 5) {
            Console.Write("el valor de i es: " + i);
            while (i < 10) { 
                Console.Write("veamos como se anida");
                i=i+1;
            }
        }
        i=i+1;
    }
    
    for (int e = 1; e <= 10; e++) {
        
        for (int j = 1; j <= 2 ; j++) {
            Console.Write("el valor de j es: " + j);
            for(int k = 1; k <= 3; k++){
                Console.Write("el valor de k es: " + k);
            }
        }
        
    }
    int d = 1;
    do {
        Console.Write("el valor de d es: " + d);
        if(d == 3){
            Console.Write("el valor de d es: " + d);
        }else if(d == 4){
            Console.Write("el valor de d es: " + d);
            int z;
            while(z < 10){
                Console.Write("el valor de z es: " + z);
            }
        }
        d=d+1;
    } while(d < 5);



}
/*
sale compi1 con 100 :)  
 no te rindas el camino es largo pero la recompensa es grande

*/