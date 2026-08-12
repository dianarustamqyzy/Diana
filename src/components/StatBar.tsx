interface StatBarProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export function StatBar({ icon, label, value, color }: StatBarProps) {
  return (
    <div className="stat-row">
      <span className={`stat-icon ${color}`}>{icon}</span>
      <div className="stat-info">
        <div><strong>{label}</strong><span>{value}%</span></div>
        <div className="stat-track"><span className={color} style={{ width: `${value}%` }} /></div>
      </div>
    </div>
  );
}
