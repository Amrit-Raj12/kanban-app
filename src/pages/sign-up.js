import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUp = () => {
    const [token, setToken] = useState(
        (typeof window !== "undefined" && localStorage.getItem("token")) || []
    );
    const router = useRouter();

    useEffect(() => {
        if (token?.length > 0) {
            router.push("/");
        }
    }, [token, router]);

    return (
        <div className="login-container">
            <div className="center">
                <h1>Sign Up</h1>
                <form method="post">
                    <div className="txt_field">
                        <input type="text" required />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="email" required />
                        <span></span>
                        <label>Email</label>
                    </div>

                    <div className="txt_field">
                        <input type="password" required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="signup_link">
                        Already a member? <Link href="/sign-in"> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;