import { Routes, Route } from "react-router-dom";
import UlamHomePage from "./pages/ulamhomepage";
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
        </Routes>
      </WindowSizeProvider>
    </>
  )
}

export default App
