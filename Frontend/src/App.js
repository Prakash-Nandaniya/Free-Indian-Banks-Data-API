import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/Home/home";
import SubscriptionForm from "./pages/subscriptionForm/form";
import SearchApiKey from "./pages/serchAPIkey/form";

function App() {
  const [apiKey, setApiKey] = useState("");

  return (
    <Routes>
      <Route path="/" element={<HomePage apiKey={apiKey} />} />
      <Route path="/subscribe" element={<SubscriptionForm setApiKey={setApiKey} />} />
      <Route path="/search-apiKey" element={<SearchApiKey setApiKey={setApiKey}/>} />
    </Routes>
  );
}

export default App;
