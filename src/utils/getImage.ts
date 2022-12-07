import axios, { AxiosResponse } from "axios";

export interface ImageReturnType {
  query: string;
  result: {
    blur_hash: string;
    raw: string;
    description: string;
    img_url: string;
    user_name: string;
    user_link: string;
    color: string;
  }[];
}
interface unsplashReturnType {
  id: string;
  blur_hash: string;
  description: string;
  color: string;
  alt_description: string;
  links: {
    html: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  urls: {
    raw: string;
  };
  location: {
    name: string;
  };
}

export default async function getImage(req: {
  query: string;
  count?: number;
}): Promise<ImageReturnType> {
  const { query, count = 1 } = req;
  // let returnValue: {query?:string; blur_hash?: string; raw?: string; error?: string } = {};
  return axios
    .get<string, AxiosResponse<unsplashReturnType[]>>(
      "https://api.unsplash.com/photos/random",
      {
        params: {
          count,
          orientation: "landscape",
          query,
        },
        headers: {
          Authorization:
            "Client-ID KxpNPWHtw7i2ylXHm1MRNLLReT1rabDWHSfU61zpUfg",
        },
      }
    )
    .then((response) => ({
      query,
      result: response.data.map((d) => ({
        blur_hash: d.blur_hash,
        raw: d.urls.raw,
        description: d.description || d.alt_description || d.location.name,
        img_url: d.links.html,
        user_name: d.user.name,
        user_link: d.user.links.html,
        color: d.color,
      })),
    }))
    .catch();
}
