
import './App.css';
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BedAvailability from './components/BedAvailability';
import MedicalSupplies from './components/MedicalSupplies';
import Donors from './components/Donors';
import Volunteering from './components/Volunteering';
import NavBar from './components/NavBar';
import Oxygen from './components/Oxygen';
import Feed from './components/Feed';
import Login from './components/Login';
function App() {
  return (
    <Router>
     <NavBar />
      <Switch >
        <Route path ="/bedAvailability">
           <BedAvailability />
        </Route>
        <Route path ="/medicalSupplies">
           <MedicalSupplies />
        </Route>
        <Route path ="/donors">
           <Donors />
        </Route>
        <Route path ="/volunteering">
           <Volunteering/>
        </Route>
        <Route path ="/oxygen">
           <Oxygen />
        </Route>
        <Route path ="/feed">
           <Feed />
        </Route>
        <Route path ="/">
           <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
