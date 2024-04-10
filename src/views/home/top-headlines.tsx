import {formatDate, NewsPayload} from "./constants.ts";
import {useBookmarkStore} from "../bookmarks/bookmarks.ts";



interface TopHeadlinesProps {
    headlines?: NewsPayload
    isLoading: boolean
}


export function TopHeadlines({headlines, isLoading}: TopHeadlinesProps) {
    const bookmarkArticle = useBookmarkStore((state) => state.bookmarkArticle);
    const randomTopHeadline = headlines ? Math.floor(
        Math.random() * headlines.articles.filter((headline) => headline.urlToImage).length
    ): 1;

    return (
        <div>
            <h4>Top Headlines ({headlines?.articles.length ?? 0})</h4>
            <br/>
            {isLoading && "is loading..."}
            {
                headlines &&
                <div className="top-headlines-grid">
                    {headlines.articles.filter((headline) => headline.urlToImage).map((headline, index) => (
                        <article key={headline.title} id={index === randomTopHeadline ? "hero-news" : ""}>
                            <img src={headline.urlToImage!} alt=""/>
                            <h4>{headline.title}</h4>
                            <p>{headline.description || headline.content}</p>
                            <div>
                                <svg
                                    onClick={() => bookmarkArticle(headline)}
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                    </path>
                                </svg>
                                <small>{formatDate(headline.publishedAt)}</small>
                            </div>
                        </article>
                    ))}
                </div>
            }
        </div>
    )
}

