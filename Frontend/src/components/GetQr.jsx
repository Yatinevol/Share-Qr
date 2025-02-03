import React, { useEffect, useState } from 'react'
import { getAllQrs } from '../services/qr.js'
import { getAllQrs as getQrCodes } from '../features/qrSlice.js'
import {useDispatch, useSelector} from "react-redux"
function GetQr() {
  const { qrCodes, currentPage, totalPages } = useSelector((state) => state.qr)
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
                  <div key={qr._id} className="border rounded p-4">
                      <img 
                          src={qr.messqr} 
                          alt="QR Code" 
                          className="w-full h-auto"
                      />
                      <p className="mt-2 text-gray-600">
                          Created: {new Date(qr.createdAt).toLocaleDateString()}
                      </p>
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
      </div>
  )
}

export default GetQr