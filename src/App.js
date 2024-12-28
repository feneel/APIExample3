import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Grid from "@mui/material/Grid";
// or
// import { Grid } from "@mui/material";
import "./styles.css";
import { Grid2 } from "@mui/material";

export default function App() {
  const [data, setData] = useState([]);

  const [showGenres, setShowGenres] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      const url = searchTerm
        ? `https://api.tvmaze.com/search/shows?q=${searchTerm}`
        : `https://api.tvmaze.com/shows`;
      const showsData = await fetch(url);

      const showsDataJSON = await showsData.json();

      // console.log(showsData);

      // setData(showsDataJSON);

      if (searchTerm) {
        setData(showsDataJSON.map((item) => item.show));
        // setData(
        //   showsDataJSON.map((item) => (
        //     item.show

        // ))
      } else {
        setData(showsDataJSON);
      }
    };
    getData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  //Manual way of searching shows
  /** const filterShows =
  //   data &&
  //   data.filter((show) => {
  //     return show.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  **/

  // console.log(searchTerm);
  const toggleGenres = () => setShowGenres(!showGenres);

  return (
    <div className="App">
      {/* {console.log(data)} */}
      <h2>Shows TV Maze </h2>

      <>
        Search: <textarea onChange={handleSearch} value={searchTerm} />
      </>
      {data.length > 0 ? (
        <Grid2 container spacing={3}>
          {data.map((show) => (
            <Grid2 item xs={2} key={show.id}>
              <Card className="shows">
                <CardBody>
                  <div className="flex">
                    <h4>{show.name}</h4>
                    <img
                      src={show.image?.medium}
                      onClick={() => {
                        window.open(show.officialSite);
                      }}
                    />
                    <p>{show.language}</p>
                    <button onClick={toggleGenres}>
                      {" "}
                      {showGenres ? "Hide" : "Show"}{" "}
                    </button>
                    {showGenres && (
                      <div>
                        {show.genres && (
                          <div>
                            <ul>
                              {show.genres.map((genre) => (
                                <li>{genre}</li> // Display each genre
                              ))}
                            </ul>
                          </div>
                        )}{" "}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <h2>No shows Found </h2>
      )}
    </div>
  );
}
