
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Standouts from "./pages/Standouts";
import RewindPage from "./pages/Rewind";

// Create placeholder pages for new routes
const Settings = () => (
  <div className="p-6 pt-16 pb-24 min-h-screen bg-dating-light">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Settings page content will go here.</p>
  </div>
);

const Hotspots = () => (
  <div className="p-6 pt-16 pb-24 min-h-screen bg-dating-light">
    <h1 className="text-2xl font-bold mb-4">Hotspots</h1>
    <p>Discover popular meeting places and events near you.</p>
  </div>
);

const Friends = () => (
  <div className="p-6 pt-16 pb-24 min-h-screen bg-dating-light">
    <h1 className="text-2xl font-bold mb-4">Friends</h1>
    <p>Connect with friends and see their activities.</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={null} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="standouts" element={<Standouts />} />
            <Route path="rewind" element={<RewindPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="hotspots" element={<Hotspots />} />
            <Route path="friends" element={<Friends />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
