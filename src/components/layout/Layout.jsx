import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-indigo-950">
      {/* Main dark indigo gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(100% 100% at 0% 0%, rgb(49, 46, 129) 0%, rgb(15, 23, 42) 100%)",
            mask: "radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Indigo fading streaks */}

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(rgb(129, 140, 248) 0%, rgba(129, 140, 248, 0) 100%)",
            mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 36%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)",
            transform: "skewX(45deg)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(rgb(99, 102, 241) 0%, rgba(99, 102, 241, 0) 100%)",
            mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 11%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0.55) 41%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)",
            transform: "skewX(45deg)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(rgb(129, 140, 248) 0%, rgba(129, 140, 248, 0) 100%)",
            mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 9%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 28%, rgba(0, 0, 0, 0.424) 40%, rgb(0, 0, 0) 48%, rgba(0, 0, 0, 0.267) 54%, rgba(0, 0, 0, 0.13) 78%, rgb(0, 0, 0) 88%, rgba(0, 0, 0, 0) 97%)",
            transform: "skewX(45deg)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(rgb(79, 70, 229) 0%, rgba(79, 70, 229, 0) 100%)",
            mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 17%, rgba(0, 0, 0, 0.55) 26%, rgb(0, 0, 0) 35%, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.13) 69%, rgb(0, 0, 0) 79%, rgba(0, 0, 0, 0) 97%)",
            transform: "skewX(45deg)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(rgb(129, 140, 248) 0%, rgba(129, 140, 248, 0) 100%)",
            mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 27%, rgb(0, 0, 0) 42%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 74%, rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0.47) 88%, rgba(0, 0, 0, 0) 97%)",
            transform: "skewX(45deg)",
          }}
        />
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.18),transparent_50%)]" />

      {/* App content */}
      <div className="relative z-10 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}