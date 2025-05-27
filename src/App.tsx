import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CochesList } from './components/CochesList';
import { CocheForm } from './components/CocheForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/coches" element={<CochesList />} />
        <Route path="/coches/new" element={<CocheForm />} />
        <Route path="/coches/:id" element={<CocheForm />} />
        <Route path="/" element={<CochesList />} />
      </Routes>
    </Router>
  );
}

export default App;