import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Nav from "../../components/Nav";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authPage(context);

  return {
    // mengambil data dari server side, agar bisa dibawa ke client side
    props: {
      token,
    },
  };
}

function PostCreate(props) {
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("normal");

  const createHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    // mengambil token dari return props
    const { token } = props;

    const create = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if (!create.ok) return setStatus(`error ${create.status}`);

    const res = await create.json();

    setStatus(alert("Post Berhasil dibuat"));

    // kalau sukses, redirect ke halaman posts
    Router.push("/posts");
  };

  const fieldHandler = async (e) => {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields, // mengambil semua isi dari fields saat ini, dan gabungkan dengan yg baru
      [name]: e.target.value,
    });
  };

  return (
    <>
      <Nav />

      <h1>Create a Post</h1>

      <form onSubmit={createHandler.bind(this)}>
        <input onChange={fieldHandler.bind(this)} type="text" placeholder="title" name="title" />
        <br />
        <textarea onChange={fieldHandler.bind(this)} name="content" placeholder="content"></textarea>
        <br />
        <button type="submit">Create Post</button>
        <div>Status: {status}</div>
      </form>
    </>
  );
}

export default PostCreate;
