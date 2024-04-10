import useSWR from "swr";
import axios from "axios";
import debounce from "lodash.debounce";
import {ChangeEvent, useEffect, useRef } from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Navbar} from "../../components/navbar.tsx";
import {SearchNews} from "./search-news.tsx";
import {TopHeadlines} from "./top-headlines.tsx";

const APIKEY = "244b0138113540fe9c325c215323e51c";
const topHeadlinesURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`
const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function Home() {
    const { data: topHeadlines, isLoading } = useSWR(topHeadlinesURL, fetcher)
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: searchedNews, isLoading: isLoadingSearchedNews } = useSWR(
        searchParams.get("q") ? `https://newsapi.org/v2/everything?q=${searchParams.get("q")}&apiKey=${APIKEY}` : null,
        searchParams.get("q") ? fetcher: null,
        { revalidateOnFocus: false }
    );

    const debouncedSearch = useRef(
        debounce(async (searchQuery: string) => {
            setSearchParams({q: searchQuery})
        }, 500)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);


    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        debouncedSearch(e.target.value);
    }

    return (
        <>
            <Navbar>
                <h3>V.news</h3>
                <div className="nav-items">
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search news"
                            placeholder="Search news"
                            type="search"
                            name="q"
                            defaultValue={searchParams.get("q") ?? undefined}
                            onChange={handleChange}
                        />
                    </form>
                    <Link to={searchParams.get("q") ? "/bookmarks/?" + searchParams : "/bookmarks"}>
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
                    </Link>
                </div>
            </Navbar>

            <main>
                {searchParams.get("q") ?
                    <SearchNews news={searchedNews} isLoading={isLoadingSearchedNews}/> :
                    <TopHeadlines headlines={topHeadlines.articles} isLoading={isLoading} />
                }
            </main>
        </>
    )
}

