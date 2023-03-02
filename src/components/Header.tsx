import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = auth;

  const handleNew = () => {
    navigate("/new");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        navigate("/auth", { replace: true });
      })
      .catch((error) => console.error(error.message));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="border-b px-3 py-4 font-manrope sticky top-0 w-full z-10 bg-darkmode text-gray-200 border-gray-700">
      <nav className="flex items-center w-full max-w-[900px] relative mx-auto">
        <Link to="/">
          <h1 className="text-xl tablet:text-2xl font-bold text-center">
            Notes App
          </h1>
        </Link>
        <section className="hidden tablet:block absolute right-[4rem] rounded-full">
          <button
            onClick={handleNew}
            className="py-[0.300rem] px-4 border border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
          >
            Create note
          </button>
        </section>
        <section className="absolute right-0 rounded-full">
          <Tooltip
            title={`${currentUser?.email ? currentUser.email : "Account"}`}
          >
            <button
              className="border p-1.5 border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
              onClick={handleClick}
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User account"}
                  className="w-[26px] h-[26px] rounded-full"
                />
              ) : (
                <UserIcon />
              )}
            </button>
          </Tooltip>
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
