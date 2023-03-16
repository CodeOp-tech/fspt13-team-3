function Popup({ handleDeleteTrue, handleDeleteFalse }) {
  return (
    <div className="modal fixed z-10 left-0 top-0 w-full h-full pt-40 overflow-auto backdrop-brightness-50 backdrop-blur-sm">
      <div className="modal-box bg-white my-1/6 mx-auto p-6 border-solid border-4 border-coGreen rounded-md w-2/4">
        <div className="modal-head flex justify-between">
          <p className="m-0 pt-5 px-0 leading-4 font-semibold text-lg">
            Are you sure you want to delete your account?
          </p>
          <div
            onClick={handleDeleteFalse}
            className="cancel-icon cursor-pointer h-16 w-16 rounded-full grid place-items-center hover:bg-white"
          >
            ✖️
          </div>
        </div>
        <button
          onClick={handleDeleteFalse}
          className="modal-cancel inline-block mt-10 mr-5 mb-0 ml-0 text-white bg-coGreen border-none py-4 px-6 cursor-pointer no-underline text-base leading-4 font-semibold rounded-md hover:bg-emerald-500"
        >
          ✖️ No, don't delete
        </button>
        <button
          onClick={handleDeleteTrue}
          className="modal-delete inline-block mt-10 mr-5 mb-0 ml-0 bg-red-600 text-white border-none py-4 px-6 cursor-pointer no-underline text-base leading-4 font-semibold rounded-md hover:bg-red-800"
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
}

export default Popup; /* Fallback color */ /* Black w/ opacity */

/* Sit on top */

/*   .modal-cancel {
    font-family: inherit;
  } */

//.modal {
/*  z-index: 1; */
/* background-color: rgb(0,0,0);  */
/* background-color: rgba(0,0,0,0.4); */
//}

/*  .modal-head {
    justify-content: space-between;
  } */
