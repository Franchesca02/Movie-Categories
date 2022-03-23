import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Home = () => {
  const [movie, setMovie] = useState({});
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("movie");

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInput(e.target.value);
    fetchData();
  };
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`https://www.omdbapi.com/?s=${input}&apikey=5bca094b`)
      .then((response) => {
        setMovie(response.data);
        setIsLoading(false);
        // console.log(response);
      })
      .catch((error) => {
        setIsLoading(false);
        return error;
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  console.log(movie);
  return (
    <div>
      <div className="w-full py-6 head">
        <div>
          <h2 className="text-white border-2 border-white header py-3">
            MyTestApp
          </h2>
        </div>
      </div>
      <div className="banner text-white">
        <h1 className="banner-text">Watch something incredible.</h1>
      </div>
      <div className="search lg={12} md={6} sm={3}">
        <label className="label">Search</label>
        <input
          className="border-2 border-black input"
          type="search"
          onChange={handleChange}
          onBlur={fetchData}
        />
      </div>
      <div>
        <p className="text py-4">Movie Category Name</p>

        <div className="flex flex-wrap justify-content-between movie-home">
          {movie === {}
            ? "LOADING"
            : movie &&
              movie.Search?.map((item) => (
                <div className="bg-black movies text-white mb-4">
                  <img
                    src={item.Poster}
                    alt="poster"
                    className="h-[80%] w-full object-cover"
                  />
                  <h2>{item.Title}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
