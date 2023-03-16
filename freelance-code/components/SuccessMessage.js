const SuccessMessage = ({successMessage}) => {
    return ( 
        <section className="modal fixed z-10 left-0 top-0 w-full h-full  pt-40 overflow-auto backdrop-brightness-50 backdrop-blur-sm">
        <div className="modal-box bg-white my-1/6 mx-auto p-6 border-solid border-4 border-coGreen rounded-md w-2/4">
          <div className="modal-head flex justify-between">
            <p className="m-0 pt-5 px-0 leading-4 font-semibold text-lg">
              {successMessage}
            </p>
            <div className="cancel-icon cursor-pointer h-10 w-10 rounded-full grid place-items-center bg-coGreen">
              ✔️
            </div>
          </div>
        </div>
      </section>
     );
}
 
export default SuccessMessage;