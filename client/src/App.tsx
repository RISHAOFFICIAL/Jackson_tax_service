import { Switch, Route } from "wouter";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/resources" component={Resources} />
        <Route path="/login" component={Login} />
        <Route path="/student-portal" component={StudentPortal} />
        <Route path="/admin" component={AdminDashboard} />
        {/* 404 */}
        <Route>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-muted mb-8">Page not found</p>
              <a
                href="/"
                className="inline-block bg-gold text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gold-light transition"
              >
                Back to Home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}