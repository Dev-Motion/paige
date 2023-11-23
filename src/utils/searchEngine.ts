interface Link {
  id: string;
  url: string;
  title: string;
}

type Links = {
  history: Link[];
  bookmarks: Link[];
  tabs: Link[];
};

function extractLink(
  d:
    | chrome.bookmarks.BookmarkTreeNode
    | chrome.history.HistoryItem
    | chrome.tabs.Tab,
): Link | undefined {
  if (d?.id && d?.title && d?.url) {
    return {
      id: typeof d.id === "number" ? d.id.toString() : d.id,
      title: d.title,
      url: d.url,
    };
  }
}
export const searchPrefixes = {
  history: "hist:",
  bookmarks: "bookmarks:",
  tabs: "tabs:",
};
export function getPrefix(
  query: string,
): { prefix: keyof typeof searchPrefixes; query: string } | undefined {
  query = query.trim();
  if (query.startsWith(searchPrefixes.history)) {
    return {
      prefix: "history",
      query: query.replace(searchPrefixes.history, ""),
    };
  }
  if (query.startsWith(searchPrefixes.bookmarks)) {
    return {
      prefix: "bookmarks",
      query: query.replace(searchPrefixes.bookmarks, ""),
    };
  }
  if (query.startsWith(searchPrefixes.tabs)) {
    return {
      prefix: "tabs",
      query: query.replace(searchPrefixes.tabs, ""),
    };
  }
}

// A function to get the unique links from an array of links
function getUniqueLinks(links: Link[]): Link[] {
  const titleSet = new Set<string>();
  links.forEach((link) => {
    titleSet.add(link.title);
  });
  return Array.from(titleSet)
    .map((title) => {
      return links.find((link) => link.title === title);
    })
    .filter(Boolean);
}
// A function to search the tabs for a given query
function searchTabs(query: string): Promise<Link[]> {
  return new Promise((resolve) =>
    chrome.tabs.query({ currentWindow: true }, (_tabs) => {
      const tabLinks: Link[] = _tabs
        .filter((t) => t.title?.toLowerCase().includes(query.toLowerCase()))
        .map(extractLink)
        .filter(Boolean);
      const uniqueTabs = getUniqueLinks(tabLinks);
      resolve(uniqueTabs);
    }),
  );
}

// A function to search the bookmarks for a given query
function searchBookmarks(query: string): Promise<Link[]> {
  return new Promise((resolve) =>
    chrome.bookmarks.search(query, (results) => {
      const bookmarks: Link[] = results.map(extractLink).filter(Boolean);
      const uniqueBookmarks = getUniqueLinks(bookmarks);
      resolve(uniqueBookmarks);
    }),
  );
}

// A function to search the history for a given query
function searchHistory(query: string): Promise<Link[]> {
  return new Promise((resolve) =>
    chrome.history.search({ text: query }, (results) => {
      const histRes: Link[] = results.map(extractLink).filter(Boolean);
      const uniqueHist = getUniqueLinks(histRes);
      resolve(uniqueHist);
    }),
  );
}

export async function searchEngine(query: string) {
  let links: Links = {
    history: [],
    bookmarks: [],
    tabs: [],
  };
  const prefix = getPrefix(query);
  if (prefix) {
    query = prefix.query;
  }
  const [history, bookmarks, tabs] = await Promise.all([
    searchHistory(query),
    searchBookmarks(query),
    searchTabs(query),
  ]);
  if (prefix?.prefix === "history") {
    links = { ...links, history };
    return links;
  }
  if (prefix?.prefix === "bookmarks") {
    links = { ...links, bookmarks };
    return links;
  }
  if (prefix?.prefix === "tabs") {
    links = { ...links, tabs };
    return links;
  }
  // If no prefix is given, search all sources
  links = { ...links, tabs };
  links = { ...links, bookmarks };
  links = { ...links, history };
  return links;
}
