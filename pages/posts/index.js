import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Nav from "../../components/Nav";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authPage(context);

  // mengambil data dari db di server
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await postReq.json();

  return {
    // mengambil data dari server side, agar bisa dibawa ke client side
    props: {
      token,
      posts: posts.data,
    },
  };
}

function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  const deleteHandler = async (id, e) => {
    e.preventDefault();

    const { token } = props;

    const ask = confirm("apakah berita ini ingin dihapus?");

    if (ask) {
      const deletePost = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await deletePost.json();

      console.log(res);

      const postFiltered = posts.filter((post) => {
        // kalau id yang didalam post bukan = id yang ingin dihapus, return dia
        // kalau id yang didalam post == id yg ingin dihapus, jangan masukan ke array
        return post.id !== id && post;
      });

      // data posts diubah menjadi data post yang sudah difilter
      setPosts(postFiltered);
      alert("Berita berhasil dihapus");
    }
  };

  const editHandler = (id) => {
    Router.push(`/posts/edit/${id}`);
  };

  return (
    <>
      <Nav />
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div>
              <button onClick={editHandler.bind(this, post.id)}>Edit</button>
              <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
            </div>

            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostIndex;
