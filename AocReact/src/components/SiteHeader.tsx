import { Link } from 'react-router-dom';
import NavLink from '@/components/NavLink';

export default function SiteHeader() {
  const menuItems = () => {
    return (
      <>
        <NavLink to="/day15">Day 15</NavLink>
      </>
    );
  };

  return (
    <header className="container relative py-4 px-2 flex items-start sm:items-center flex-row sm:flex-row">
      <Link to={'/'}>AOC 2024</Link>
      <div className="flex-grow"></div>
      <nav
        className={`flex -mr-20 pr-2 mr-0 pr-0 mt-2 flex-row items-center md:justify-end sm:justify-between gap-x-4 flex-wrap self-center w-3/4 ml-4`}>
        {menuItems()}
      </nav>
    </header>
  );
}
