/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import Logo from "../Assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { auth, googleProvider } from "./firebase";
import {
  signInWithPopup,
} from "firebase/auth";
import { EmailContext } from './EmailContext';

const Navbar = () => {
  const { email, setEmail } = useContext(EmailContext);
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    }
  ];
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setEmail(result.user.email);
    } catch (err) {
      setEmail("");
      console.error(err);
    }
  };
    // Estilos personalizados para la modal
    const customStyles = {
      content: {
        width: '400px', // Define el ancho deseado de la modal
        height: '400px', // Define la altura deseada de la modal
        margin: 'auto', // Centra la modal horizontalmente
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#fff',
      },
    };
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a href="/">Inicio</a>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
