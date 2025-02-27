import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";
import SetsPage from "./pages/SetsPage";
import CardsPage from "./pages/CardsPage";
import CardDetailsPage from "./pages/CardDetailsPage";

function App() {
  return (
    <Provider store={store}>
      <Layout>
      <Router>
          <Routes>
            <Route path="/" element={<SetsPage />} />
            <Route path="/sets/:setId/cards" element={<CardsPage />} />
            <Route path="/cards/:cardId" element={<CardDetailsPage />} />
          </Routes>
      </Router>
      </Layout>
    </Provider>
  );
}

export default App;
