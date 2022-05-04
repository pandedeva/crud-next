import { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Nav from "../../../components/Nav";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authPage(context);

  const { id } = context.query;

  const postReq = await fetch(`http://localhost:3000/api/posts/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await postReq.json();

  return {
    // mengambil data dari server side, agar bisa dibawa ke client side
    props: {
      token,
      post: res.data,
    },
  };
}

function PostEdit(props) {
  // mengambil post dari return props
  const { post } = props;

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });

  const [status, setStatus] = useState("normal");

  const updateHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    // mengambil token dari return props
    const { token } = props;

    const update = await fetch(`/api/posts/update/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus(`error ${update.status}`);

    const res = await update.json();

    setStatus(alert("Post Berhasil diedit"));

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

      <h1>Update a Post</h1>
      <p>Post ID : {post.id}</p>

      <form onSubmit={updateHandler.bind(this)}>
        <input onChange={fieldHandler.bind(this)} type="text" placeholder="title" name="title" defaultValue={post.title} />
        <br />
        <textarea onChange={fieldHandler.bind(this)} name="content" placeholder="content" defaultValue={post.content}></textarea>
        <br />
        <button type="submit">Save Changes</button>
        <div>Status: {status}</div>
      </form>
    </>
  );
}

export default PostEdit;
