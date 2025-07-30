import axios from 'axios';

const API_KEY = 'AIzaSyAXkv7urQ6Ob5TsRVd_FuL-ZxoRATvOb5Y';

async function auth(email, pass, action) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${API_KEY}`;

  try {
    const result = await axios.post(url, {
      email: email,
      password: pass,
      returnSecureToken: true,
    });

    return result.data.idToken;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || "Authentication failed.");
  }
}

export function validateUser(email, pass) {
  return auth(email, pass, "signInWithPassword");
}

export function createUser(email, pass) {
  return auth(email, pass, "signUp");
}
