import { NavLink } from 'react-router-dom';
import './navigation.css'
export default function Navigation() {
    return (
        <nav className='navigation'>
            <NavLink exact='true' to='/mywords/level-one'>Ensimmäinen taso</NavLink>
            <NavLink exact='true' to='/mywords/level-two'>Toinen taso</NavLink>
            <NavLink exact='true' to='/mywords/level-three'>Kolmas taso</NavLink>
        </nav>
    );
}
