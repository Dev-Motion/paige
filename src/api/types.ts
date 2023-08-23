export type Coordinates = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  id: string;
};

export interface GetQuoteResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
