type ProgramType = "windows" | "word" | "excel" | "powerpoint" | "email";

const ProgramIcon = ({ type }: { type: ProgramType }) => {
  if (type === "windows") {
    return <svg viewBox="0 0 24 24" className="informa3-program-icon-windows" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="1" />
      <rect x="13" y="1" width="10" height="10" rx="1" />
      <rect x="1" y="13" width="10" height="10" rx="1" />
      <rect x="13" y="13" width="10" height="10" rx="1" />
    </svg>;
  }
  if (type === "email") {
    return <svg viewBox="0 0 24 24" className="informa3-program-icon-email" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>;
  }
  return <svg viewBox="0 0 24 24" className="informa3-program-icon-document" aria-hidden="true">
    <rect x="3" y="2" width="18" height="20" rx="2" opacity="0.95" />
    <rect x="3" y="2" width="9" height="20" rx="2" opacity="0.25" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="Arial, sans-serif">{type === "word" ? "W" : type === "excel" ? "X" : "P"}</text>
  </svg>;
};

const programs: { type: ProgramType; name: string }[] = [
  { type: "windows", name: "Windows" },
  { type: "word", name: "Word" },
  { type: "excel", name: "Excel" },
  { type: "powerpoint", name: "PowerPoint" },
  { type: "email", name: "E-mail" },
];

export const Programas = () => (
  <div className="informa3-programs mt-3 mb-2 md:mt-4">
    <h2 className="informa3-programs-title font-bold leading-tight">Domine os programas mais usados</h2>
    <div className="mx-auto mt-2 grid max-w-3xl grid-cols-5 gap-2 md:gap-6">
      {programs.map(({ type, name }) => (
        <div key={type} className="flex min-w-0 flex-col items-center gap-1 md:gap-2">
          <div className={`informa3-program-tile informa3-program-${type}`}><ProgramIcon type={type} /></div>
          <span className="text-[10px] font-bold leading-tight md:text-sm">{name}</span>
        </div>
      ))}
    </div>
  </div>
);