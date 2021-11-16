import './App.css';
import {observer} from "mobx-react-lite";
import Nav from "./Nav/Nav";

const App = observer(()=> {
  return (
      <div className="app">
        <Nav/>
      </div>
  )
})

export default App;
