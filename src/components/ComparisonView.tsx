import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ComparisonViewProps {
  originalImage?: string;
  enhancedImage?: string;
  onSave?: () => void;
  onShare?: () => void;
  onTryAnother?: () => void;
}

interface MascotCharacterProps {
  type?: "camera" | "star" | "square";
  size?: "small" | "medium" | "large";
}

// Temporary MascotCharacter component until the actual one is properly imported
const MascotCharacter: React.FC<MascotCharacterProps> = ({
  type = "star",
  size = "medium",
}) => {
  const getColor = () => {
    switch (type) {
      case "camera":
        return "bg-red-500";
      case "star":
        return "bg-red-500";
      case "square":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const getSize = () => {
    switch (size) {
      case "small":
        return "w-10 h-10";
      case "large":
        return "w-20 h-20";
      default:
        return "w-16 h-16";
    }
  };

  const getShape = () => {
    switch (type) {
      case "star":
        return "star-shape";
      case "square":
        return "rounded-lg";
      default:
        return "rounded-full";
    }
  };

  return (
    <div
      className={`${getColor()} ${getSize()} ${getShape()} flex items-center justify-center text-white`}
    >
      {type === "star" && <div className="text-2xl">★</div>}
      {type === "square" && <div className="text-2xl">■</div>}
      {type === "camera" && <div className="text-2xl">📷</div>}
    </div>
  );
};

const ComparisonView = ({
  originalImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=70",
  enhancedImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=100",
  onSave,
  onShare,
  onTryAnother = () => console.log("Try another image"),
}: ComparisonViewProps) => {
  const [activeTab, setActiveTab] = useState<"before" | "after" | "split">(
    "split",
  );

  // Download functionality
  const handleDownload = async () => {
    try {
      const response = await fetch(enhancedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `enhanced-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      if (onSave) onSave();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use native share API if available
        const response = await fetch(enhancedImage);
        const blob = await response.blob();
        const file = new File([blob], `enhanced-image-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        await navigator.share({
          title: "Enhanced Photo",
          text: "Check out my enhanced photo!",
          files: [file],
        });
      } else {
        // Fallback: copy image URL to clipboard
        await navigator.clipboard.writeText(enhancedImage);
        alert("Image URL copied to clipboard!");
      }
      if (onShare) onShare();
    } catch (error) {
      console.error("Error sharing image:", error);
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(enhancedImage);
        alert("Image URL copied to clipboard!");
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-gradient-to-b from-orange-400 to-orange-500 p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        SEE THE DIFFERENCE
      </h1>

      <Card className="w-full max-w-xs mx-auto bg-pink-500 rounded-3xl overflow-hidden shadow-xl mb-4">
        <div className="relative w-full aspect-square">
          {activeTab === "before" && (
            <img
              src={originalImage}
              alt="Original image"
              className="w-full h-full object-cover"
            />
          )}

          {activeTab === "after" && (
            <img
              src={enhancedImage}
              alt="Enhanced image"
              className="w-full h-full object-cover"
            />
          )}

          {activeTab === "split" && (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full overflow-hidden">
                  <img
                    src={originalImage}
                    alt="Original image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 h-full overflow-hidden">
                  <img
                    src={enhancedImage}
                    alt="Enhanced image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="h-full w-1 bg-yellow-400"></div>
              </div>
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="rounded-full h-16 w-16 border-4 border-yellow-400 bg-yellow-300/50 flex justify-center items-center">
                  <div className="h-10 w-1 bg-yellow-400"></div>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 py-2 bg-gradient-to-t from-black/70 to-transparent">
            <div className="text-white font-bold">BEFORE</div>
            <div className="text-white font-bold">AFTER</div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activeTab === "before" ? "default" : "outline"}
          onClick={() => setActiveTab("before")}
          className="bg-white text-pink-500 hover:bg-gray-100 border-2 border-white"
        >
          Before
        </Button>
        <Button
          variant={activeTab === "split" ? "default" : "outline"}
          onClick={() => setActiveTab("split")}
          className="bg-white text-pink-500 hover:bg-gray-100 border-2 border-white"
        >
          Split View
        </Button>
        <Button
          variant={activeTab === "after" ? "default" : "outline"}
          onClick={() => setActiveTab("after")}
          className="bg-white text-pink-500 hover:bg-gray-100 border-2 border-white"
        >
          After
        </Button>
      </div>

      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute -top-6 -right-4">
            <MascotCharacter type="square" size="small" />
          </div>
          <Card className="p-4 bg-white rounded-xl flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-orange-500">4×</div>
            <div className="text-sm font-medium text-gray-600">BOOST</div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={handleDownload}
          className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-3"
        >
          Download Enhanced Image
        </Button>
        <Button
          onClick={handleShare}
          className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-3"
        >
          Share
        </Button>
        <Button
          onClick={onTryAnother}
          variant="outline"
          className="border-white text-white hover:bg-white/20 font-bold py-3"
        >
          Try Another Photo
        </Button>
      </div>

      <div className="absolute bottom-4 right-4">
        <MascotCharacter type="star" />
      </div>
    </div>
  );
};

export default ComparisonView;
