
const menuItems = [
  {
    label: "About",
    sectionNumber: 0,
  },
  {
    label: "Skills",
    sectionNumber: 1,
  },
  {
    label: "Work",
    sectionNumber: 2,
  },

  {
    label: "Certificates",
    sectionNumber: 3,
  },

  {
    label: "Contact",
    sectionNumber: 4,
  },
];


const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-teal-500 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10  rounded fixed top-0 right-0 bottom-0 bg-teal-500 xs:bg-teal-50 transition-all overflow-hidden flex flex-col ${
          menuOpened ? "w-80" : "w-0"
        }`}
      >
        <div className="flex-1 text-white flex items-start justify-center flex-col gap-5 p-8">
          {menuItems.map((item, index) => (
            <MenuButton
              key={index}
              label={item?.label}
              onClick={() => onSectionChange(item?.sectionNumber)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-teal-500 hover:underline transition-colors"
    >
      {label}
    </button>
  );
};

export default Menu;
