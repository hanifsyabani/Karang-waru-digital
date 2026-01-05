export default function Copyright({variant} : {variant:string}) {
  return (
    <p className={`text-sm ${variant === "dashboard" ? "text-slate-600 text-center  " : "text-white"}`}>
      © {new Date().getFullYear()} Created By Desa Karang Waru. All Rights Reserved.
    </p>
  );
}
