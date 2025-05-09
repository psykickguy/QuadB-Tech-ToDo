import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Checker from "./components/Checker";

function App() {
  return (
    <>
      <Provider store={store}>
        <Checker />
      </Provider>
    </>
  );
}

export default App;
