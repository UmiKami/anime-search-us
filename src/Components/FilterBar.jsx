import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const FilterBar = ({applyFilters}) => {
    const [genre, setGenre] = useState("")
    const [year, setYear] = useState(null);
    const [type, setType] = useState("");

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

    const mediaTypes = ["TV", "Movie", "ONA", "OVA"]

    const clearFilters = () => {
        applyFilters("", "", "");
        setGenre("")
        setYear(null)
        setType("")
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
                    maxDate={moment((new Date().getFullYear() + 5).toString())}
                    label="Year"
                    value={year}
                    onChange={(newValue) => {
                        setYear(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={null}
                            sx={{ maxWidth: 120 }}
                        />
                    )}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem defaultValue="" value="">
                        <em>None</em>
                    </MenuItem>
                    {mediaTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={()=>applyFilters(genre, moment(year).year(), type)} variant="text" color="primary" sx={{height: 55, width: 120}}>
                Apply Filter
            </Button>
            <Button onClick={()=>clearFilters()} variant="outlined" color="error" sx={{height: 55, width: 120}}>
                Clear
            </Button>
        </main>
    );
};

export default FilterBar;
