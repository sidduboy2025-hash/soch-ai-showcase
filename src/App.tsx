import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import ModelDetail from "./pages/ModelDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import UploadModel from "./pages/UploadModel";
import NotFound from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model/:slug" element={<ModelDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="/upload-model" element={<UploadModel />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
