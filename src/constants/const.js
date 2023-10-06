//FETCH FROM DB
export const GENREOPTIONS = [
  { id: 5, value: "Political" },
  { id: 6, value: "Economics" },
  { id: 7, value: "Literature" },
  { id: 8, value: "Philosophy" },
  { id: 9, value: "Fiction" },
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
