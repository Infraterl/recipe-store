import './Navbar.css'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';

export default function Navbar() {
  return (
  <div className="navbar">
      <nav>
          <Link to="/" className="logo">
            <h1>Food Repo</h1>
          </Link>
          <Searchbar/>
          <Link to="/create">Create Recipe</Link>
      </nav>
  </div>
  );
}
