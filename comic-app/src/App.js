import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComicsList from './ComicsList';
import ComicDetail from './ComicDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ComicsList />} exact />
          <Route path="/comic/:id" element={<ComicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
