// Cloudinary Configuration
// Values are loaded from environment variables (.env file)

export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  UPLOAD_PRESET: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  API_KEY: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY || "",
};

// Backend API Configuration
export const API_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL || "https://backend-gt02.onrender.com",
  ENDPOINTS: {
    ANALYZE_CV: "/api/analyze-cv",
  },
};

// Validation function to check if required environment variables are set
export const validateConfig = () => {
  const requiredVars = [
    "EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME",
    "EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn("Missing required environment variables:", missingVars);
    return false;
  }

  return true;
};
