// Helper function for success responses
export const handleSuccess = (res, status, message, data) => {
    return res.status(status).json({ message, data });
  };
  
  // Helper function for error responses
  export const handleError = (res, status, message) => {
    return res.status(status).json({ error: message });
  };
  