import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = { to: string; onClick?: () => void };

export default function NavLink({
  to,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`hover:text-slate-400 ${
        location.pathname.startsWith(to)
          ? 'font-semibold underline underline-offset-4 decoration-2'
          : ''
      }`}
      onClick={onClick}>
      {children}
    </Link>
  );
}
