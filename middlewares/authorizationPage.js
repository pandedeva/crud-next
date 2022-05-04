import cookies from "next-cookies";
// redirect menggunakan server

export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    // kalau user sudah login, redirect ke halaman post
    if (allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/posts",
        })
        .end();
    }
    // kalau user belum login, kasi unauthorized
    return resolve("unauthorized");
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    // kalau user belum login, redirect ke halaman login
    if (!allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();
    }
    // kalau user sudah login, kasi tokennya
    return resolve({
      token: allCookies.token,
    });
  });
}
