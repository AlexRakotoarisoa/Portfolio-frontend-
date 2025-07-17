import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './component/Portfolio/Portfolio';


function App() {


  return (
    <div className='Principale scrollbar-hide'>
    <Router>
        <Routes>
            <Route path="/" element={<Portfolio />} />
        </Routes>
    </Router>
    </div>
  );
}
export default App;
/***
 * 
 * 
 *
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

   const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('access_token');
  });


  return (
    <Router>
        <Routes>
          <Route exact path="/*" element={<Principale isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route 
           path="/dashboard/*" 
           element={
             <ProtectedRoute isAuthenticated={isAuthenticated}>
               <Dashboard />
             </ProtectedRoute>
           }/> 
        </Routes>
    </Router>
  );
 */