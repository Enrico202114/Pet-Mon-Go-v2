import Navbar from "../components/Navbar";
import Hero from "../components/Hero/hero";

function Home({
  onOpenLogin,
  onOpenRegister,
  onOpenProfile,
  tutor,
  onLogout
}) {
  return (
    <>
      <Navbar
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onOpenProfile={onOpenProfile}
        tutor={tutor}
        onLogout={onLogout}
      />

      <Hero
        onOpenRegister={onOpenRegister}
      />
    </>
  );
}

export default Home;