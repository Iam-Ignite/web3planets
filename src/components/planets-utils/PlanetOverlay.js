
const PlanetOverlay = ({details}) => {
  return (
    <>
      <div className="absolute top-5 left-5 z-[10px]">
        <h1 className="text-white py-[10px] px-[20px]">{details.tokenName}</h1>
      </div>
    </>
  );
};

export default PlanetOverlay;
