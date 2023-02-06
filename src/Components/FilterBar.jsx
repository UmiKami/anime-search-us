import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const FilterBar = () => {
    const [genre, setGenre] = useState("")
    const [year, setYear] = useState(null);


    const genreOptions = [
        "Comedy",
        "Fantasy",
        "Romance",
        "Action",
        "Drama",
        "School Life",
        "Adventure",
        "Slice of Life",
        "Yaoi",
        "Science Fiction",
        "Shoujo Ai",
        "Ecchi",
        "Sports",
        "Historical",
        "Magic",
        "Mystery",
        "Japan",
        "Music",
        "Harem",
        "Thriller",
        "Earth",
        "Psychological",
        "Supernatural",
        "Kids",
        "Horror",
        "Present",
        "Shounen Ai",
        "Asia",
        "Shounen",
        "Seinen",
        "Martial Arts",
        "Mecha",
        "Super Power",
        "Demon",
        "Isekai",
        "Fantasy World",
        "Shoujo",
        "Violence",
        "Military",
        "Plot Continuity",
    ];

    const handleChange = () => {
    }

    return (
        <main className="mt-3 d-flex align-items-center justify-content-center">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={genre}
                    label="genre"
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <MenuItem defaultValue="" value="">
                        <em>None</em>
                    </MenuItem>
                    {genreOptions.map((genre, index) => (
                        <MenuItem key={index} value={genre}>
                            {genre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    views={["year"]}
                    minDate={moment("1923")}
                    maxDate={moment((new Date().getFullYear()+5).toString())}
                    label="Year"
                    value={year}
                    onChange={(newValue) => {
                        setYear(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                    )}
                />
            </LocalizationProvider>
        </main>
    );
};

export default FilterBar;
