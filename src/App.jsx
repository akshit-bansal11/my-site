//--------------------| DEPENDENCIES |--------------------//
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//--------------------| COMPONENTS |--------------------//
import NavBar from './main/components/layout/NavBar';
import Home from './main/pages/Home';
import Projects from './main/pages/Projects';
import Colors from './projects/color-space/Colors';
import UsefulAiTools from './projects/tools-space/UsefulAiTools';

// ---------------- SCROLL TO TOP ----------------
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
// ------------------------------------------------

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  let page = 'default';
  if (path === '/') page = 'home';
  else if (path === '/projects') page = 'projects';

  return (
    <motion.div
      className="flex flex-col font-thin justify-center cursor-default items-center lg:gap-10 md:gap-7 gap-4 min-h-screen"
      style={{ minHeight: '100vh', height: '100%', position: 'relative' }}
    >
      {/* Background */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <div className="relative h-full w-full bg-neutral-900">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#bdbdbd18_1px,transparent_1px),linear-gradient(to_bottom,#bdbdbd18_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

      {path === "/" && <NavBar page={page} />}
      {path === "/projects" && <NavBar page={page} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/tools/ai" element={<UsefulAiTools />} />
      </Routes>
    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
