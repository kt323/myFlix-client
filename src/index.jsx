import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import "./index.scss";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};


const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);


root.render(<MyFlixApplication />);
root.render(<App />);