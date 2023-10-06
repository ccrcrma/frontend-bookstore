import React from "react";
import { Controller } from "react-hook-form";
import { GENREOPTIONS } from "./constants/const";

const GenreDropDown = ({ disabled, control, formState }) => {
  return (
    <Controller
      name="genreId"
      control={control}
      rules={{ required: "Select a genre" }}
      render={({ field }) => (
        <div>
          <select {...field} disabled={disabled} className="form-control">
            <option value="">Select a Genre</option>
            {GENREOPTIONS.map((genre, index) => (
              <option key={genre.id} value={genre.id}>
                {genre.value}
              </option>
            ))}
          </select>
          {formState.errors.genreId && (
            <span className="error">{formState.errors.genreId.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default GenreDropDown;
