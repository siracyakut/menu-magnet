import ReactDOM from "react-dom/client";
import "~/assets/css/tailwind.css";
import { RouterProvider } from "react-router-dom";
import routes from "~/routes";
import { Provider } from "react-redux";
import store from "~/store";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_ID}>
        <RouterProvider router={routes} />
      </GoogleOAuthProvider>
    </Provider>
  </QueryClientProvider>,
);
