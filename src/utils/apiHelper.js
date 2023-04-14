import {
  API_BASE_URL,
  API_KEY,
  SEARCH_API,
  mostPopularVideosAPI,
} from "./constants";

// fetch the search results
export const getSearchResults = async (query) => {
  const results = await fetch(`${SEARCH_API}${query}&key=${API_KEY}`);
  const jsonResponse = await results.json();
  return jsonResponse;
};

// fetch most popular videos
export const getMostPopularVideos = async (pageToken) => {
  const results = await fetch(
    `${API_BASE_URL}${mostPopularVideosAPI}${API_KEY}&pageToken=${pageToken}`
  );
  const jsonResponse = await results.json();
  return jsonResponse;

};
