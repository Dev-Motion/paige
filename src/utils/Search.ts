import type { SearchProviders } from "@constants";
import { searchProviders } from "@constants";
export default function search(query: string, searchProvider: SearchProviders) {
  window.open(
    searchProviders.find((provider) => provider.name === searchProvider)!.url +
      query,
    "_self"
  );
}
