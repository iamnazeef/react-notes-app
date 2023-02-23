import { Skeleton } from "@mui/material";

const ViewFallback = () => {
  return (
    <div className="p-3 pt-4 font-manrope w-full bg-darkmode text-gray-200">
      <div className="w-full max-w-[900px] mx-auto">
        <div className="header w-full flex items-center justify-between">
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.5rem",
              background: "#3D4551",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "200px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.5rem",
              background: "#3D4551",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "120px",
            }}
          />
        </div>
        <div className="date mt-5">
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "120px",
            }}
          />
        </div>
        {/* body  */}
        <div className="date mt-14">
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: `500px`,
              marginBottom: "25px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: `300px`,
              marginBottom: "25px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: `350px`,
              marginBottom: "25px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: `600px`,
              marginBottom: "25px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: "1.2rem",
              background: "#3D4551",
              borderRadius: "10px",
              width: "100%",
              maxWidth: `250px`,
              marginBottom: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewFallback;
