import React, { useState, useEffect } from "react";
// import {Analizador} from "../interpreter/analizador"
// import {ParserParser} from "../interpreter/parser"
import Tabla from "../pages/Tabla";

// import {Err} from "../Entorno/Data/Errores";i
import axios from "axios";
function Home() {
  
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [tabCounter, setTabCounter] = useState(1);
  const [results, setResults] = useState([]);
 

  useEffect(() => {
    const data = localStorage.getItem("tabData");
    if (data) {
      setTabData(JSON.parse(data));
      setActiveTab(JSON.parse(data)[0]?.id || "tab-1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tabData", JSON.stringify(tabData));
  }, [tabData]);

  const AñadirPest = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        let newTabId = Math.floor(Math.random() * 10000) + 1;
        while (tabData.some((tab) => tab.id === `Pes-${newTabId}`)) {
          newTabId = Math.floor(Math.random() * 10000) + 1;
        }
        const newTab = {
          id: `tab-${newTabId}`,
          name: file.name,
          content,
          location: content, // Agregar el archivo al objeto newTab
        };

        setTabData([...tabData, newTab]);
        setActiveTab(newTab.id);
      };
      reader.readAsText(file);
    });
    fileInput.click();
  };

  const Añadirpestb = async () => {
    const tabName = prompt(
      "Escribe el nombre del archivo",
      `Pestaña ${tabCounter + 1}`
    );
    if (tabName) {
      // Agregar extensión al nombre del archivo
      const fileName = tabName.endsWith(".tw") ? tabName : `${tabName}.tw`;
      // Genera un ID único para la nueva pestaña
      let newTabId = Math.floor(Math.random() * 10000) + 1;
      while (tabData.some((tab) => tab.id === `tab-${newTabId}`)) {
        newTabId = Math.floor(Math.random() * 10000) + 1;
      }

      // Abre un diálogo para guardar el archivo
      const options = {
        suggestedName: fileName,
        types: [
          {
            description: "Text files",
            accept: {
              "text/plain": [".tw"],
            },
          },
        ],
      };
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      const writer = await writable.getWriter();
      await writer.write(new Blob([]));
      await writer.close();

      // Crea una nueva pestaña y añade el archivo a la pestaña
      const newTab = {
        id: `tab-${newTabId}`,
        name: tabName,
        content: "",
        file: await handle.getFile(),
        location: handle,
      };
      setTabData([...tabData, newTab]);
      setActiveTab(newTab.id);
      setTabCounter(tabCounter + 1);
    }
  };

  const handleDeleteTab = () => {
    const newTabData = tabData.filter((tab) => tab.id !== activeTab);
    setTabData(newTabData);
    setActiveTab(newTabData[0]?.id || "tab-1");
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleTextAreaChange = (event) => {
    setTabData((prevState) =>
      prevState.map((tab) => {
        if (tab.id === activeTab) {
          return { ...tab, content: event.target.value };
        }
        return tab;
      })
    );
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setTabData([]);
    setTabCounter(0);
  };

  const guardarArchivo = async () => {
    if (!window.showOpenFilePicker || !window.showSaveFilePicker) {
      console.log(
        "La API File System Access no es compatible con este navegador"
      );
      return;
    }

    const tab = tabData.find((tab) => tab.id === activeTab);

    try {
      // Obtener el contenido del área de texto de la pestaña activa
      const textarea = document.querySelector(`#area`);
      if (textarea) {
        const contenido = textarea.value;
        console.log(tab);

        // Solicitar persistencia de acceso a la ubicación del archivo de la pestaña activa
        await navigator.storage.persist();

        // Verificar si el archivo ya está asociado con la pestaña
        if (tab.name) {
          // Mostrar el diálogo de selección de archivo
          const archivoExistente = await window.showOpenFilePicker({
            types: [
              {
                description: "Archivos de texto",
                accept: {
                  "text/plain": [".tw"],
                },
              },
            ],
            excludeAcceptAllOption: true,
          });

          // Escribir el contenido en el archivo existente seleccionado por el usuario
          const writableStream = await archivoExistente[0].createWritable();
          await writableStream.write(contenido);
          await writableStream.close();

          console.log(`Archivo guardado en: ${archivoExistente[0].name}`);
        } else {
          console.error(
            "No se encontró el archivo asociado a la pestaña activa"
          );
        }
      } else {
        console.error(
          "No se pudo encontrar el elemento de texto en el área de texto de la pestaña activa"
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTextFromActiveTab = async () => {
  
    const area2 = document.getElementById("area2");
    area2.value = "";
    const activeTabData = tabData.find((tab) => tab.id === activeTab);
    // console.log(activeTabData.content);
    try {
      const responde = await axios.post("http://127.0.0.1:5000/analizar", {
        code_in: activeTabData.content
      })
      const data = await responde.data
      console.log(data);
      setResults(data.resultado);
      //mostrar datos en el area2 separados por un salto de linea
      area2.value = data.resultado

      let dotcode = ""
      // const lexErrors = responde.data.error_lexico 
      // //recorrer el arreglo de semantico
      // const semErrors = data.error_semantico
      // const sintErrors = data.error_sintactico
      // //send data.lista_variables
      // //recorrer el semErrors
      // const combinedErrors = lexErrors + "\n" 
    
      // area3.value = combinedErrors
      // area3.value += sintErrors + "\n"
      // window.listaVariables = []
      // window.listaErrores = []
      // window.listaErrores = data.lista_sintac
      // console.log(data.listaVariables)
      // window.listaVariables = data.lista_variables
      // //verificar si semError es diferente de null
      // if(semErrors != null){

      //   for (let i=0; i <=  semErrors.length; i++){
      //     console.log(semErrors[i].Message)
      //     area3.value += semErrors[i].Tipo +", "+semErrors[i].Message + ", Linea: " + semErrors[i].Line+ ", Columna: "+ semErrors[i].Column +"\n"
      //   }
     
      // }
    } catch
    (error) {
      console.log("error sendind data:", error);
    }
    //mostrar en consola el responde.data.results

    // let anala = new Analizador(activeTabData.content,"d");
    // anala.Analizar();

  };

  return (
    
    <div className="tab-container" id="ventana">
      <div className="tab-header">
        <div id="PESTAÑAS">
        
          {tabData.map((tab) => (
            <button
              id="pest"
              key={tab.id}
              className={`tab-button ${tab.id === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      {tabData.length > 0 && (
        <div id="panel-area">
          <div className="tab-content">
            <textarea
              id="area"
              className="tab-textarea"
              value={tabData.find((tab) => tab.id === activeTab)?.content || ""}
              onChange={handleTextAreaChange}
            />
          </div>
          <div className="tab-content">
            <textarea id="area2" className="tab-textarea" />
          </div>
        </div>
      )}

      <div id="botones">
        <button id="bo" className="tab-button add-tab" onClick={Añadirpestb}>
          Nueva Pestaña
        </button>
        <button id="bo" className="tab-button add-tab" onClick={AñadirPest}>
          Abrir Archivo
        </button>
        <button
          id="bo"
          className="tab-button delete-tab"
          onClick={handleDeleteTab}
        >
          Eliminar Pestaña
        </button>
        <button id="bo" className="tab-button" onClick={guardarArchivo}>
          Guardar
        </button>
        <button
          id="bo"
          className="tab-button delete-tab"
          onClick={handleClearStorage}
        >
          Clear
        </button>

        <button id="eje" type="button" onClick={getTextFromActiveTab}>
          <span className="eje__text">Ejecutar</span>
          <span className="eje__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 100 100"
            >
              <path
                d="M92.913,30.736c1.878-1.182,3.041-3.283,3.041-5.504 c0-0.907-0.186-1.789-0.553-2.624l-1.729-3.918c-1.039-2.355-3.373-3.877-5.946-3.877c-0.587,0-1.171,0.08-1.734,0.236 c0.108-0.474,0.163-0.96,0.163-1.441c0.002-2.667-1.667-5.104-4.151-6.064l-3.994-1.548c-0.752-0.292-1.543-0.439-2.349-0.439 c-2.344,0-4.504,1.261-5.656,3.296c-1.182-1.878-3.283-3.041-5.505-3.041c-0.908,0-1.791,0.186-2.622,0.553l-3.922,1.73 c-2.353,1.04-3.874,3.373-3.874,5.927c-0.002,0.59,0.077,1.178,0.235,1.752c-0.474-0.108-0.96-0.163-1.445-0.163 c-2.663,0-5.099,1.668-6.061,4.151l-1.547,3.992c-0.292,0.753-0.441,1.544-0.441,2.347c-0.002,2.347,1.26,4.509,3.296,5.661 c-1.878,1.182-3.041,3.283-3.041,5.504c0,0.91,0.186,1.792,0.553,2.624l1.73,3.921c0.211,0.477,0.487,0.909,0.795,1.312 c-1.173,0.129-2.307,0.559-3.249,1.279l-0.957,0.731c-0.25-0.108-0.503-0.213-0.757-0.313l-0.159-1.192 c-0.428-3.217-3.198-5.643-6.443-5.643h-5.095c-3.245,0-6.015,2.426-6.443,5.641l-0.159,1.194 c-0.254,0.101-0.506,0.205-0.757,0.313l-0.955-0.73c-1.127-0.863-2.53-1.338-3.95-1.338c-1.736,0-3.369,0.676-4.597,1.904l-3.6,3.6 c-1.229,1.228-1.907,2.861-1.907,4.599c0,1.42,0.475,2.823,1.337,3.949l0.731,0.957c-0.108,0.25-0.213,0.503-0.313,0.757 l-1.192,0.159C6.476,61.415,4.05,64.185,4.05,67.43v5.095c0,3.245,2.426,6.015,5.641,6.443l1.194,0.159 c0.101,0.254,0.205,0.506,0.313,0.757l-0.73,0.955c-0.863,1.127-1.338,2.53-1.338,3.95c0,1.738,0.677,3.372,1.904,4.596 l3.606,3.606c1.228,1.226,2.86,1.901,4.594,1.901c1.421,0,2.825-0.477,3.947-1.337l0.957-0.731c0.25,0.108,0.503,0.213,0.757,0.313 l0.159,1.192c0.428,3.217,3.198,5.643,6.443,5.643h5.095c3.245,0,6.015-2.426,6.443-5.641l0.159-1.194 c0.254-0.101,0.506-0.205,0.757-0.313l0.955,0.729c1.127,0.864,2.53,1.339,3.95,1.339c1.738,0,3.372-0.678,4.597-1.904l3.6-3.6 c1.229-1.228,1.907-2.861,1.907-4.599c0-1.42-0.475-2.823-1.337-3.949l-0.731-0.957c0.108-0.25,0.213-0.503,0.313-0.757 l1.192-0.159c3.217-0.428,5.643-3.198,5.643-6.443V67.43c0-3.245-2.426-6.015-5.641-6.443l-1.194-0.159 c-0.101-0.254-0.205-0.506-0.313-0.757l0.73-0.955c0.863-1.127,1.338-2.53,1.338-3.95c0-0.085-0.009-0.168-0.012-0.252 c0.028,0.011,0.053,0.028,0.081,0.039l3.996,1.55c0.752,0.291,1.542,0.439,2.348,0.439c2.346,0,4.505-1.262,5.656-3.296 c1.182,1.878,3.283,3.041,5.505,3.041c0.907,0,1.788-0.185,2.622-0.553l3.922-1.73c2.353-1.04,3.874-3.373,3.874-5.927 c0.002-0.59-0.077-1.179-0.235-1.752c0.474,0.108,0.96,0.163,1.445,0.163c0,0,0,0,0,0c2.665,0,5.101-1.67,6.06-4.151l1.547-3.991 c0.292-0.753,0.441-1.544,0.441-2.347C96.211,34.049,94.95,31.887,92.913,30.736z"
                opacity=".35"
              ></path>
              <path
                fill="#f2f2f2"
                d="M90.913,28.736c1.878-1.182,3.041-3.283,3.041-5.504c0-0.907-0.186-1.789-0.553-2.624l-1.729-3.918 c-1.039-2.355-3.373-3.877-5.946-3.877c-0.587,0-1.171,0.08-1.734,0.236c0.108-0.474,0.163-0.96,0.163-1.441 c0.002-2.667-1.667-5.104-4.151-6.064l-3.994-1.548c-0.752-0.292-1.543-0.439-2.349-0.439c-2.344,0-4.504,1.261-5.656,3.296 c-1.182-1.878-3.283-3.041-5.505-3.041c-0.908,0-1.791,0.186-2.622,0.553l-3.922,1.73c-2.353,1.04-3.874,3.373-3.874,5.927 c-0.002,0.59,0.077,1.178,0.235,1.752c-0.474-0.108-0.96-0.163-1.445-0.163c-2.663,0-5.099,1.668-6.061,4.151l-1.547,3.992 c-0.292,0.753-0.441,1.544-0.441,2.347c-0.002,2.347,1.26,4.509,3.296,5.661c-1.878,1.182-3.041,3.283-3.041,5.504 c0,0.91,0.186,1.792,0.553,2.624l1.73,3.921c0.211,0.477,0.487,0.909,0.795,1.312c-1.173,0.129-2.307,0.559-3.249,1.279 l-0.957,0.731c-0.25-0.108-0.503-0.213-0.757-0.313l-0.159-1.192c-0.428-3.217-3.198-5.643-6.443-5.643h-5.095 c-3.245,0-6.015,2.426-6.443,5.641l-0.159,1.194c-0.254,0.101-0.506,0.205-0.757,0.313l-0.955-0.73 c-1.127-0.863-2.53-1.338-3.95-1.338c-1.736,0-3.369,0.676-4.597,1.904l-3.6,3.6c-1.229,1.228-1.907,2.861-1.907,4.599 c0,1.42,0.475,2.823,1.337,3.949l0.731,0.957c-0.108,0.25-0.213,0.503-0.313,0.757l-1.192,0.159 C4.476,59.415,2.05,62.185,2.05,65.43v5.095c0,3.245,2.426,6.015,5.641,6.443l1.194,0.159c0.101,0.254,0.205,0.506,0.313,0.757 l-0.73,0.955c-0.863,1.127-1.338,2.53-1.338,3.95c0,1.738,0.677,3.372,1.904,4.596l3.606,3.606 c1.228,1.226,2.86,1.901,4.594,1.901c1.421,0,2.825-0.477,3.947-1.337l0.957-0.731c0.25,0.108,0.503,0.213,0.757,0.313 l0.159,1.192c0.428,3.217,3.198,5.643,6.443,5.643h5.095c3.245,0,6.015-2.426,6.443-5.641l0.159-1.194 c0.254-0.101,0.506-0.205,0.757-0.313l0.955,0.729c1.127,0.864,2.53,1.339,3.95,1.339c1.738,0,3.372-0.678,4.597-1.904l3.6-3.6 c1.229-1.228,1.907-2.861,1.907-4.599c0-1.42-0.475-2.823-1.337-3.949l-0.731-0.957c0.108-0.25,0.213-0.503,0.313-0.757 l1.192-0.159c3.217-0.428,5.643-3.198,5.643-6.443V65.43c0-3.245-2.426-6.015-5.641-6.443l-1.194-0.159 c-0.101-0.254-0.205-0.506-0.313-0.757l0.73-0.955c0.863-1.127,1.338-2.53,1.338-3.95c0-0.085-0.009-0.168-0.012-0.252 c0.028,0.011,0.053,0.028,0.081,0.039l3.996,1.55c0.752,0.291,1.542,0.439,2.348,0.439c2.346,0,4.505-1.262,5.656-3.296 c1.182,1.878,3.283,3.041,5.505,3.041c0.907,0,1.788-0.185,2.622-0.553l3.922-1.73c2.353-1.04,3.874-3.373,3.874-5.927 c0.002-0.59-0.077-1.179-0.235-1.752c0.474,0.108,0.96,0.163,1.445,0.163c0,0,0,0,0,0c2.665,0,5.101-1.67,6.06-4.151l1.547-3.991 c0.292-0.753,0.441-1.544,0.441-2.347C94.211,32.049,92.95,29.887,90.913,28.736z"
              ></path>
              <path
                fill="#70bfff"
                d="M83.702,32.189c0.416-2.137,0.384-4.376-0.15-6.574l3.902-2.383l-1.73-3.919l-4.39,1.277 c-1.264-1.876-2.896-3.409-4.755-4.542l1.075-4.444l-3.995-1.549l-2.202,4.007c-2.137-0.416-4.376-0.384-6.575,0.15L62.5,10.31 l-3.919,1.73l1.277,4.39c-1.876,1.264-3.409,2.896-4.542,4.755l-4.444-1.075l-1.548,3.995l4.007,2.202 c-0.416,2.137-0.383,4.376,0.15,6.575l-3.902,2.383l1.73,3.919l4.39-1.277c1.264,1.876,2.896,3.409,4.755,4.542l-1.075,4.444 l3.995,1.549l2.202-4.007c2.137,0.416,4.376,0.383,6.575-0.15l2.383,3.902l3.919-1.73l-1.277-4.39 c1.876-1.264,3.409-2.896,4.543-4.755l4.444,1.075l1.548-3.995L83.702,32.189z M71.4,35.782c-3.609,1.592-7.825-0.042-9.418-3.651 c-1.593-3.609,0.042-7.825,3.651-9.418c3.609-1.593,7.825,0.042,9.418,3.651C76.643,29.973,75.008,34.19,71.4,35.782z"
              ></path>
              <path
                fill="#9aa2e6"
                d="M55.539,70.525V65.43l-5.39-0.719c-0.475-2.649-1.515-5.1-2.993-7.226l3.303-4.32l-3.603-3.603 l-4.32,3.303c-2.125-1.479-4.577-2.518-7.226-2.993l-0.719-5.39h-5.095l-0.719,5.39c-2.649,0.475-5.1,1.515-7.226,2.993 l-4.32-3.303l-3.603,3.603l3.303,4.32c-1.479,2.125-2.518,4.577-2.993,7.226l-5.39,0.719v5.095l5.39,0.719 c0.475,2.649,1.515,5.1,2.993,7.226l-3.303,4.32l3.603,3.603l4.32-3.303c2.125,1.479,4.577,2.518,7.226,2.993l0.719,5.39h5.095 l0.719-5.39c2.649-0.475,5.1-1.515,7.226-2.993l4.32,3.303l3.603-3.603l-3.303-4.32c1.479-2.125,2.518-4.577,2.993-7.226 L55.539,70.525z M32.045,76.472c-4.691,0-8.494-3.803-8.494-8.494s3.803-8.494,8.494-8.494s8.494,3.803,8.494,8.494 S36.736,76.472,32.045,76.472z"
              ></path>
              <path
                fill="none"
                stroke="#40396e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="3"
                d="M50.149,71.244c-0.475,2.649-1.515,5.1-2.993,7.226l3.303,4.32l-3.603,3.603l-4.32-3.303c-2.126,1.479-4.577,2.518-7.226,2.993 l-0.719,5.39h-5.095l-0.719-5.39c-2.649-0.475-5.1-1.514-7.226-2.993l-4.32,3.303l-3.603-3.603l3.303-4.32 c-1.479-2.126-2.518-4.577-2.993-7.226l-5.39-0.719V65.43l5.39-0.719c0.475-2.649,1.514-5.1,2.993-7.226l-3.303-4.32l3.603-3.603 l4.32,3.303c2.126-1.479,4.577-2.518,7.226-2.993l0.719-5.39h5.095l0.719,5.39c2.649,0.475,5.1,1.514,7.226,2.993l4.32-3.303 l3.603,3.603l-3.303,4.32c1.479,2.126,2.518,4.577,2.993,7.226l5.39,0.719v5.095L50.149,71.244z M50.149,71.244 c-0.475,2.649-1.515,5.1-2.993,7.226l3.303,4.32l-3.603,3.603l-4.32-3.303c-2.126,1.479-4.577,2.518-7.226,2.993l-0.719,5.39 h-5.095l-0.719-5.39c-2.649-0.475-5.1-1.514-7.226-2.993l-4.32,3.303l-3.603-3.603l3.303-4.32 c-1.479-2.126-2.518-4.577-2.993-7.226l-5.39-0.719V65.43l5.39-0.719c0.475-2.649,1.514-5.1,2.993-7.226l-3.303-4.32l3.603-3.603 l4.32,3.303c2.126-1.479,4.577-2.518,7.226-2.993l0.719-5.39h5.095l0.719,5.39c2.649,0.475,5.1,1.514,7.226,2.993l4.32-3.303 l3.603,3.603l-3.303,4.32c1.479,2.126,2.518,4.577,2.993,7.226l5.39,0.719v5.095L50.149,71.244z M32.045,59.483 c-4.691,0-8.494,3.803-8.494,8.494s3.803,8.494,8.494,8.494s8.494-3.803,8.494-8.494S36.736,59.483,32.045,59.483z M50.149,71.244 c-0.475,2.649-1.515,5.1-2.993,7.226l3.303,4.32l-3.603,3.603l-4.32-3.303c-2.126,1.479-4.577,2.518-7.226,2.993l-0.719,5.39 h-5.095l-0.719-5.39c-2.649-0.475-5.1-1.514-7.226-2.993l-4.32,3.303l-3.603-3.603l3.303-4.32 c-1.479-2.126-2.518-4.577-2.993-7.226l-5.39-0.719V65.43l5.39-0.719c0.475-2.649,1.514-5.1,2.993-7.226l-3.303-4.32l3.603-3.603 l4.32,3.303c2.126-1.479,4.577-2.518,7.226-2.993l0.719-5.39h5.095l0.719,5.39c2.649,0.475,5.1,1.514,7.226,2.993l4.32-3.303 l3.603,3.603l-3.303,4.32c1.479,2.126,2.518,4.577,2.993,7.226l5.39,0.719v5.095L50.149,71.244z M50.149,71.244 c-0.475,2.649-1.515,5.1-2.993,7.226l3.303,4.32l-3.603,3.603l-4.32-3.303c-2.126,1.479-4.577,2.518-7.226,2.993l-0.719,5.39 h-5.095l-0.719-5.39c-2.649-0.475-5.1-1.514-7.226-2.993l-4.32,3.303l-3.603-3.603l3.303-4.32 c-1.479-2.126-2.518-4.577-2.993-7.226l-5.39-0.719V65.43l5.39-0.719c0.475-2.649,1.514-5.1,2.993-7.226l-3.303-4.32l3.603-3.603 l4.32,3.303c2.126-1.479,4.577-2.518,7.226-2.993l0.719-5.39h5.095l0.719,5.39c2.649,0.475,5.1,1.514,7.226,2.993l4.32-3.303 l3.603,3.603l-3.303,4.32c1.479,2.126,2.518,4.577,2.993,7.226l5.39,0.719v5.095L50.149,71.244z M32.045,59.483 c-4.691,0-8.494,3.803-8.494,8.494s3.803,8.494,8.494,8.494s8.494-3.803,8.494-8.494S36.736,59.483,32.045,59.483z"
              ></path>
              <path
                fill="none"
                stroke="#40396e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="3"
                d="M83.552,25.615c0.534,2.199,0.566,4.438,0.15,6.575l4.007,2.202l-1.549,3.995l-4.444-1.075c-1.133,1.859-2.666,3.491-4.542,4.755 l1.277,4.39l-3.92,1.73l-2.383-3.902c-2.199,0.534-4.438,0.566-6.575,0.15l-2.202,4.007l-3.995-1.549l1.075-4.444 c-1.859-1.133-3.491-2.666-4.755-4.542l-4.39,1.277l-1.73-3.92l3.902-2.383c-0.534-2.199-0.566-4.438-0.15-6.575l-4.007-2.202 l1.549-3.995l4.444,1.075c1.133-1.859,2.666-3.491,4.542-4.755l-1.277-4.39l3.92-1.73l2.383,3.902 c2.199-0.534,4.438-0.566,6.575-0.15l2.202-4.007l3.995,1.549l-1.075,4.444c1.859,1.133,3.491,2.666,4.755,4.542l4.39-1.277 l1.73,3.92L83.552,25.615z M83.552,25.615c0.534,2.199,0.566,4.438,0.15,6.575l4.007,2.202l-1.549,3.995l-4.444-1.075 c-1.133,1.859-2.666,3.491-4.542,4.755l1.277,4.39l-3.92,1.73l-2.383-3.902c-2.199,0.534-4.438,0.566-6.575,0.15l-2.202,4.007 l-3.995-1.549l1.075-4.444c-1.859-1.133-3.491-2.666-4.755-4.542l-4.39,1.277l-1.73-3.92l3.902-2.383 c-0.534-2.199-0.566-4.438-0.15-6.575l-4.007-2.202l1.549-3.995l4.444,1.075c1.133-1.859,2.666-3.491,4.542-4.755l-1.277-4.39 l3.92-1.73l2.383,3.902c2.199-0.534,4.438-0.566,6.575-0.15l2.202-4.007l3.995,1.549l-1.075,4.444 c1.859,1.133,3.491,2.666,4.755,4.542l4.39-1.277l1.73,3.92L83.552,25.615z M65.633,22.714c-3.609,1.593-5.243,5.809-3.651,9.418 s5.809,5.243,9.418,3.651s5.243-5.809,3.651-9.418S69.241,21.121,65.633,22.714z M83.552,25.615 c0.534,2.199,0.566,4.438,0.15,6.575l4.007,2.202l-1.549,3.995l-4.444-1.075c-1.133,1.859-2.666,3.491-4.542,4.755l1.277,4.39 l-3.92,1.73l-2.383-3.902c-2.199,0.534-4.438,0.566-6.575,0.15l-2.202,4.007l-3.995-1.549l1.075-4.444 c-1.859-1.133-3.491-2.666-4.755-4.542l-4.39,1.277l-1.73-3.92l3.902-2.383c-0.534-2.199-0.566-4.438-0.15-6.575l-4.007-2.202 l1.549-3.995l4.444,1.075c1.133-1.859,2.666-3.491,4.542-4.755l-1.277-4.39l3.92-1.73l2.383,3.902 c2.199-0.534,4.438-0.566,6.575-0.15l2.202-4.007l3.995,1.549l-1.075,4.444c1.859,1.133,3.491,2.666,4.755,4.542l4.39-1.277 l1.73,3.92L83.552,25.615z M83.552,25.615c0.534,2.199,0.566,4.438,0.15,6.575l4.007,2.202l-1.549,3.995l-4.444-1.075 c-1.133,1.859-2.666,3.491-4.542,4.755l1.277,4.39l-3.92,1.73l-2.383-3.902c-2.199,0.534-4.438,0.566-6.575,0.15l-2.202,4.007 l-3.995-1.549l1.075-4.444c-1.859-1.133-3.491-2.666-4.755-4.542l-4.39,1.277l-1.73-3.92l3.902-2.383 c-0.534-2.199-0.566-4.438-0.15-6.575l-4.007-2.202l1.549-3.995l4.444,1.075c1.133-1.859,2.666-3.491,4.542-4.755l-1.277-4.39 l3.92-1.73l2.383,3.902c2.199-0.534,4.438-0.566,6.575-0.15l2.202-4.007l3.995,1.549l-1.075,4.444 c1.859,1.133,3.491,2.666,4.755,4.542l4.39-1.277l1.73,3.92L83.552,25.615z M65.633,22.714c-3.609,1.593-5.243,5.809-3.651,9.418 s5.809,5.243,9.418,3.651s5.243-5.809,3.651-9.418S69.241,21.121,65.633,22.714z"
              ></path>
            </svg>
          </span>
        </button>
    



      

      </div>
      <div className="tab-content">
        <textarea id="area3" className="tab-textarea" />
      </div>
    </div>
    
  );
}

export default Home;