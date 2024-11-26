import React, { useState } from 'react';

function Card() {
    const [inputValue, setInputValue] = useState("");
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiKey = "";

    async function getData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        try {
            setLoading(true);


            const response = await fetch(url);
            if (!response.ok) throw new Error("City not found");
            const data = await response.json();
            console.log(data)
            let kelvinTemp = data.main.feels_like; 
            let farTep = ((9 / 5) * (kelvinTemp - 273) + 32).toFixed(2);
            setCards((prevCards) => [
                ...prevCards,
                {
                    city: cityName,
                    weather: data.weather[0].main,
                    description: data.weather[0].description,
                    temp: farTep,
                },
            ]);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            getData(inputValue);
            setInputValue("");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="userInput"
                    value={inputValue}
                    type="text"
                    placeholder="Enter City Name"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="submitButton" type="submit">
                    Submit
                </button>
            </form>

            {loading && <h1>Loading...</h1>}

            <div id="CardsContainer">
                {cards.length > 0 ? (
                    cards.reverse().map((card, index) => (
                        <div key={index} className="Card">
                            <h1>City: <br/>{card.city}</h1>
                            <h2>Tempature: <br/> {card.temp} °F</h2>
                            <h3>Weather: <br/>{card.weather} </h3>
                            <p>Description: <br/>{card.description}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No weather data available yet. Submit a city!</p>
                )}
            </div>
        </div>
    );
}

export default Card;
