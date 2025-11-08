export default function Copyright({variant} : {variant:string}) {
  return (
    <p className={`text-sm ${variant === "dashboard" ? "text-slate-600 text-center  " : "text-white"}`}>
      © 2025 Created By Desa Karang Waru. All Rights Reserved.
    </p>
  );
}
