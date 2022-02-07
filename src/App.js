import Header from "./components/Header";
import { DataProvider } from "./components/CompoundData";
import CompoundLandingPage from "./components/CompoundLanding";
import IndividualCompound from "./components/IndividualCompound"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <DataProvider>
      <Router>
          <div className="App">
            <Header />  
            <Routes>
              <Route path="/" element={<CompoundLandingPage />}></Route>
              <Route path="/compound/:id" element={<IndividualCompound/>}></Route>
            </Routes>
          </div>
      </Router>
    </DataProvider>
  );
}

export default App;


