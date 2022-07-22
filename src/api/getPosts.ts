export const getPosts = async (pageNumber: number) => {
    try {
        const res = await fetch(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
        );
        const data = await res.json();
        if (data.hits.length > 0) {
            return data.hits;
        } else {
            return false;
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error.messge);
    }
};
