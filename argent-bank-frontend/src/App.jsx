// Hooks React et Redux pour état global et effets de bord
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Composants de routing React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // Redirige programmatiquement vers une autre route
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Action qui signale que Redux a fini de lire le localStorage
import { setInitialized } from "./redux/authSlice";

function App() {
  // Récupère l'état d'auth depuis Redux (source de vérité unique)
  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Au montage du composant, on signale que Redux est initialisé
    // Évite une redirection prématurée vers /login au refresh
    dispatch(setInitialized());
  }, [dispatch]); // [] = s'exécute une seule fois au chargement

  // Bloque le rendu tant que Redux n'a pas lu le localStorage
  // Sans ça, isAuthenticated serait false pendant un court instant → redirect /login
  if (!isInitialized) return null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Route protégée : redirige vers /login si non authentifié */}
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
