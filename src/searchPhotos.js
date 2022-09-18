import React, { useState} from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "uJ1Fj9LJkDK_wFdAAq88OgcgAfwjV99NEqz0q31OVnk",
});

export default function SearchPhotos() {
    const [currentState, updaterFunction] = useState("");
    const [pics, setPics] = useState([]);

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
            .photos(currentState, 3, 20)
            .then(toJson)
            .then((json) => {
                setPics(json.results)
            });
    };

  return (
    <>
        <form className="form" onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={currentState}
          onChange={(e) => updaterFunction(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {
          pics.map((pic) => 
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="100%"
                height="50%"
              ></img>
            </div>)
        }
      </div>
    </>
  );
}