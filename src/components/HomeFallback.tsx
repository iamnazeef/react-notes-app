import Skeleton from "@mui/material/Skeleton";

const HomeFallback = () => {
  return (
    <div className="home w-full relative max-w-[900px] mx-auto pt-4">
      <div className="w-full flex flex-col tablet:flex-row items-center justify-around laptop:justify-between">
        <div className="mb-6 w-full max-w-[330px] laptop:max-w-[285px] grid grid-cols-4 h-[25px] bg-darkmode shadow-xl space-x-1">
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.8rem", background: "#3D4551" }}
                key={index}
              />
            ))}
        </div>
        <div className="mb-4 w-full max-w-[330px] laptop:max-w-[285px] grid grid-cols-4 h-[25px] bg-darkmode shadow-xl space-x-1">
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                variant="rounded"
                sx={{
                  fontSize: "1.5rem",
                  background: "#3D4551",
                  borderRadius: "15px",
                }}
                key={index}
              />
            ))}
        </div>
      </div>
      <div className="notes w-full relative max-w-[900px] mx-auto pt-4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 transition-all delay-75 ease-linear">
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <Skeleton
              variant="rounded"
              sx={{
                fontSize: "1.5rem",
                background: "#3D4551",
                height: "190px",
                width: "100%",
                maxWidth: "330px",
                margin: "auto",
                padding: "2",
                borderRadius: "10px",
              }}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeFallback;
