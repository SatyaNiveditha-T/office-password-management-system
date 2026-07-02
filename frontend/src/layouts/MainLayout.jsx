import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          minHeight: "100vh",
          background: "#f4f6f9",
        }}
      >
        <Header />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}