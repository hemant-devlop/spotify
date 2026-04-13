import React from 'react'

const AlbumCompo = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
  
  {/* Navbar */}
  <div className="h-16 bg-gray-800 text-white flex items-center justify-center">
    Navbar
  </div>

  {/* Middle Section */}
  <div className="flex-1 overflow-x-auto overflow-y-hidden">
    <div className="flex h-full min-w-max">
      
      {/* Column 1 */}
      <div className="w-[300px] bg-red-300 flex-shrink-0">
        Column 1
      </div>

      {/* Column 2 */}
      <div className="w-[300px] bg-green-300 flex-shrink-0">
        Column 2
      </div>

      {/* Column 3 */}
      <div className="w-[300px] bg-blue-300 flex-shrink-0">
        Column 3
      </div>

    </div>
  </div>

  {/* Footer */}
  <div className="h-14 bg-gray-900 text-white flex items-center justify-center">
    Footer
  </div>

</div>
  );
}

export default AlbumCompo