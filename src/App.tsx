import { Routes, Route } from "react-router-dom";
import UlamHomePage from "./pages/ulamhomepage";
import MgaUlamPage from "./pages/mgaulampage";
import DetalyeNgUlam from "./pages/detalyengulampage";
import { FetchDataProvider } from "./context/fetchDatabaseContext";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SearchProvider } from "./context/searchContext";
import { MgaSangkapNaMeronKaProvider } from "./context/mgaSangkapNaMeronKa";
function App() {
  return (
    <>
      <FetchDataProvider>
        <WindowSizeProvider>
          <Routes>
            <Route
              path="/"
              element={<UlamHomePage/>}
            />
            <Route
              path="/mga-ulam/"
              element={
                <MgaSangkapNaMeronKaProvider>
                  <SearchProvider>
                    <MgaUlamPage/>
                  </SearchProvider>
                </MgaSangkapNaMeronKaProvider>
              }
            />
            <Route
              path="/detalyengulam/:id/:name"
              element={<DetalyeNgUlam/>}
            />
          </Routes>
        </WindowSizeProvider>
      </FetchDataProvider>
    </>
  )
}

export default App
