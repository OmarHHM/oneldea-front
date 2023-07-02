import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { EmailProvider } from '../src/Components/EmailContext';

function App() {
  return (
    <div className="App">
      <EmailProvider>
        <Home />
      </EmailProvider>
      <Footer />
    </div>
  );
}

export default App;
