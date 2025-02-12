import React, { useEffect, useState } from 'react'
import { deleteUserQr, getUserQr } from '../services/qr'
function UserQr() {
    const [qrCodes, setQrCodes] = useState([])   
    const [selectedImage, setSelectedImage] = useState(null)
    const fetchUserQr = async()=>{
        try {
            const response = await getUserQr()
            console.log("hey hey qrCode:",response);
            if(response){
                setQrCodes(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteQr = async(file)=>{
       await deleteUserQr(file)
       await fetchUserQr()
      
    }
    useEffect(()=>{
        fetchUserQr()
    },[]) 
  return (
    <div className="container mx-auto px-4 py-8">
    {/* QR List */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {qrCodes.map((qr) => (
        <div
          key={qr._id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <div className="p-6">
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
              <img
                src={qr.messqr || "/placeholder.svg"}
                alt="QR Code"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.svg";
                }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Created: {new Date(qr.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <button
                onClick={() => setSelectedImage(qr.messqr)}
                className="w-24 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-[#29714a] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Select
              </button>
              <button
                onClick={() => deleteQr(qr._id)}
                className="ml-4 w-24 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Image Preview Modal */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className="bg-white rounded-lg max-w-2xl w-full m-4" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="QR Code Preview"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() => setSelectedImage(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )

}

export default UserQr