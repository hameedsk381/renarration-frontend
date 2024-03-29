import React from 'react';

import Hero from '../../components/Hero/Hero';
import UrlInput from '../../components/UrlInput/UrlInput';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RenarrationDataGrid from '../../components/RenarrationDataGrid';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <UrlInput homepage navigateTo="/re-narrate" />
        <RenarrationDataGrid />
      </main>
      <Footer />
    </>

  );
}

export default Home;
