import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { profileAction } from "../redux/profileSlice";
import { Eye, EyeOff } from "react-feather";

const SignUp = () => {

    const [user, setUser] = useState({
        name:"",
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
    }, [token, router]);;

    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await fetch(
            'https://kanban-server.up.railway.app/users',
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

        if (resp?.success) {
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
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp} method="post">
                    <div className="txt_field">
                        <input type="text" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                        <span></span>
                        <label>Email</label>
                    </div>

                    <div className="txt_field">
                        <div className="eye-icon-box">{show ? <Eye onClick={() => setShow(!show)}/> : <EyeOff onClick={() => setShow(!show)} />}</div>
                        <input type={show ? "text" : "password"} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Sign Up" />
                    <div className="signup_link">
                        Already a member? <Link href="/sign-in"> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;