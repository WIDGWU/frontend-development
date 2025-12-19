interface DifferenceCardProps {
  text: string;
  difference: string;
  percent: string;
  variant?: "spring" | "fall"; // optional, extensible
}

const DifferenceCard = ({
  text,
  difference,
  percent,
  variant = "spring",
}: DifferenceCardProps) => {
  const variants = {
    spring: {
      bg: "bg-orange-50",
      accent: "text-orange-700",
      badge: "bg-orange-100 text-orange-700",
    },
    fall: {
      bg: "bg-sky-50",
      accent: "text-sky-700",
      badge: "bg-sky-100 text-sky-700",
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={`
        rounded-2xl p-6 flex-1 min-w-[160px]
        ${styles.bg}
        shadow-sm
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-sm font-medium p-3 rounded-lg ${styles.badge}`}
        >
          {text}
        </span>
      </div>

      {/* Main metric */}
      <div className="space-y-1">
        <p className={`text-3xl font-semibold ${styles.accent}`}>
          {difference}
        </p>
        <p className="text-sm text-slate-600">Percentage change from previous period</p>
      </div>

      {/* Percentage */}
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-lg font-semibold ${styles.accent}`}>
          {percent}%
        </span>
        {/* Future-ready: direction indicator */}
        {/* <ArrowUpRight className="h-4 w-4 text-green-600" /> */}
      </div>
    </div>
  );
};

export default DifferenceCard;
