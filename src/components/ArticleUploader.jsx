import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalNotification from "./ModalNotification";

const ArticleUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newCasts, setNewCasts] = useState([]);
  const [uid, setUid] = useState(null);
  const [notification, setNotification] = useState('')
  const getNewcast = async () => {
    try {
      const response = await axios.get("http://localhost:8000/newcast");

      if (response.data.data) {
        setNewCasts(response.data.data);
      }
    } catch (error) {}
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile.type);

    if (
      selectedFile &&
      (selectedFile.type === "application/zip" ||
        selectedFile.type === "text/plain" ||
        selectedFile.type === "application/x-zip-compressed")
    ) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Por favor, selecciona un archivo .zip o .txt");
    }
  };

  const handleUpload = async () => {
    if (!file || !uid) {
      setMessage("Por favor, selecciona un archivo o un noticiero para subir.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload/" + uid,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setMessage("Archivo cargado exitosamente.");
        window.localStorage.setItem("data", JSON.stringify(response.data.data));
        window.localStorage.setItem("message", response.data.message);
        setNotification(response.data.message);
      } else {
        setMessage("Error al cargar el archivo. Intenta nuevamente.");
      }
    } catch (error) {
      setMessage("Ocurrió un error durante la carga del archivo.");
    } finally {
      setUploadProgress(0); // Resetear el progreso al finalizar
    }
  };

  useEffect(() => {
    getNewcast();
  }, []);

  return (
    <>
    <div className=" w-full p-6 bg-white shadow-md rounded-lg flex flex-col gap-10">
      <h2 className="text-xl font-bold mb-4 ">Cargar Artículos</h2>
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="newcast"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Selecciona un noticiero
        </label>

        <select
          id="newcast"
          onChange={(e) => {
            setUid(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        >
          <option value="" selected>
            Selecciona un noticiero
          </option>
          {newCasts.length === 0 ? (
            <option value="" selected>
              No existen noticieros
            </option>
          ) : (
            newCasts.map((newCast, index) => (
              <option key={index} value={newCast.uid}>
                {newCast.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <input
          type="file"
          accept=".zip,.txt"
          className="mb-2 w-full border p-2 rounded"
          onChange={handleFileChange}
        />
        {file && (
          <p className="text-gray-600 mb-2">
            Archivo seleccionado: {file.name}
          </p>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleUpload}
          disabled={!file}
        >
          Subir Artículos
        </button>
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
              className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}
        {message && (
          <div
            className={`mt-4 p-2 rounded ${
              message.includes("exitosamente")
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>

    </div>
      <ModalNotification notification={notification}/>

        </>
  );
};
export default ArticleUploader;
