import { Box, Button, CircularProgress, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { child, onValue, push, ref, remove, set } from "firebase/database";
import { database } from "../config/firebase_config";
import { loading } from "../store/Slice";

export default function OS() {
  const [firebase, setFirebase] = useState(null);
  const [data, setData] = useState("");
  const [obj, setObj] = useState([]);
  const theme_Toggler = useSelector((state) => state.todo.theme);
//   console.log(theme_Toggler)
  const loader = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  localStorage.setItem("light", theme_Toggler);
  const getItems = localStorage.getItem("light");
  const theme_Toggle = () => {
    dispatch(theme_toggle_dynamic(getItems));
  };
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
  return (
    <div >
        <div className="w-[30%]"></div>
      <div>
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
      </div>
    </div>
  );
}
