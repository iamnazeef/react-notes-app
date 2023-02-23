import { Skeleton } from "@mui/material";

const FormFallback = () => {
  return (
    <div className="px-3 pt-4 font-manrope bg-darkmode text-gray-200 w-full max-w-[900px] mx-auto">
      <div>
        <Skeleton
          variant="rounded"
          sx={{
            fontSize: "1.5rem",
            background: "#3D4551",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "180px",
          }}
        />
      </div>
      <div className="form mt-8">
        <Skeleton
          variant="rounded"
          sx={{
            fontSize: "1.5rem",
            background: "#3D4551",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "600px",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            fontSize: "1.5rem",
            background: "#3D4551",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "200px",
            marginY: "12px",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            fontSize: "1.5rem",
            background: "#3D4551",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "600px",
            marginBottom: "30px",
          }}
        />
        {Array(6)
          .fill(0)
          .map(() => (
            <Skeleton
              variant="rounded"
              sx={{
                fontSize: "1.5rem",
                background: "#3D4551",
                borderRadius: "5px",
                width: "100%",
                maxWidth: "600px",
                marginBottom: "14px",
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default FormFallback;
