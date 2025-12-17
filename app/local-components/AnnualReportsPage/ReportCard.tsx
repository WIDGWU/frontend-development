interface ReportCardProps {
  title: string;
  subtitle?: string;
  style: {
    bg: string;
    softBg: string;
    text?: string;
  };
  children: React.ReactNode;
}

export const ReportCard = ({
  title,
  subtitle,
  style,
  children,
}: ReportCardProps) => (
  <div className={`rounded-2xl shadow-md ${style.softBg}`}>
    <div
      className={`px-4 py-3 rounded-t-2xl ${style.bg} ${
        style.text ?? "text-white"
      }`}
    >
      <h3 className="font-medium">{title}</h3>
      {subtitle && (
        <p className="text-xs opacity-80">{subtitle}</p>
      )}
    </div>

    <div className="p-5 grid grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);
