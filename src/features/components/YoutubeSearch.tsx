import axios from "axios";

const YoutubeSearch: any = async (keyword: string) => {
  try {
    const config = {
      url: "https://www.googleapis.com/youtube/v3/search?",
      method: "GET",
      headers: {
        "Content-Type": "charset=utf-8",
      },
      params: {
        part: "snippet",
        q: keyword,
        maxResults: 50,
        key: process.env.NEXT_PUBLIC_APP_API_KEY,
      },
    };
    const res = await axios(config);
    return res;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default YoutubeSearch;
