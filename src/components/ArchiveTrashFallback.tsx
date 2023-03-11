import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ArchiveTrashFallback = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className="notes w-full relative max-w-[900px] mx-auto pt-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 transition-all delay-75 ease-linear">
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
              bgcolor: `${isDarkMode ? "#6c757d" : "#EBECF0"}`,
            }}
            key={index}
          />
        ))}
    </div>
  );
};

export default ArchiveTrashFallback;
