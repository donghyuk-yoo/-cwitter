import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  // firebase의 응답을 기다린후 로그인하기 위해 초기 state를 false로
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // firebase의 응답후 로그인
  useEffect(() =>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        // 로그인확인, useEffect()실행, user를 받아 저장(나중에 사용하기위함)
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {/* 초기화(firebase의 응답)가 완료전 문자열 출력, 
      완료후 router를 통해 이동(auth(회원가입) or home(자동로그인))*/}
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} cwitter</footer>
    </>
  );
}

export default App;
