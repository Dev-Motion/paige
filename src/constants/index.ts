export { default as galleryTabs } from "./galleryTabs";
export { default as mixins } from "./mixins";
const imageQuality = "&w=2048&q=80&auto=format&dpr=2";
const tempImageQuality = "&w=1080&q=80&auto=format";
export { imageQuality, tempImageQuality };
export const cacheName = "paige-assets";

export const isRunningInExtension =
  window.chrome && chrome.runtime && chrome.runtime.id ? true : false;

export const defaultTodayPhoto = {
  id: "KX6ECaHP6wQ",
  created_at: "2017-10-08T18:15:05Z",
  updated_at: "2023-03-22T18:02:23Z",
  promoted_at: "2017-10-09T13:38:54Z",
  width: 5496,
  height: 3670,
  color: "#d9d9d9",
  blur_hash: "L@I5Y:NGWCax_NRjayaz%La#oefk",
  description: "Autumnal colors",
  alt_description: "brown and green trees overlooking fog covered mountains",
  urls: {
    raw: "https://images.unsplash.com/photo-1507486411790-179bbb6866ed?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI&ixlib=rb-4.0.3",
    full: "https://images.unsplash.com/photo-1507486411790-179bbb6866ed?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI&ixlib=rb-4.0.3&q=80",
    regular:
      "https://images.unsplash.com/photo-1507486411790-179bbb6866ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI&ixlib=rb-4.0.3&q=80&w=1080",
    small:
      "https://images.unsplash.com/photo-1507486411790-179bbb6866ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI&ixlib=rb-4.0.3&q=80&w=400",
    thumb:
      "https://images.unsplash.com/photo-1507486411790-179bbb6866ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI&ixlib=rb-4.0.3&q=80&w=200",
    small_s3:
      "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1507486411790-179bbb6866ed",
  },
  links: {
    self: "https://api.unsplash.com/photos/KX6ECaHP6wQ",
    html: "https://unsplash.com/photos/KX6ECaHP6wQ",
    download:
      "https://unsplash.com/photos/KX6ECaHP6wQ/download?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI",
    download_location:
      "https://api.unsplash.com/photos/KX6ECaHP6wQ/download?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUxMjI",
  },
  likes: 517,
  liked_by_user: false,
  current_user_collections: [],
  sponsorship: null,
  topic_submissions: {},
  user: {
    id: "XZDJrfKzdWY",
    updated_at: "2023-03-22T20:41:59Z",
    username: "eberhardgross",
    name: "eberhard 🖐 grossgasteiger",
    first_name: "eberhard 🖐",
    last_name: "grossgasteiger",
    twitter_username: null,
    portfolio_url: null,
    bio: "Photography is so incredibly complex, although seemingly simplistic.",
    location: "South Tyrol, Italy",
    links: {
      self: "https://api.unsplash.com/users/eberhardgross",
      html: "https://unsplash.com/@eberhardgross",
      photos: "https://api.unsplash.com/users/eberhardgross/photos",
      likes: "https://api.unsplash.com/users/eberhardgross/likes",
      portfolio: "https://api.unsplash.com/users/eberhardgross/portfolio",
      following: "https://api.unsplash.com/users/eberhardgross/following",
      followers: "https://api.unsplash.com/users/eberhardgross/followers",
    },
    profile_image: {
      small:
        "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
      medium:
        "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
      large:
        "https://images.unsplash.com/profile-1593541755358-41ff2a4e41efimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
    },
    instagram_username: "eberhard_grossgasteiger",
    total_collections: 6,
    total_likes: 4555,
    total_photos: 1864,
    accepted_tos: true,
    for_hire: false,
    social: {
      instagram_username: "eberhard_grossgasteiger",
      portfolio_url: null,
      twitter_username: null,
      paypal_email: null,
    },
  },
  exif: {
    make: "Canon",
    model: "Canon EOS 70D",
    name: "Canon, EOS 70D",
    exposure_time: "1/160",
    aperture: "8.0",
    focal_length: "50.0",
    iso: 200,
  },
  location: {
    name: "Zillertal Alps, Italy",
    city: null,
    country: "Italy",
    position: {
      latitude: 47.022447,
      longitude: 11.9016289,
    },
  },
  views: 2328454,
  downloads: 25086,
};
export const defaultNextPhoto = {
  id: "Gqc1jl2kd1U",
  created_at: "2017-10-25T11:31:47Z",
  updated_at: "2023-03-22T14:03:56Z",
  promoted_at: null,
  width: 5472,
  height: 3648,
  color: "#d9d9d9",
  blur_hash: "L*HLo4R+RQoJ_4WBWAjstSayoej[",
  description: null,
  alt_description: "green field plains under cloudy sky",
  urls: {
    raw: "https://images.unsplash.com/photo-1508930993032-fbbaf4f2821a?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg&ixlib=rb-4.0.3",
    full: "https://images.unsplash.com/photo-1508930993032-fbbaf4f2821a?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg&ixlib=rb-4.0.3&q=80",
    regular:
      "https://images.unsplash.com/photo-1508930993032-fbbaf4f2821a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg&ixlib=rb-4.0.3&q=80&w=1080",
    small:
      "https://images.unsplash.com/photo-1508930993032-fbbaf4f2821a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg&ixlib=rb-4.0.3&q=80&w=400",
    thumb:
      "https://images.unsplash.com/photo-1508930993032-fbbaf4f2821a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg&ixlib=rb-4.0.3&q=80&w=200",
    small_s3:
      "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1508930993032-fbbaf4f2821a",
  },
  links: {
    self: "https://api.unsplash.com/photos/Gqc1jl2kd1U",
    html: "https://unsplash.com/photos/Gqc1jl2kd1U",
    download:
      "https://unsplash.com/photos/Gqc1jl2kd1U/download?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg",
    download_location:
      "https://api.unsplash.com/photos/Gqc1jl2kd1U/download?ixid=MnwzNTYwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk1MjUyOTg",
  },
  likes: 237,
  liked_by_user: false,
  current_user_collections: [],
  sponsorship: null,
  topic_submissions: {},
  user: {
    id: "bIWk2ZkoOWk",
    updated_at: "2023-03-20T12:36:40Z",
    username: "freestocks",
    name: "freestocks",
    first_name: "freestocks",
    last_name: null,
    twitter_username: "FreestocksOrg",
    portfolio_url: "https://freestocks.org",
    bio: "Free stock photos",
    location: "Warsaw",
    links: {
      self: "https://api.unsplash.com/users/freestocks",
      html: "https://unsplash.com/@freestocks",
      photos: "https://api.unsplash.com/users/freestocks/photos",
      likes: "https://api.unsplash.com/users/freestocks/likes",
      portfolio: "https://api.unsplash.com/users/freestocks/portfolio",
      following: "https://api.unsplash.com/users/freestocks/following",
      followers: "https://api.unsplash.com/users/freestocks/followers",
    },
    profile_image: {
      small:
        "https://images.unsplash.com/profile-1454679174110-16b562c76747?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
      medium:
        "https://images.unsplash.com/profile-1454679174110-16b562c76747?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
      large:
        "https://images.unsplash.com/profile-1454679174110-16b562c76747?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
    },
    instagram_username: "freestocks",
    total_collections: 0,
    total_likes: 14,
    total_photos: 523,
    accepted_tos: true,
    for_hire: false,
    social: {
      instagram_username: "freestocks",
      portfolio_url: "https://freestocks.org",
      twitter_username: "FreestocksOrg",
      paypal_email: null,
    },
  },
  exif: {
    make: "Canon",
    model: "Canon EOS 6D",
    name: "Canon, EOS 6D",
    exposure_time: "1/400",
    aperture: "2.8",
    focal_length: "40.0",
    iso: 100,
  },
  location: {
    name: "Bieszczady Mountains, Poland",
    city: null,
    country: "Poland",
    position: {
      latitude: 49.3307995539198,
      longitude: 22.4061932864258,
    },
  },
  views: 1284376,
  downloads: 11733,
};
export const searchProviders = [
  {
    name: "Google",
    url: "https://www.google.com/search?q=",
    image: "/images/google.png",
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    image: "/images/duckduckgo.png",
  },
  {
    name: "Yahoo",
    url: "https://search.yahoo.com/search?p=",
    image: "/images/yahoo.png",
  },
  {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    image: "/images/bing.png",
  },
] as const;

export type SearchProviders = (typeof searchProviders)[number]["name"];
