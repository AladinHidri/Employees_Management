import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import View from "./pages/View";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddEdit />}></Route>
          <Route path="/update/:id" element={<AddEdit />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
