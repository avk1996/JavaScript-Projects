const asyncyHandler = (requestHandler) => {
  return (req, resp, next) => {
    Promise.resolve(requestHandler(req, resp, next)).catch((error) => {
      console.log(`Error in asynch handler: ${error}`);
      next(error);
    });
  };
};

export { asyncyHandler };

// const asyncyHandler1 = (requestHandler) => async (req, resp, next) => {
//   try {
//     await requestHandler();
//   } catch (error) {
//     resp.status(error.code || 500).json({
//       success: true,
//       message: error.message,
//     });
//   }
// };
