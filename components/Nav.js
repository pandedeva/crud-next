import Link from "next/link";
import Cookie from "js-cookie";
import Router from "next/router";

function Nav() {
  const deleteHandler = (e) => {
    e.preventDefault();

    Cookie.remove("token");

    Router.replace("/auth/login");
  };

  return (
    <>
      <Link href="/posts">Posts</Link>
      &nbsp; | &nbsp;
      <Link href="/posts/create">Create Post</Link>
      &nbsp; | &nbsp;
      <a href="#" onClick={deleteHandler.bind(this)}>
        Logout
      </a>
    </>
  );
}

export default Nav;
