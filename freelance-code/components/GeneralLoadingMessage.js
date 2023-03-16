const GeneralLoadingMessage = () => {
  return (
    <section className="modal fixed z-10 left-0 top-0 w-full h-full pt-40 overflow-auto backdrop-brightness-50 backdrop-blur-sm">
      <div className="modal-box bg-white my-1/6 mx-auto p-6 border-solid border-4 border-coGreen rounded-md w-2/4">
        <div className="modal-head flex justify-center">
          <p className=" m-0 pt-5 px-0 leading-4 font-semibold text-lg">
            Hold on just a second
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
            height="120"
            width="120"
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralLoadingMessage;
