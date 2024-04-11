import { asyncyHandler } from "../utils/asychHandler.js";

const registerUser = asyncyHandler(async (req, resp) => {
  resp.status(200).json({ msg: "OK" });
});

export { registerUser };
