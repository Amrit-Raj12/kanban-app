import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { profileAction } from "../redux/profileSlice";
import { Eye, EyeOff } from "react-feather";

const SignIn = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    // const [token, setToken] = useState(
    //     (typeof window !== "undefined" && localStorage.getItem("token")) || []
    // );
    let token = Cookies.get('token')
    const router = useRouter();

    useEffect(() => {
        if (token?.length > 0) {
            router.push("/");
        }
    }, [token, router]);

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(
            'https://kanban-server.up.railway.app/users/login',
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        )
        const resp = await response.json()

        if (resp.success) {
              dispatch(profileAction.setProfile(resp))
            Cookies.set("token", resp?.token, {
                expires: 7,
                sameSite: "strict",
            })
            router.push("/")
        } else {
            toast.error(resp?.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <div className="login-container">
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={handleLogin} method="post">
                    <div className="txt_field">
                        <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                        <span></span>
                        <label>Email</label>
                    </div>

                    <div className="txt_field">
                        <div className="eye-icon-box">{show ? <Eye onClick={() => setShow(!show)}/> : <EyeOff onClick={() => setShow(!show)} />}</div>
                        <input type={show ? "text" : "password"} onChange={(e) => setUser({ ...user, password: e.target.value })} autoComplete="on" required />
                        <label>Password</label>
                    </div>
                    <div className="pass">Forgot password?</div>
                    <input type="submit" value="Login" />
                    <div className="signup_link">
                        Not a member ? <Link href="/sign-up"> Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;