import "./styles.css";
import { useEffect, useState } from "react";
import Title from "./Title";
import Info from "./Info";
import Entry from "./Entry";
import swbg from "./swbg.jpg";
import StarjediTTF from "./STJEDISE.TTF";
import swlogo from "./swlogo2.png";

export default function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const query = encodeURIComponent(name.toLowerCase());
    const url = `https://swapi.dev/api/people/?search=${query}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => setData(r))
      .catch((e) => setData(`${e}`));
  }, [name]);

  return (
    <div className="App" style={{ backgroundImage: `url(${swbg})` }}>
      <Title text="Star Wars Character Search" />
      <img style={{ width: "30vh", height: "30vh" }} src={swlogo} />
      <body>
        <Entry action={setName} />
        <Info name={name} data={data} />
      </body>
    </div>
  );
}
