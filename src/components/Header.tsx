import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const navigate = useNavigate();

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
      <section className="flex items-center w-full max-w-[900px] relative mx-auto">
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
          <Tooltip title="Account">
            <button
              className="border p-1.5 border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
              onClick={handleClick}
            >
              <UserIcon />
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
              bgcolor: "whitesmoke",
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
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleSignOut();
            }}
            sx={{
              minWidth: "100px",
              maxWidth: "100px",
              minHeight: "25px",
              maxHeight: "25px",
              minPaddingY: "10px",
              maxPaddingY: "10px",
              ":hover": {
                backgroundColor: "gray",
                color: "white",
              },
              fontFamily: "manrope",
              fontWeight: "500",
            }}
          >
            Sign out
          </MenuItem>
        </Menu>
      </section>
    </header>
  );
};

export default Header;
