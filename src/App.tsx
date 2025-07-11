import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CustomPoster from "./pages/CustomPoster";
import NeonLed from "./pages/NeonLed";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";
import Orders from "./pages/Orders";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // @ts-ignore
    if (window.FinisherHeader) {
      // Create a container for the effect
      let header = document.getElementById("finisher-header");
      if (!header) {
        header = document.createElement("header");
        header.id = "finisher-header";
        document.body.prepend(header);
      }
      // @ts-ignore
      new window.FinisherHeader({
        "count": 100,
        "size": { "min": 2, "max": 8, "pulse": 0 },
        "speed": { "x": { "min": 0, "max": 0.4 }, "y": { "min": 0, "max": 0.6 } },
        "colors": {
          "background": "#040b10",
          "particles": ["#fbfcca", "#0d4c64", "#7acec9"]
        },
        "blending": "overlay",
        "opacity": { "center": 1, "edge": 0 },
        "skew": 0,
        "shapes": ["c"]
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="alankaar-theme">
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  {/* This header will be used for the background effect */}
                  <div id="finisher-header" style={{
                    position: "fixed",
                    top: 0, left: 0, width: "100vw", height: "100vh",
                    zIndex: -1,
                    pointerEvents: "none"
                  }} />
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>

                    {/* Public Routes */}
                    <Route path="/*" element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/custom-poster" element={<CustomPoster />} />
                            <Route path="/neon-led" element={<NeonLed />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/verify-email" element={<VerifyEmail />} />
                            <Route path="/order-success" element={<OrderSuccess />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                      </>
                    } />
                  </Routes>
                </div>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
