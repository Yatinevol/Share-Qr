import {  Upload, X, Check, Loader2 } from "lucide-react"
import { Button } from "./index.js"
import { uploadUserFile } from "../services/qr.js"
import { useNavigate } from "react-router-dom"
import React,{useState} from "react"
export default function Home() {
  const [file, setFile] = useState(null);
  const [floorTag, setFloorTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !floorTag) {
      setError('Please select both a file and floor tag');
      return;
    }

    setIsUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('messqr', file);
    formData.append('floorTag', floorTag);

    try {
      await uploadUserFile(formData)
      navigate("/qr")
      
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile ) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid QR code image (PNG format)');
      setFile(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleUpload} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Upload QR Code</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select your file and floor location
          </p>
        </div>

        {/* Floor Tag Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Floor Tag
          </label>
          <select
            value={floorTag}
            onChange={(e) => setFloorTag(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select floor</option>
            <option value="ff">First Floor (FF)</option>
            <option value="gf">Ground Floor (GF)</option>
          </select>
        </div>

        {/* File Upload Area */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            QR Code File
          </label>
          <div className="relative">
            <label 
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                ${file ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <Check className="w-8 h-8 text-green-500 mb-2" />
                    <p className="text-sm text-gray-500">{file.name}</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload QR code</p>
                    <p className="text-xs text-gray-500">PNG files only</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">
            <X className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || !floorTag || isUploading}
          className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md 
            ${!file || !floorTag || isUploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-200`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload QR Code'
          )}
        </button>
      </form>
    </div>
  );
}

