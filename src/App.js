import './App.css';
import {observer} from "mobx-react-lite";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import {Route, Switch} from "react-router-dom";
import Home from "./Home/Home";

const App = observer(()=> {
  return (
      <div className="app">
          <Nav/>
          <Switch>
              <Route exact path="/" component={Home}/>
          </Switch>
          <Footer/>
      </div>
  )
})

export default App;
