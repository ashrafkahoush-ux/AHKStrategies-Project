export default function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
        background: "black",
        fontSize: "1.5rem",
      }}
    >
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </div>
  );
}


