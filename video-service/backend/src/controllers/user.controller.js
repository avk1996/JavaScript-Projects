import { asyncyHandler } from "../utils/asychHandler.js";

const registerUser = asyncyHandler(async (req, resp) => {
  resp.status(200).json({ message: "OK" });
});

export { registerUser };
