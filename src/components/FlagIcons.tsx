export const IndiaFlag = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
    <rect y="10.67" width="24" height="5.33" fill="#138808" />
    <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.4" />
  </svg>
);

export const USFlag = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="16" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map(i => (
      <rect key={i} y={i * (16 / 13)} width="24" height={16 / 13} fill="#FFFFFF" />
    ))}
    <rect width="9.6" height="8.6" fill="#3C3B6E" />
  </svg>
);

export const FlagForRegion = ({ region, size }: { region: string; size?: number }) =>
  region === 'india' ? <IndiaFlag size={size} /> : <USFlag size={size} />;
