import React, { useEffect, useState } from 'react'
import { getAllQrs } from '../services/qr.js'
import { getAllQrs as getQrCodes } from '../features/qrSlice.js'
import {useDispatch, useSelector} from "react-redux"
function GetQr() {
  const { qrCodes, currentPage, totalPages } = useSelector((state) => state.qr)
  const [selectedImage, setSelectedImage] = useState(null)
    const dispatch = useDispatch()
    const fetchQr = async()=>{
      try {
        const response = await getAllQrs()
      
        dispatch(getQrCodes({
          qrCodes : response.data.allQr,
          currentPage : response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages
        }))
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchQr()
    },[])
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
          dispatch(setCurrentPage(newPage))
      }
  }

  return (
<div className="p-8">
      {/* QR List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {qrCodes.map((qr) => (
          <div key={qr._id} className="border rounded shadow-sm">
            <div className="p-4">
              <div className="w-full h-64 flex items-center justify-center bg-gray-50">
                <img 
                  src={qr.messqr} 
                  alt="QR Code" 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder-image-url'; // You can add a placeholder image URL
                  }}
                />
              </div>
              <p className="mt-2 text-gray-600">
                Created: {new Date(qr.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => setSelectedImage(qr.messqr)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full m-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="w-full h-[500px] flex items-center justify-center bg-gray-50">
                <img 
                  src={selectedImage}
                  alt="QR Code Preview" 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder-image-url'; // You can add a placeholder image URL
                  }}
                />
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button 
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
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

export default GetQr