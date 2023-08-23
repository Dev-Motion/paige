import { createQuery } from "react-query-kit";
import { GetQuoteResponse } from "../types";
import { AxiosError } from "axios";
import { getQuotes } from "@api";

export const useQuotes = createQuery({
  primaryKey: "quote",
  queryFn: () => {
    // primaryKey equals to 'quote'
    return getQuotes();
  },
  initialData: {
    _id: "nYm8bumyc0E",
    author: "Babe Ruth",
    content: "You just can't beat the person who never gives up.",
    tags: ["Motivational"],
    authorSlug: "babe-ruth",
    length: 50,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  initialDataUpdatedAt: Date.now() + 1000 * 60 * 60 * 4,
  staleTime: 1000 * 60 * 60 * 4, // 4 hours
  suspense: true,
});
