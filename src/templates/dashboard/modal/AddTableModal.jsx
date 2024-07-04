export const AddTableModal = ({openmodal, handleAddTableName, setAddTableModal}) => {
    return(
        <>
            {openmodal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg z-50 w-1/3 h-[200px]">
            <div className="flex justify-end">
              <button onClick={() => setAddTableModal(false)}>Kapat</button>
            </div>
            <h3 className="text-2xl text-center">Yeni Tablo Adı Ekle</h3>
            <form onSubmit={handleAddTableName} className='mt-[20px] flex'>
              <input 
                type="text" 
                name='addTableName' 
                className="w-[80%] border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635fc7] mr-[20px]"
                placeholder='Tablo Adı Gir' 
              />
              <input 
                type="submit" 
                className='w-[20%] bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' 
              />
            </form>
          </div>
        </>
      )}
        </>
    )
}