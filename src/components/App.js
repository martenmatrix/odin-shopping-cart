import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Homepage from './Homepage';

function StickyHeader() {

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage shopPath='lol'/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
