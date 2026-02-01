import { Routes, Route } from "react-router-dom";
import UlamHomePage from "./pages/ulamhomepage";
import MgaUlamPage from "./pages/mgaulampage";
import DetalyeNgUlam from "./pages/detalyengulampage";
import { FirebaseDatabaseProvider } from "./context/firebaseDatabaseContext";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SearchModeProvider } from "./context/searchModeContext";
import { SaveScrollPositionProvider } from "./context/saveScrollPositionContext";
import { UlamResultProvider } from "./context/ulamResultContext";
function App() {
  return (
    <>
      <FirebaseDatabaseProvider>
          <WindowSizeProvider>
            <SearchModeProvider>
              <SaveScrollPositionProvider>
                <UlamResultProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={<UlamHomePage/>}
                    />
                    <Route
                      path="/mga-ulam/"
                      element={
                        <MgaUlamPage/>
                      }
                    />
                    <Route
                      path="/detalyengulam/:id/:name"
                      element={<DetalyeNgUlam/>}
                    />
                  </Routes>
                </UlamResultProvider>
            </SaveScrollPositionProvider>
            </SearchModeProvider>
          </WindowSizeProvider>
      </FirebaseDatabaseProvider>
    </>
  )
}

export default App
