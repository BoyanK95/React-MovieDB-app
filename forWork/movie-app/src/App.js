import React, { useEffect, useState } from "react";
import "./App.css";
import MovieBox from "./MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=089b617253e47ebe55e8aeef2a65814f";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=089b617253e47ebe55e8aeef2a65814f&query";
function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [foundMoviesAfterSearch, setAfterMoviesAfterSearch] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (searchedString) => {
    console.log("Searching");
    try {
      const url = searchedString.length
        ? `https://api.themoviedb.org/3/search/movie?api_key=089b617253e47ebe55e8aeef2a65814f&query=${searchedString}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=089b617253e47ebe55e8aeef2a65814f`;
        console.log(url)
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
      setAfterMoviesAfterSearch(false)
      if(searchedString && data) {
        setAfterMoviesAfterSearch(true);
      }
    } catch (e) {
      console.log(e);
      setAfterMoviesAfterSearch(false);
    }
  };

  const changeHandler = (e) => {
    console.log(e.target.value)
    setQuery(e.target.value);
    searchMovie(e.target.value)
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name=""
                value={query}
                onChange={changeHandler}
              ></FormControl>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox
                  key={movieReq.id}
                  {...movieReq}
                  foundMoviesAfterSearch={foundMoviesAfterSearch}
                />
              ))}
            </div>
          </div>
        ) : (
          <h2>Sorry! No Movies Found!!!</h2>
        )}
      </div>
    </>
  );
}

export default App;
