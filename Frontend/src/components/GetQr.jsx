import React, { useEffect, useState } from 'react'
import { getAllQrs } from '../services/qr.js'
import { getAllQrs as getQrCodes } from '../features/qrSlice.js'
import {useDispatch, useSelector} from "react-redux"
import {  deleteQr as removeQr } from '../services/qr.js'
function GetQr() {
  const { qrCodes, currentPage, totalPages } = useSelector((state) => state.qr)
  const [selectedImage, setSelectedImage] = useState(null)
  const [transfer, setTransfer]  = useState(null)
    const dispatch = useDispatch()
    const fetchQr = async()=>{
      try {
        const response = await getAllQrs()
      // console.log("floor",response.data.allQr);  
        dispatch(getQrCodes({
          qrCodes : response.data.allQr,
          currentPage : response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages
        }))
      } catch (error) {
        console.log(error);
      }
    }
    const deleteQr = async(file)=>{
      await removeQr(file)
      await fetchQr()
      setSelectedImage(null)
     
   }
   const valueDefined=(qr)=>{
    setSelectedImage(qr.messqr)
    setTransfer(qr._id)
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
            <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-sm font-medium text-white bg-[#8ECAE6] rounded-full">
                {qr.floor}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {new Date(qr.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <button 
              onClick={() => valueDefined(qr)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#E95420] rounded-lg hover:bg-[#29714a] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E95420] focus:ring-opacity-50 shadow-sm hover:shadow-md"
            >
              Select
            </button>
          </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Next
      </button>
    </div>

    {/* Image Preview Modal */}
    {selectedImage  && (
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
              onClick={() => (
              deleteQr(transfer)
              )}
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

export default GetQr