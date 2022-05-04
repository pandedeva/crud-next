import { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  await unauthPage(context);

  return {
    props: {},
  };
}

function Register() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  const registerHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      // ubah header, dari string menjadi json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!registerReq.ok) return setStatus(`error ${registerReq.status}`);

    const registerRes = await registerReq.json();

    setStatus(alert("Akun Berhasil dibuat"));

    // kalau sukses, redirect ke halaman login
    Router.push("/auth/login");
  };

  const fieldHandler = (e) => {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields, // mengambil semua isi dari fields saat ini, dan gabungkan dengan yg baru
      [name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input name="email" onChange={fieldHandler.bind(this)} type="text" placeholder="Email" />
        <br />
        <input name="password" onChange={fieldHandler.bind(this)} type="password" placeholder="Password" />
        <br />
        <button type="submit">Register</button>
        <div>Register: {status}</div>
        <br />
        <div>
          Already have an account?
          <Link href="/auth/login"> Login</Link>
        </div>
      </form>
    </>
  );
}

export default Register;
