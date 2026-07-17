import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import MemoryEditor from "./pages/MemoryEditor";
import MemoryViewer from "./pages/MemoryViewer";
import AIReflection from "./pages/AIReflection";
import MonthlyRecap from "./pages/MonthlyRecap";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AvatarCustomization from "./pages/AvatarCustomization";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/avatar-setup" element={<AvatarCustomization />} />

          {/* app shell — requires an active session */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/albums/:albumId" element={<AlbumDetails />} />
              <Route path="/memory/new" element={<MemoryEditor />} />
              <Route path="/memory/:memoryId" element={<MemoryViewer />} />
              <Route path="/ai-reflection" element={<AIReflection />} />
              <Route path="/monthly-recap" element={<MonthlyRecap />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
