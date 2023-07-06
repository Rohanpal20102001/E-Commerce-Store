import logo from "./logo.svg";
import "./App.css";
import Cart from "./components/cart";
import Admin from "./components/admin";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}
export default App;
