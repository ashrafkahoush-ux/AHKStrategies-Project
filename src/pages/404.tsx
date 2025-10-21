export default function Custom404() {
    return (
        <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "100vh", color: "#fff", background: "radial-gradient(circle,#1a0030,#000)", fontFamily: "Segoe UI,sans-serif"
        }}>
            <h1 style={{ fontSize: "3rem", color: "#00c0ff" }}>404 — Page Not Found</h1>
            <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#ccc" }}>Looks like you ventured into uncharted space.</p>
            <a href="/" style={{ marginTop: "2rem", color: "#00c0ff", textDecoration: "none", fontSize: "1.1rem" }}>← Back to Home</a>
        </div>
    );
}