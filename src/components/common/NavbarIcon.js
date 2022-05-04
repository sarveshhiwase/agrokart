function NavbarIcon({ icon, text = 'tooltip', click = undefined }) {
  return (
    <div
      className="sidebar group"
      onClick={() => {
        if (click) click();
      }}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
export default NavbarIcon;
