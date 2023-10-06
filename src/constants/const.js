//FETCH FROM DB
export const GENREOPTIONS = [
  { id: 5, value: "Fiction" },
  { id: 6, value: "Fantasy" },
  { id: 7, value: "Philosophy" },
  { id: 8, value: "Horror" },
];

export const FILTEROPTIONS = GENREOPTIONS.map((genre) => ({
  label: genre.value,
  value: genre.id,
}));

export const GetLabelForGenre = (id) => {
  for (const genre of GENREOPTIONS) {
    if (genre.id == id) return genre.value;
  }
  return null;
};
