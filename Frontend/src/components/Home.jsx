import { Upload, Zap, Share2, Palette } from "lucide-react"
import { Button } from "./index.js"

export default function Home() {
  const handleUpload = () => {
    // Implement your upload logic here
    console.log("Upload button clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">QR Spark</h1>
          <p className="text-xl mb-8">Instant QR codes for the digital age</p>
          <Button
            size="lg"
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-md shadow-lg hover:shadow-xl transition duration-300"
          >
            <Upload className="mr-2 h-6 w-6 inline-block" />
            Upload your Qr
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="h-12 w-12 mb-4 text-yellow-400" />,
              title: "Instant Generation",
              description: "Get your QR code in seconds",
            },
            {
              icon: <Share2 className="h-12 w-12 mb-4 text-green-400" />,
              title: "Easy Sharing",
              description: "Share across all platforms seamlessly",
            },
            {
              icon: <Palette className="h-12 w-12 mb-4 text-purple-400" />,
              title: "Custom Designs",
              description: "Personalize your QR codes",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
              {feature.icon}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="bg-gray-800 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">Trending QR Codes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-700 h-24 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to make your mark?</h2>
          <p className="text-xl mb-8">Create a QR code that stands out. It's quick, easy, and totally free.</p>
          <Button
            size="lg"
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-md shadow-lg hover:shadow-xl transition duration-300"
          >
            Start Creating
          </Button>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 QR Spark. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="hover:text-white mx-2">
              About
            </a>
            <a href="#" className="hover:text-white mx-2">
              Privacy
            </a>
            <a href="#" className="hover:text-white mx-2">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

