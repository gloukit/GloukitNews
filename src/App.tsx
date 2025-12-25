import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import { ThemeProvider } from './context/theme-provider'
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { CategoryList } from "./pages/category-list";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { SearchResults } from "./pages/search-results";
import { Toaster } from "./components/ui/sonner";
import TopHeadlines from "./pages/top-headlines-list";

function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:5*60*1000,
        gcTime:10*60*1000,
        retry:false,
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/topheadlines" element={<TopHeadlines/>}></Route>
                <Route path="/category/:category" element={<CategoryList/>}></Route>
                <Route path="/search" element={<SearchResults/>}></Route>
              </Routes>
              <Toaster/>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
