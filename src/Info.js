import { useEffect, useState } from "react";

const Info = ({ name, data }) => {
  const [homeworld, setHomeworld] = useState("");
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    if (data.results && data.results.length > 0) {
      const character = data.results[0];

      // Fetch homeworld
      if (character.homeworld) {
        fetch(character.homeworld)
          .then((res) => res.json())
          .then((homeworldData) => setHomeworld(homeworldData.name))
          .catch((error) => console.error("Error fetching homeworld:", error));
      }
      if (character.species && character.species.length > 0) {
        Promise.all(
          character.species.map((speciesUrl) =>
            fetch(speciesUrl).then((res) => res.json())
          )
        )
          .then((speciesData) =>
            setSpecies(speciesData.map((specie) => specie.name))
          )
          .catch((error) => console.error("Error fetching species:", error));
      } else {
        setSpecies(["Human"]);
      }

      // Fetch films
      if (character.films && character.films.length > 0) {
        Promise.all(
          character.films.map((filmUrl) =>
            fetch(filmUrl).then((res) => res.json())
          )
        )
          .then((filmsData) => setFilms(filmsData.map((film) => film.title)))
          .catch((error) => console.error("Error fetching films:", error));
      }

      // Fetch starships
      if (character.starships && character.starships.length > 0) {
        Promise.all(
          character.starships.map((starshipUrl) =>
            fetch(starshipUrl).then((res) => res.json())
          )
        )
          .then((starshipsData) =>
            setStarships(starshipsData.map((starship) => starship.name))
          )
          .catch((error) => console.error("Error fetching starships:", error));
      }
      if (character.vehicles && character.vehicles.length > 0) {
        Promise.all(
          character.vehicles.map((vehicleUrl) =>
            fetch(vehicleUrl).then((res) => res.json())
          )
        )
          .then((vehiclesData) =>
            setVehicles(vehiclesData.map((vehicle) => vehicle.name))
          )
          .catch((error) => console.error("Error fetching vehicles:", error));
      }
    }
  }, [data]);

  if (!name) {
    return (
      <h3>
        <p>Type a Star Wars character's name to begin search...</p>
      </h3>
    );
  }

  if (data.error) {
    return <p>Error: {data.error}</p>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <h3>
        <p>No characters found for "{name}".</p>
      </h3>
    );
  }

  const character = data.results[0];

  return (
    <div>
      <h2>
        Character Details:
        <p>
          <strong>Name:</strong> {character.name}
        </p>
        <p>
          <strong>Height:</strong> {character.height} cm
        </p>
        <p>
          <strong>Mass:</strong> {character.mass} kg
        </p>
        <p>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Species:</strong>{" "}
          {species.length > 0 ? species.join(", ") : "Loading..."}
        </p>
        <p>
          <strong>Eye Color:</strong> {character.eye_color}{" "}
        </p>
        <p>
          <strong>Hair Color:</strong> {character.hair_color}
        </p>
        <p>
          <strong>Homeworld:</strong> {homeworld || "Loading..."}
        </p>
        <p>
          <strong>Starships:</strong>{" "}
          {starships.length > 0 ? starships.join(", ") : "None"}
        </p>
        <p>
          <strong>Vehicles:</strong>{" "}
          {vehicles.length > 0 ? vehicles.join(", ") : "None"}
        </p>
        <p>
          <strong>Films:</strong> {films.length > 0 ? films.join(", ") : "None"}
        </p>
      </h2>
    </div>
  );
};

export default Info;
