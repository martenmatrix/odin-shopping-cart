import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Homepage from './Homepage';

function StickyHeader() {
  return (
    <></>
  )
}

function App() {
  return (
    <div className="main">
      <StickyHeader/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage shopPath='lol'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
