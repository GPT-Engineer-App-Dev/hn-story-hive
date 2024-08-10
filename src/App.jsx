import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import FavoritesPage from "./components/FavoritesPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;