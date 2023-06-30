import { useEffect, useReducer, useRef } from "react";

interface State {
  error: Error | null;
  data: any;
  loading: boolean;
}

type Action =
  | { type: "fetching" }
  | { type: "fetched"; payload: any }
  | { type: "error"; payload: any };

function useFetch(url: string): State {
  const cache = useRef<{ [key: string]: any }>({});
  const cancelRequest = useRef(false);
  const initialState: State = {
    error: null,
    data: null,
    loading: false,
  };

  const fetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "fetching":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload, loading: false };
      case "error":
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchUrl = async (): Promise<void> => {
      dispatch({ type: "fetching" });
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "ORIGIN",
          "Access-Control-Allow-Headers": "*",
          mode: "cors",
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        cache.current[url] = data;

        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error });
      }
    };

    fetchUrl();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
