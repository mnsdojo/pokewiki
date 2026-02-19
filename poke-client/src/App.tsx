import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import GuestRoute from "./routes/guest-route";
import ProtectedRoute from "./routes/protected-route";
import Layout from "./components/layout";

const LoginPage = lazy(() => import("./pages/login-page"));
const SignupPage = lazy(() => import("./pages/signup-page"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ReportsPage = lazy(() => import("./pages/reports-page"));
const NotFoundPage = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page"));

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
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
    </Suspense>
  );
}

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default App;
