import React from "react";
import { motion } from "framer-motion";
import PhotoUploader from "./PhotoUploader";
import ComparisonView from "./ComparisonView";
import MascotCharacter from "./MascotCharacter";

const Home = () => {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [processedImage, setProcessedImage] = React.useState<string | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      setProcessedImage(imageUrl); // In a real app, this would be the enhanced image URL
      setIsProcessing(false);
    }, 2000);
  };

  const resetImages = () => {
    setUploadedImage(null);
    setProcessedImage(null);
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
              <PhotoUploader onImageUpload={handleImageUpload} />

              <div className="absolute -bottom-10 -left-10">
                <MascotCharacter type="camera" />
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
                isProcessing={isProcessing}
                onReset={resetImages}
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
