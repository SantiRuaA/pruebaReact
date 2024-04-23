import "./App.css";

import { Route, Routes } from "react-router-dom";
import Instructores from "./pages/Instructores";
import InstructoresForm from "./pages/InstructoresForm";
import NotFound from "./pages/NotFound";
import { InstructoresContextProvider } from "./context/InstructoresContext";

import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <InstructoresContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Instructores />} />
          <Route path="/nuevo" element={<InstructoresForm />} />
          <Route path="/editar/:id" element={<InstructoresForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </InstructoresContextProvider>
    </>
  );
}

export default App;
