import {Link, useSearchParams} from "react-router-dom";
import {Navbar} from "../../components/navbar.tsx";
import {useBookmarkStore} from "./bookmarks.ts";
import {formatDate} from "../home/constants.ts";

export function BookmarkedNews() {
    const [searchParams] = useSearchParams();
    const articles = useBookmarkStore((state) => state.articles);
    const bookmarkArticle = useBookmarkStore((state) => state.bookmarkArticle);
    return (
        <div>
            <Navbar>
                <Link to={searchParams.get("q") ? "/?" + searchParams : "/"}>
                    V.news
                </Link>
                <div className="nav-items">
                    <p>
                        <span>Bookmarks</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                            </path>
                        </svg>
                    </p>
                </div>
            </Navbar>
            <main>

                <h4>Bookmarked news ({articles.length})</h4>
                <br/>
                <div className="searched-news-grid">
                    {articles.filter((headline) => headline.urlToImage).map((headline) => (
                        <article key={headline.title}>
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
            </main>
        </div>
    )
}

