import { Outlet, Route, Routes } from "react-router";
import GuestRoute from "./routes/guest-route";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ProtectedRoute from "./routes/protected-route";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout";
import ReportsPage from "./pages/reports-page";
import NotFoundPage from "./pages/not-found";
import HomePage from "./pages/home-page";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        }
      />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
