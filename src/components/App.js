import React, { useState } from "react";
import AppRouter from "components/Router"
import { authService } from "../fBase";

function App() {
    const [isLoggedIn, setIsLoggenIn] = useState(authService.currentUser);
    return (
      <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy; {new Date().getFullYear()} cwitter</footer>
      </>
    );
}

export default App;
