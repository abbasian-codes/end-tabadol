export default function Logo({ color = "white", textColor = "white" }) {
  return (
    <div className="flex flex-col items-center font-vazir space-y-1">
      <svg width="120" height="20" viewBox="0 0 240 20" fill="none">
        <defs>
          <marker
            id="arrowheadTop"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            fill={color}
          >
            <polygon points="0 0, 6 3, 0 6" />
          </marker>
        </defs>
        <path
          d="M 10 30 Q 60 0 110 30"
          stroke={color}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowheadTop)"
        />
      </svg>

      <div
        className="text-xl font-extrabold tracking-widest"
        style={{ color: textColor }}
      >
        تبادل‌کارا
      </div>

      <svg width="120" height="20" viewBox="0 0 20 40" fill="none">
        <defs>
          <marker
            id="arrowheadBottom"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            fill={color}
          >
            <polygon points="0 0, 6 3, 0 6" />
          </marker>
        </defs>
        <path
          d="M 110 10 Q 60 40 10 10"
          stroke={color}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowheadBottom)"
        />
      </svg>
    </div>
  )
}
