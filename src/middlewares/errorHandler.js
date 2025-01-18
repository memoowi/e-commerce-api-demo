// Global error handler for unexpected errors
const errorHandler = (err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred." });
  };
  
  export default errorHandler;
  