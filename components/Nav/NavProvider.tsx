import Navbar from "./Navbar";

export default function NavProvider({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
