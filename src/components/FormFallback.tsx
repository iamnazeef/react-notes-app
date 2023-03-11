import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const FormFallback = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className="px-3 pt-4 w-full max-w-[900px] mx-auto">
      <div>
        <Skeleton
          variant="rounded"
          sx={{
            fontSize: "1.5rem",
            background: "#3D4551",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "180px",
            bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
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
            bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
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
            bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
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
            bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
          }}
        />
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <Skeleton
              variant="rounded"
              sx={{
                fontSize: "1.5rem",
                background: "#3D4551",
                borderRadius: "5px",
                width: "100%",
                maxWidth: "600px",
                marginBottom: "14px",
                bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
              }}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default FormFallback;
