
const DisabledPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Site Disabled
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", marginBottom: "30px" }}>
        This site is currently disabled or under maintenance. Please check back later.
      </p>
      <a
        href="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#0078D7",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default DisabledPage;