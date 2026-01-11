import { Routes, Route } from "react-router-dom";
import UlamHomePage from "./pages/ulamhomepage";
import MgaUlamPage from "./pages/mgaulampage";
import { WindowSizeProvider } from "./context/windowsizeContext";
function App() {
  return (
    <>
      <WindowSizeProvider>
        <Routes>
          <Route
            path="/"
            element={<UlamHomePage/>}
          />
          <Route
            path="/mga-ulam/"
            element={<MgaUlamPage/>}
          />
        </Routes>
      </WindowSizeProvider>
    </>
  )
}

export default App
