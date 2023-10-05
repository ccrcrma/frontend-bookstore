import React, { useEffect, useState } from "react";

const GenreDropDown = ({ handleChange, value, disabled }) => {
  // Define the list of Genre options
  const genreOptions = [
    { id: 5, value: "Fiction" },
    { id: 6, value: "Fantasy" },
    { id: 7, value: "Philosophy" },
    { id: 8, value: "Horror" },
  ];

  // Initialize state to store the selected Genre
  const [selectedGenre, setSelectedGenre] = useState(value);
  useEffect(() => {
    setSelectedGenre(value);
  }, [value]);
  console.log(value);

  // Event handler to handle changes in the dropdown selection
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <div>
      <select
        disabled={disabled}
        value={Number(selectedGenre)}
        onChange={handleGenreChange}
        className="form-control"
      >
        <option value="">Select a Genre</option>
        {genreOptions.map((genre, index) => (
          <option key={genre.id} value={genre.id}>
            {genre.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropDown;
