import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function NavBar() {
  const items = [
    {
      label: 'Instructores',
      icon: 'pi pi-users',
      command: () => window.location.replace('/')
    },
    {
      label: 'Nuevo Instructor',
      icon: 'pi pi-plus',
      command: () => window.location.replace('/nuevo')
    }
  ];

  return (
    <div>
      <Menubar model={items}>
        <Link to="/">Instructores</Link>
        <Link to="/nuevo">Nuevo Instructor</Link>
      </Menubar>
    </div>
  );
}

export default NavBar;
