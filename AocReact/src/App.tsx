import { Outlet } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>AOC</title>
      </Helmet>
      <div className="bg-europe-wash text-europe-dark text-xl sm:sticky top-0 z-10">
        <SiteHeader />
      </div>

      <div className="container p-2 h-full">
        <Outlet />
      </div>
    </>
  );
}

export default App;
