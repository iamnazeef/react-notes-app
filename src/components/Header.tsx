import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "../assets/icons/LightModeIcon";
import { useDispatch } from "react-redux";
import { toggleDarkMode, toggleLightMode } from "../features/themeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DarkModeIcon from "../assets/icons/DarkModeIcon";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = auth;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  const handleNew = () => navigate("/new");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth", { replace: true });
      })
      .catch((error) => console.error(error.message));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = () => {
    if (isDarkMode === true) {
      dispatch(toggleLightMode());
    } else {
      dispatch(toggleDarkMode());
    }
  };

  return (
    <header
      className={`border-b px-2.5 h-14 flex align-middle sticky top-0 w-full z-10 border-gray-700 ${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-white text-gray-900"
      } transition-colors delay-[10] ease-linear`}
    >
      <nav className="w-full max-w-[900px] relative mx-auto flex items-center justify-between">
        <section>
          <Link to="/">
            <h1 className="text-xl tablet:text-2xl font-bold tracking-widest">
              Noteu
            </h1>
          </Link>
        </section>
        <section className="flex items-center gap-3">
          <section className="hidden tablet:flex align-middle">
            <button
              onClick={handleNew}
              className="py-1 px-4 bg-purple-700 rounded-md text-lg hover:bg-purple-600 font-semibold text-white"
            >
              Create
            </button>
          </section>
          <section className="flex align-middle">
            <button
              onClick={handleTheme}
              className={`rounded-full p-1.5 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } transition-colors delay-[10] ease-linear`}
            >
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
          </section>
          <section className="flex align-middle">
            <Tooltip
              title={`${currentUser?.email ? currentUser.email : "Account"}`}
            >
              <button
                className="rounded-full text-lg p-1"
                onClick={handleClick}
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "User account"}
                    className="w-[34px] h-[34px] rounded-full"
                  />
                ) : (
                  <UserIcon />
                )}
              </button>
            </Tooltip>
          </section>
        </section>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              mr: 1.5,
              color: "whitesmoke",
              bgcolor: "#333333",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#333333",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <section>
            <p className="py-1 px-4 text-base break-words font-manrope font-normal leading-5 tracking-wide">
              {currentUser?.displayName
                ? currentUser?.displayName
                : "User account"}{" "}
              <br /> <span className="text-xs">{currentUser?.email}</span>
            </p>
          </section>
          <section className="routes border-t border-gray-600 text-[0.950rem] font-manrope font-normal w-full py-1.5 px-4">
            <button
              className="hover:underline"
              onClick={() => {
                handleClose();
                navigate("/archive");
              }}
            >
              Archive
            </button>
          </section>
          <section className="routes border-t border-gray-600 text-[0.950rem] font-manrope font-normal w-full py-1.5 px-4">
            <button
              className="hover:underline"
              onClick={() => {
                handleClose();
                navigate("/trash");
              }}
            >
              Trash
            </button>
          </section>
          <section className="border-t border-gray-600 text-base font-manrope font-medium w-full py-1 hover:bg-[#444547]">
            <button
              className="w-full mx-auto"
              onClick={() => {
                handleClose();
                handleSignOut();
              }}
            >
              Sign out
            </button>
          </section>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
