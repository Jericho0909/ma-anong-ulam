import { Routes, Route } from "react-router-dom";
import UlamHomePage from "./pages/ulamhomepage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<UlamHomePage/>}
        />
      </Routes>
    </>
  )
}

export default App
