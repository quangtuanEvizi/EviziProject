/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorage } from "../../utils/localStorage";
import { STORAGE_TOKEN } from "../../utils/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";
import useLogin from "exercise/Ex4_project/customHook/login/loginHook";
import Input from "exercise/Ex4_project/components/form/Input";
import * as Yup from "yup";
import "./Login.scss";
import { actionGetUser } from "exercise/Ex4_project/actions/loginAction";

export interface IFormInput {
  username: string;
  password: string;
}

const schema = Yup.object({
  username: Yup.string().required().email("Email invalid"),
  password: Yup.string().required(),
}).required();

export default function Login() {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login.user);
  const userLogined = useSelector(
    (state: any) => state.user.userInfor?.data?.data?.user
  );
  const isLoadding = useSelector((state: any) => state.login.isLoadding);
  const messageError = useSelector((state: any) => state.login.messageError);
  var cookies = new Cookies();
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      const token = user?.data?.data?.authenticate?.token;
      const userLoginId = user?.data?.data?.authenticate?.user?.id;
      if (token) {
        if (isChecked) {
          LocalStorage.set(STORAGE_TOKEN, token);
          localStorage.setItem("userId", userLoginId);
        } else {
          cookies.set(STORAGE_TOKEN, token);
          cookies.set("userId", userLoginId);
        }
      }
      history.push("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    async function checkLogin() {
      const token =
        (await cookies.get(STORAGE_TOKEN)) ||
        (await LocalStorage.get(STORAGE_TOKEN));
      const userId =
        (await LocalStorage.get("userId")) || (await cookies.get("userId"));
      if (token) {
        await dispatch(actionGetUser({ id: userId }));
      }
    }
    checkLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userLogined) {
      history.push("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogined]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="logo">
              <h2>Login to</h2>
              <img
                src="http://192.168.1.189:13030/1e6bc8243c036829e11d147abf3d077d.png"
                alt=""
              />
            </div>

            <div className="input-container">
              <div className="email-container">
                <Input
                  label="Email address *:"
                  name="username"
                  disable={false}
                  type=""
                  placeholder="Enter your email address here ..."
                  register={register("username", {
                    required: true,
                    maxLength: 50,
                  })}
                  error={errors?.username?.message}
                />
              </div>

              <div className="password-container">
                <Input
                  label="Password *:"
                  name="password"
                  disable={false}
                  type="password"
                  placeholder="Enter your password here ..."
                  register={register("password", {
                    required: true,
                    maxLength: 50,
                  })}
                  error={errors?.password?.message}
                />
              </div>

              <label htmlFor="remember">
                <input
                  type="checkbox"
                  name="remember"
                  id=""
                  onChange={() => setIsChecked(!isChecked)}
                />{" "}
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <div className="btn-container">
              <button type="submit" disabled={isLoadding}>
                Sign in
              </button>
            </div>

            {messageError?.length > 0 && (
              <>
                {messageError.map((error: any, i: number) => {
                  return <span className="error" key={i}>{error.message}</span>;
                })}
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
