import { create } from 'zustand'
import {NewsArticle} from "../home/constants.ts";

type State = {
    articles: NewsArticle[]
}

type Actions = {
    bookmarkArticle: (article: NewsArticle) => void
}

export const useBookmarkStore = create<State & Actions>((set) => ({
    articles: [] as NewsArticle[],
    bookmarkArticle: (art) => set((state) => {
        const isArticleAlreadyBookmarked = state.articles.some((article) => article.title === art.title);
        if (isArticleAlreadyBookmarked) {
            alert("article removed from bookmark");
            return {articles: state.articles.filter((article) => article.title !== art.title)};
        } else {
            alert("article added to bookmark");
            return { articles: [...state.articles, art] }
        }
    }),
}))