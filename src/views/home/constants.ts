export interface NewsPayload {
    status: string;
    totalResults: number;
    articles: NewsArticle[]
}

export interface NewsArticle {
    "source": {
        "id": string | null,
        "name":string;
    },
    "author": string | null;
    "title":string;
    "description":string | null;
    "url": string;
    "urlToImage": string | null;
    "publishedAt": string;
    "content":string | null;
}

export function formatDate(dateString: string) {
    return   new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        // timeStyle: '',
        // timeZone: 'Australia/Sydney',
    }).format(Date.parse(dateString))
}
