import API from "./axios";

export async function uploadToImageKit(file) {
  // Step 1: get auth params
  const authRes = await API.get("/auth/ik-auth");
  const { token, expire, signature } = authRes.data;

  // Step 2: upload image
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", import.meta.env.VITE_IK_PUBLIC_KEY);
  formData.append("token", token);
  formData.append("expire", expire);
  formData.append("signature", signature);

  const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  const data = await uploadRes.json();
  return data.url; // final image URL
}
