// api key
export const API_KEY = process.env.REACT_APP_API_KEY;
export const LIVE_CHAT_COUNT = 250;

// api base url
export const API_BASE_URL = "https://youtube.googleapis.com/youtube/v3";

export const mostPopularVideosAPI = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&key=`;
export const SEARCH_SUGGESTIONS_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export const SEARCH_API = `${API_BASE_URL}/search?part=snippet&maxResults=15&q=`;
export const VIDEO_DETAILS_API = `${API_BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`;
export const CHANNEL_DETAILS_API = `${API_BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`;

export const PROFILE_PIC = "https://avatars.githubusercontent.com/u/7704934?v=4";