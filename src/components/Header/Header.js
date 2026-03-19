import { IconTasks, IconMoon, IconSun } from '../../Utils/Icons.js';
import './Header.scss';

const Header = ({ dark, onToggleDark }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <IconTasks size={17} />
        </div>

        <span className="header-title">
          Task<span className="header-title-accent">Flow</span>
        </span>
      </div>

      <button
        onClick={onToggleDark}
        title="Toggle dark mode"
        className="header-toggle-btn"
      >
        {dark ? <IconSun size={15} /> : <IconMoon size={15} />}
      </button>
    </header>
  );
};

export default Header;