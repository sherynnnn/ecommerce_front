import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Products from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import { toast } from "sonner";

function App() {
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAddNew />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
