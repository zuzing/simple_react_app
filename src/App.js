import Navbar from './Navbar.js';
import Homepage from './Homepage.js';
import BlogDetails from './BlogDetails.js';
import Create from './Create.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return(
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path='/create' element={<Create />}/>
                    <Route path = "/edit/:id" element={<Create />} />
                    <Route path = "/blogs/:id" element={<BlogDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
