import { useEffect, useState } from "react";
import axios from "axios";

const useAnimeLoad = (setAnimeList, animeTitle, offset, setOffset, genre, year, animeType, sortOrder) => {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)

    console.log("this the genre: ", genre);
    console.log("this the year: ", year);
    console.log("this the type: ", animeType);

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController();

        console.log("new filters detected!");

        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20&sort=${sortOrder}startDate&page[offset]=${offset}${
                    animeTitle ? "&filter[text]=" + animeTitle : ""
                }${genre && `&filter[categories]=${genre}`}${
                    year ? `&filter[seasonYear]=${year}` : ""
                }${animeType && `&filter[subtype]=${animeType}`}`,
                {
                    signal: controller.signal,
                }
            )
            .then((res) => {
                
                setAnimeList((prevList) => [...prevList, ...res.data.data]);
                setLoading(false);
                setCount(res.data.meta.count);
            })
            .catch((error) => {
                if (axios.isCancel(error)) return;
            });

        return () => controller.abort()
    }, [animeTitle, offset, genre, year, animeType, sortOrder]);

    useEffect(() => {
        setAnimeList([]);
        setOffset(0);
    }, [animeTitle, genre, year, animeType, sortOrder]);

    return {loading, count};
};

export default useAnimeLoad;
