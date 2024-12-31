import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import useAxiosInstance from "../Axios/AxiosInstance";
import axios from "axios";

export const ContextProvider = createContext();
export default function Provider({ children }) {
  const axiosInstance = useAxiosInstance();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forget, setForget] = useState();
  console.log(user);
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const profileUpdate = (updated) => {
    return updateProfile(auth.currentUser, updated);
  };
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);

  //     if (currentUser?.email) {
  //       const user = { email: currentUser?.email };
  //       axiosInstance
  //         .post("/jwt", user, { withCredentials: true })
  //         .then((res) => {
  //           console.log(res.data);
  //           setLoading(false);
  //         })
  //         .catch((error) => console.error(error));
  //     } else {
  //       axiosInstance
  //         .post("/logout", {}, { withCredentials: true })
  //         .then((res) => {
  //           console.log("logout", res.data);
  //           setLoading(false);
  //         });
  //       setUser(null);
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log("state captured", currentUser?.email);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axiosInstance
          .post("/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
      } else {
        axiosInstance
          .post(
            "/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const updateNewProfile = (updated) => {
    return updateProfile(auth.currentUser, updated)
      .then(() => {
        setUser({ ...auth.currentUser, ...updated });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const forgetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const informationPass = {
    signUp,
    setUser,
    user,
    loading,
    logOut,
    logIn,
    profileUpdate,
    updateNewProfile,
    forgetPass,
    forget,
    setForget,
    googleLogin,
  };
  return (
    <div>
      <ContextProvider.Provider value={informationPass}>
        {children}
      </ContextProvider.Provider>
    </div>
  );
}
