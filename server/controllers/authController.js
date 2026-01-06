const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
});

// IMAGEKIT AUTH ENDPOINT
exports.getIKAuth = (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return res.status(200).json(authParams);
  } catch (error) {
    console.error("❌ ImageKit Auth Error:", error.message);
    return res.status(500).json({ message: "ImageKit auth failed" });
  }
};
