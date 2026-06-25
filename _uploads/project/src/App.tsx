import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useState, useEffect } from "react";
import { IntroLoader, shouldShowIntro } from "./components/feature/IntroLoader";

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const force = sessionStorage.getItem("conquer-intro-force") === "true";
    if (force) {
      sessionStorage.removeItem("conquer-intro-force");
      return true;
    }
    return shouldShowIntro();
  });

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        {showIntro && (
          <IntroLoader onComplete={() => setShowIntro(false)} />
        )}
        <div className={showIntro ? "site-content-hidden" : "site-content-visible"}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;