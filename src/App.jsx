import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import AddEmployee from "./components/AddEmployee";


function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployee />}/>
          <Route path="/update-employee/:id" element={ <AddEmployee />} />
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
