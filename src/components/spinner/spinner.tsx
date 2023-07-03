const Spinner: React.FC = () => {
  return (
    <div className="spinnerOverlay w-full h-[60vh] flex justify-center items-center">
      <div className="spinnerContainer inline-block w-[50px] h-[50px] border-8 border-solid border-loader rounded-[50%] animate-spin"></div>
    </div>
  );
};

export default Spinner;
