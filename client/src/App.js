
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
import Register from './components/Register';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
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
        <Route path="/register" component={Register}></Route>
        <Route path="/login"component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path ="/">
           <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
