import axios from "axios"
import { useEffect, useState } from "react"

const NothingFound = () => {
    const [animeMeme, setAnimeMeme] = useState(null)

    useEffect(()=>{
        axios.get("https://meme-api.com/gimme/animememes")
            .then(result => setAnimeMeme(result.data))
    },[])

    
  return (
      <div>
          <h1>No anime found 😔</h1>
          <h4>But hey!! Look at this awesome meme!</h4>
          {animeMeme && <img src={animeMeme.preview[animeMeme.preview.length - 1]} alt={animeMeme.title} />}
      </div>
  );
}

export default NothingFound