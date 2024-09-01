const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div
        className="spinner-border w-16 h-16 text-moderateCyan"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
