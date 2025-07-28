import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";

interface PhotoUploaderProps {
  onImageSelected?: (file: File) => void;
  isProcessing?: boolean;
}

const PhotoUploader = ({
  onImageSelected = () => {},
  isProcessing = false,
}: PhotoUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        onImageSelected(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gradient-to-b from-purple-600 to-blue-500 p-6 rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Photo Optimizer</h1>
        <h2 className="text-3xl font-bold text-red-500 mb-2">AI</h2>
      </div>

      <Card className="w-full bg-white rounded-xl overflow-hidden shadow-xl">
        <CardContent className="p-6">
          {selectedImage ? (
            <div className="relative w-full aspect-square mb-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full aspect-square mb-4 bg-blue-100 rounded-lg">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto text-blue-500 mb-2" />
                <p className="text-blue-500 font-medium">
                  Select an image to enhance
                </p>
              </div>
            </div>
          )}

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            onClick={handleUploadClick}
            disabled={isProcessing}
            className="w-full py-6 text-lg font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {selectedImage ? "Change Image" : "Upload Image"}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 relative">
        <div className="absolute -bottom-12 -left-4">
          <MascotCamera />
        </div>
      </div>
    </div>
  );
};

const MascotCamera = () => {
  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 bg-red-500 rounded-lg transform rotate-6"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-900 rounded-full border-4 border-white"></div>
      </div>
    </div>
  );
};

export default PhotoUploader;
