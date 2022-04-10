import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Edit from './Pages/Edit';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/edit/:empId" exact element={<Edit />} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
