import { useEffect, useState } from "react";
import axios from "axios";

const useAnimeLoad = (setAnimeList, animeTitle, offset, setOffset) => {
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController();

        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}${
                    animeTitle ? ("&filter[text]=" + animeTitle) : ""
                }`, {
                    signal: controller.signal
                }
            )
            .then((res) => {
                
                // console.log("Anime list",res.data.data);
      
                setAnimeList(prevList => [...prevList, ...res.data.data]);
                setLoading(false)
                setCount(res.data.meta.count)
            })
            .catch((error) => {
                if(axios.isCancel(error)) return
            });

        return () => controller.abort()
    }, [animeTitle, offset]);

    useEffect(()=>{
        setAnimeList([])
        setOffset(0)
    },[animeTitle])

    return {loading, count};
};

export default useAnimeLoad;
