import { useState } from "react"

export const WeatherApp = () => {

  const apiKey = "cbac31133b81c30bacff1cb03f92be12"
  const urlBase = `https://api.openweathermap.org/data/2.5/weather`
  const difKelvin = 273.15

  const [ciudad, setCiudad] = useState("")
  const [dataClima, setDataClima] = useState(null)
  const [error, setError] = useState(null)

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (ciudad.length > 0) {
      await fetchClima()
      setCiudad("")
  }
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
      const data = await response.json()

      if (data.cod && data.cod !== "404") {
        setDataClima(data);
        setError(null);
      } else {
        // Ciudad no encontrada
        setError("Ciudad no encontrada. Por favor, ingrese una ciudad válida.");
        setDataClima(null);
        setCiudad("")
      }
    } catch (error) {
      console.error('Ocurrió el siguiente problema: ', error);
      setError("Ocurrió un problema al obtener los datos climáticos. Intente de nuevo más tarde.");
      setDataClima(null);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}

      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
            <p>Condición meteorológica: {dataClima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}></img>
          </div>
        )
      }
    </div>
  )
}
