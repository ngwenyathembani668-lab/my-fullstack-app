import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home_page/Home";
import ListingPage from "./pages/listing_page/ListingPage";
import ListingDetailsPage from "./pages/listing_page/ListingDetailsPage";
import BecomeAHost from "./pages/become_a_host/BecomeAHost";
import HostDashboard from "./pages/host_dashboard/HostDashboard";
import ViewListings from "./pages/host_dashboard/ViewListings";
import CreateListing from "./pages/host_dashboard/CreateListing";
import EditListing from "./pages/host_dashboard/EditListing";
import Reservations from "./pages/reservations/Reservations";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<ListingPage />} />
              <Route path="/listings/:id" element={<ListingDetailsPage />} />
              <Route path="/become-a-host" element={<BecomeAHost />} />
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute requireRole="host">
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/listings"
                element={
                  <ProtectedRoute requireRole="host">
                    <ViewListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/create-listing"
                element={
                  <ProtectedRoute requireRole="host">
                    <CreateListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/edit-listing/:id"
                element={
                  <ProtectedRoute requireRole="host">
                    <EditListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;