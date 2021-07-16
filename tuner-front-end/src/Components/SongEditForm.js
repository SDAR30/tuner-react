import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL";

function SongEditForm() {
  let { id } = useParams();
  let history = useHistory();
  const API = apiURL();

  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  const updateSong = async (updatedSong) => {
    try {
      await axios.put(`${API}/songs/${id}`, updatedSong);
      history.push(`/songs/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  useEffect(() => {
    axios.get(`${API}/songs/${id}`).then(
      (response) => {console.log(response.data); setSong(response.data.payload)},
      (error) => history.push(`/not-found`)
      
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong(song, id);
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>

      <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={song.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Song"
          required
        />
        <label htmlFor="album">Album:</label>
        <input
          id="album"
          type="text"
          required
          value={song.album}
          placeholder="album"
          onChange={handleTextChange}
        />
        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          name="artist"
          value={song.artist}
          placeholder="artist"
          onChange={handleTextChange}
        />
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="date"
          name="time"
          value={song.time}
          placeholder="time"
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />

        <br />

        <input type="submit" />

      </form>
      <br></br>
      <Link to={`/songs`}>
        <button>Go back</button>
      </Link>
    </div>
  );
}

export default SongEditForm;
