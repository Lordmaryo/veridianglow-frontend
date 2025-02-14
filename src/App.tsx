import { Route, Routes } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <QueryProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </QueryProvider>
    </>
  );
}

export default App;
