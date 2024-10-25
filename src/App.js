import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './component/Dashboard/Dashboard';
import Principale from './component/Principale/Principale';
import 'react-toastify/dist/ReactToastify.css';




function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
function App() {

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
}
export default App;