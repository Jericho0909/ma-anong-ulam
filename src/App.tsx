import { Routes, Route } from "react-router-dom";
import UlamPage from "./pages/ulampage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<UlamPage/>}
        />
      </Routes>
    </>
  )
}

export default App
