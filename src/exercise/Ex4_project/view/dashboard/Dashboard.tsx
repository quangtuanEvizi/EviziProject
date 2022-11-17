import { DashBoard } from "exercise/Ex4_project/styleComponent/dashBoard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionGetUser } from "../../actions/loginAction";
import ContentWrapper from "../../components/componentWrapper/ContentWrapper";
import Sidebar from "../../components/sidebar/Sidebar";
import { STORAGE_TOKEN } from "../../utils/constant";
import { LocalStorage } from "../../utils/localStorage";
import Cookies from "universal-cookie";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  var cookies = new Cookies();
  const userLogined = useSelector((state: any) => state.user.userInfor?.data?.data?.user);
  useEffect(() => {
    async function checkAuthenticaton() {
      const token = await cookies.get(STORAGE_TOKEN) ||  await LocalStorage.get(STORAGE_TOKEN)
      const userId = await LocalStorage.get('userId') || await cookies.get('userId')
      if (token) {
        dispatch(actionGetUser({id: userId}));
      } else {
        history.push("/login");
      }
    }
    checkAuthenticaton();
  }, []);
  return (
    <DashBoard>
      <Sidebar>
        <ContentWrapper />
      </Sidebar>
    </DashBoard>
  );
}
