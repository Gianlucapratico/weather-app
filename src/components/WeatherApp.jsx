import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "8e51e6e419321bad4410c43d8a8ae983";

function useWeatherData() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + query + "&appid=" + API_KEY + "&units=metric"
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setError("Request error, you must enter a city! ");
        }
      } catch (error) {
        console.error(error);
        setError("Request error, please try later!");
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.query.value);
  };

  return { query, weather, error, handleSubmit };
}

function WeatherApp() {
  const { query, weather, error, handleSubmit } = useWeatherData();

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formQuery">
              <Form.Label className="mt-3 fs-1">Search for a city:</Form.Label>
              <Form.Control type="text" name="query" placeholder="es. London" />
            </Form.Group>
            <Button type="submit" className="mt-3">
              Get Weather
            </Button>
          </Form>
        </Col>
      </Row>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {weather && (
        <Row>
          <Col className="mt-5">
            <h3>{weather.name}:</h3>

            <table className="table mt-5">
              <tbody>
                <tr>
                  <td className=" fs-3">Description</td>
                  <td className="fs-3">
                    {weather.weather[0].description}
                    <img
                      className="ms-2"
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="fs-3">Temperature</td>
                  <td className="fs-4">
                    <strong>{Math.round(weather.main.temp)}°C</strong>
                  </td>
                </tr>
                <tr>
                  <td className="fs-3">Feels like</td>
                  <td className="fs-4">
                    <strong>{Math.round(weather.main.feels_like)}°C</strong>
                  </td>
                </tr>
                <tr>
                  <td className="fs-3">Humidity</td>
                  <td className="fs-4">
                    <strong>{weather.main.humidity}%</strong>
                  </td>
                </tr>
                <tr>
                  <td className="fs-3">Wind</td>
                  <td className="fs-4">
                    <strong>{weather.wind.speed}m/s</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default WeatherApp;
