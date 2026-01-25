import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import authFetch from "../utils/authFetch";
import { API_URL } from "../utils/config";
import { useAuth } from "./authContext";

interface watchListItem {
  _id: string;
  name: string;

  description: string;
  score?: number;
  image?: string;
}

interface watchListContextType {
  watchLists: watchListItem[];
  refetch: () => void;
  loading: boolean;
  setWatchLists: Dispatch<SetStateAction<watchListItem[]>>;
}

const watchlistContext = createContext<watchListContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist() {
  const context = useContext(watchlistContext);
  if (!context) {
    throw new Error(
      "watchist context cannot be used outside watchlist provider",
    );
  }
  return context;
}

export default function WatchlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [watchLists, setWatchLists] = useState<watchListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();


  async function getWatchLists() {
    try {
      setLoading(true);
      console.log("fetching...");
      const response = await authFetch(`${API_URL}/watchlists`);
      const data = await response.json();
      console.log("fetched...:", data.data);
      setWatchLists(data.data);
      console.log("state updated");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!currentUser) {
      setWatchLists([]);
      return;
    }
    getWatchLists();
  }, [currentUser]);

  const value: watchListContextType = {
    refetch: getWatchLists,
    watchLists,
    setWatchLists,
    loading,
  };
  return (
    <watchlistContext.Provider value={value}>
      {!loading && children}
    </watchlistContext.Provider>
  );
}
