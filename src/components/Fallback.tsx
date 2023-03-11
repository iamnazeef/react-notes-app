import { CircularProgress } from "@mui/material";

const Fallback = () => {
  return (
    <main className="px-3 pt-4 w-full">
      <section className="flex justify-center items-center min-h-[65vh]">
        <CircularProgress sx={{ color: "#4B5563" }} />
      </section>
    </main>
  );
};

export default Fallback;
