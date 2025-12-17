interface StatItemProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatItem = ({ label, value, highlight }: StatItemProps) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p
      className={`font-semibold ${
        highlight ? "text-3xl" : "text-2xl"
      } text-slate-900`}
    >
      {value}
    </p>
  </div>
);
