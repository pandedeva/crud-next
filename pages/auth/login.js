import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(context) {
  await unauthPage(context);

  return {
    props: {},
  };
}

function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  // redirect menggunakan router, ini untuk client
  // useEffect(() => {
  //   async function getToken() {
  //     // ambil token
  //     const token = await Cookie.get("token");
  //     // kalau tokennya ada, pindahkan ke halaman posts
  //     if (token) return Router.push("/posts");
  //   }
  //   return () => {
  //     getToken();
  //   };
  // }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) {
      e.target.reset(); // mengkosongkan input ketika user menekan submit
      return setStatus(`Error ${loginReq.status}, your Email and Password not match!`);
    }

    const loginRes = await loginReq.json();

    setStatus("Login Success");

    // membuat cookie dari loginRes.token
    Cookie.set("token", loginRes.token);

    // pindah ke halaman posts
    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginHandler.bind(this)}>
        <input name="email" onChange={fieldHandler.bind(this)} type="text" placeholder="Email" />
        <input name="password" onChange={fieldHandler.bind(this)} type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <div>Status: {status}</div>
        <br />
        <div>
          Not registered yet? <Link href="/auth/register">Register Now!</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
