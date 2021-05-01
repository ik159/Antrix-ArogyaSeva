
import './App.css';
import HomePage from './components/HomePage';
import {
  BrowserRouter,
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
import RegisterPage from './components/RegisterPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/profile" component={Profile}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        {/* <Route path="/login"component={Login}></Route> */}
        <Route path="/signup" component={SignUpPage}></Route>
        <Route path="/signin" component={SignInPage}></Route>
        <Route path="/login"component={LoginPage}></Route>
        <Route path ="/">
           <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
