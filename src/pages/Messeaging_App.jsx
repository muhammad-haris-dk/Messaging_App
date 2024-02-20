import React, { useEffect, useState } from "react";
import "../Index.css";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { blue, deepPurple } from "@mui/material/colors";
import { Avatar, Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import { loading, theme_toggle_dynamic, updateTodo } from "../store/Slice";
import Input from "../components/Input";
import { RiSendPlane2Fill } from "react-icons/ri";
import { database } from "../config/firebase_config";
import { child, onValue, push, ref, remove, set } from "firebase/database";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
const drawerWidth = 280;
const sidebar_obj = [
  {
    text: "Owais Raza",
    avatar: "OR",
    Link: "Dashboard/OS",
  },
  {
    text: "Muhammad Sami",
    avatar: "MS",
    Link: "Dashboard/MS",
  },
  {
    text: "Muhammad Hamza",
    avatar: "MH",
    Link: "Dashboard/MH",
  },
  {
    text: "Muhammad Fareed",
    avatar: "MF",
    Link: "Dashboard/MF",
  },
  {
    text: "Muhammad Furqan",
    avatar: "MF",
    Link: "Dashboard/MFU",
  },
  {
    text: "Muhammad Ishtiyaq",
    avatar: "MI",
    Link: "Dashboard/MI",
  },
  {
    text: "Muhammad Tanzil",
    avatar: "MT",
    Link: "Dashboard/MT",
  },
  {
    text: "Abdul Qadir",
    avatar: "AQ",
    Link: "Dashboard/AQ",
  },
  {
    text: "Hamid Raza",
    avatar: "HR",
    Link: "Dashboard/HR",
  },
  {
    text: "Ubaid Raza",
    avatar: "UR",
    Link: "Dashboard/UR",
  },
  {
    text: "Mohtashim Raza",
    avatar: "MR",
    Link: "Dashboard/MR",
  },
  {
    text: "Muhammad Azhar",
    avatar: "MA",
    Link: "Dashboard/MA",
  },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
export function Messeaging_App() {
  const [firebase, setFirebase] = useState(null);
  const [data, setData] = useState("");
  const [obj, setObj] = useState([]);
  const theme_Toggler = useSelector((state) => state.todo.theme);
  const loader = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  localStorage.setItem("light", theme_Toggler);
  const getItems = localStorage.getItem("light");
  const theme_Toggle = () => {
    dispatch(theme_toggle_dynamic(getItems));
  };
  //   console.log(theme_Toggler);
  const bg_Changer = theme_Toggler === "dark" ? "bg-slate-900" : "bg-white";
  const text_Changer =
    theme_Toggler === "dark" ? "text-white" : "text-slate-900";
  const shadowChanger =
    theme_Toggler === "dark"
      ? "shadow-md shadow-slate-800"
      : "shadow-md shadow-slate-400";
  const stylish_Scrollbar =
    theme_Toggler === "dark" ? "scroling_White" : "scroling";
  const border_Toggler =
    theme_Toggler === "dark"
      ? "border border-white"
      : "border border-slate-900";

  const hover =
    theme_Toggler === "dark"
      ? "hover:bg-white hover:text-black hover:border-black"
      : "hover:bg-black hover:text-white hover:border-white";
  useEffect(() => {
    const refrence = ref(database, "Owais/");
    onValue(refrence, (snapshot) => {
      const data = snapshot.val();

      const convert = Object.values(data);

      setObj(convert);
      dispatch(loading(false));

      //   console.log(obj)

      // console.log(data);
    });
  }, []);
  const onClickHandle = () => {
    const new_message_key = push(child(ref(database), "messages")).key;
    set(ref(database, `Owais/${new_message_key}`), {
      User_data: data,
      key: new_message_key,
    }).then((res) => {});
    setData("");
  };
  //   const upDate_Handle = () => {
  //     set(ref(database, `Owais/${data.key}`), {
  //       text: firebase,
  //     });
  //   };
  const handleUpdateToDoList = (key, User_data) => {
    set(ref(database, `Owais/${key}`), {
      User_data: User_data,
      key: key,
    });
    setData("");
    setFirebase(false);
    // update(ref(db, 'messages'), updates);
  };
  const deleteHandle = (key) => {
    remove(ref(database, `Owais/${key}`));
  };
  //   console.log(firebase);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          className={`${bg_Changer} ${text_Changer} ${shadowChanger}`}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6" noWrap component="div">
            Persnol Chatting Room
          </Typography>
          <FormGroup>
            <FormControlLabel
              onClick={theme_Toggle}
              control={<MaterialUISwitch defaultChecked />}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{ overflow: "auto" }}
          className={`${stylish_Scrollbar} ${bg_Changer} ${text_Changer}`}
        >
          <List>
            {sidebar_obj.map((items, key) => (
              <div key={key}>
                <Link to={items.Link}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ padding: "1rem" }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: blue[500] }}>
                          {items.avatar}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={items.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <div className="border border-slate-400 border-e-0 border-s-0 border-t-0"></div>
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        className={`${bg_Changer} h-[100dvh] flex justify-center items-end `}
        sx={{ flexGrow: 1 }}
      >
        <Toolbar />
        <div className={`w-full h-[88.5dvh] flex flex-col justify-end `}>
          <div className={`overflow-auto ${stylish_Scrollbar}  me-11`}>
            {loader.loading ? (
              <div className="flex justify-center items-center h-[88.5dvh]">
                <CircularProgress color="success" />
              </div>
            ) : (
              <div>
                {obj.length == null ? (
                  <div>
                    <h1>Entired Feild Is Empty</h1>
                  </div>
                ) : (
                  <div className="">
                    {obj.map((item, key) => (
                      <div
                        key={key}
                        className={`p-4 me-2 mb-2 rounded-md ${border_Toggler} ${text_Changer}`}
                      >
                        <div className="inline-block">{item.User_data}</div>
                        <div className=" inline-block float-end  justify-center items-center">
                          <button
                            className={` border border-slate-500 mx-1 px-4 py-1 rounded-md ${hover} duration-500`}
                            onClick={() => {
                              setFirebase(item);
                              setData(item.User_data);
                            }}
                          >
                            <TiPencil />
                          </button>
                          <button
                            onClick={() => deleteHandle(item.key)}
                            className={` border border-slate-500 mx-1 px-4 py-1 rounded-md duration-500 ${hover}`}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex">
            <div
              className={`w-[100%]  rounded-md me-11 flex ${border_Toggler}  ${text_Changer}`}
            >
              <div className="w-full">
                <Input
                  placeholder={
                    firebase ? "Update Message Here" : "Type a Message"
                  }
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className={`p-4 w-full  outline-none rounded-md ${bg_Changer} ${text_Changer}`}
                />
              </div>
              <div className=" flex ">
                <Button
                  onClick={() => {
                    firebase
                      ? handleUpdateToDoList(firebase.key, data)
                      : onClickHandle();
                  }}
                  color="inherit"
                >
                  {firebase ? <TiPencil /> : <RiSendPlane2Fill />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
