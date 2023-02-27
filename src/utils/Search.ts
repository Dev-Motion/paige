const searchProviders = {
  google: "https://www.google.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  yahoo: "https://search.yahoo.com/search?p=",
  bing: "https://www.bing.com/search?q=",
};

export default function Search(
  query: string,
  searchProvider: keyof typeof searchProviders
) {
  window.open(searchProviders[searchProvider] + query, "_blank");
}
