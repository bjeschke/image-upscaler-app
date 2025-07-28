import React from "react";
import { motion } from "framer-motion";
import PhotoUploader from "./PhotoUploader";
import ComparisonView from "./ComparisonView";
import MascotCharacter from "./MascotCharacter";
import Replicate from "replicate";

const Home = () => {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [processedImage, setProcessedImage] = React.useState<string | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);

      // Initialize Replicate (you'll need to add your API token as an env variable)
      const replicate = new Replicate({
        auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
      });

      // Run the upscaling model
      const output = await replicate.run(
          `${process.env.NEXT_PUBLIC_REPLICATE_MODEL}`,
        {
          input: {
            image: base64,
            scale: 4,
            face_enhance: false,
          },
        },
      );

      if (output && typeof output === "string") {
        setProcessedImage(output);
      } else {
        console.error("Unexpected output format:", output);
        // Fallback to original image if processing fails
        setProcessedImage(imageUrl);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      // Fallback to original image if processing fails
      setProcessedImage(imageUrl);
    } finally {
      setIsProcessing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetImages = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-500 to-orange-500 flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {!uploadedImage ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-2">ENHANCE</h1>
              <h1 className="text-5xl font-bold text-white">PHOTOS</h1>
            </div>

            <div className="relative">
              <PhotoUploader
                onImageSelected={handleImageUpload}
                isProcessing={isProcessing}
              />

              <div className="absolute -bottom-10 -left-10">
                <MascotCharacter type="camera" />
              </div>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-2">ENHANCING</h1>
              <h1 className="text-5xl font-bold text-white">YOUR PHOTO</h1>
            </div>

            <div className="relative flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-xl">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 flex items-center justify-center">
                  <MascotCharacter type="star" size="sm" animate={true} />
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 mb-2">
                  Magic in Progress...
                </p>
                <p className="text-gray-600">Upscaling your image with AI</p>
              </div>

              <div className="mt-6 flex space-x-4">
                <MascotCharacter type="camera" size="sm" animate={true} />
                <MascotCharacter type="square" size="sm" animate={true} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-2">SEE THE</h1>
              <h1 className="text-5xl font-bold text-white">DIFFERENCE</h1>
            </div>

            <div className="relative">
              <ComparisonView
                originalImage={uploadedImage}
                enhancedImage={processedImage}
                onTryAnother={resetImages}
              />

              <div className="absolute -bottom-10 -left-10">
                <MascotCharacter type="square" />
              </div>

              <div className="absolute -bottom-10 -right-10">
                <MascotCharacter type="star" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">BOOST UP TO 4×</h2>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-8 text-center text-white text-sm opacity-70">
        <p>Powered by Magic Image Refiner AI</p>
      </div>
    </div>
  );
};

export default Home;
