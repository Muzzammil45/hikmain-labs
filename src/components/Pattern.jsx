/** Subtle connection-line / node decoration. Purely decorative, hidden from assistive tech. */
export default function Pattern({ className = '', tone = 'light' }) {
  const stroke = tone === 'dark' ? '#ffffff' : '#10243E'
  const node = tone === 'dark' ? '#5eead4' : '#0F8B8D'
  const points = [
    [30, 40], [120, 90], [210, 30], [300, 110], [390, 60], [470, 130],
    [70, 170], [170, 200], [270, 180], [370, 230], [450, 200],
  ]
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [1, 7], [7, 8], [3, 8], [8, 9], [5, 10], [9, 10], [6, 7],
  ]
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 500 260"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
    >
      <g stroke={stroke} strokeWidth="1" opacity="0.18">
        {lines.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={points[a][0]}
            y1={points[a][1]}
            x2={points[b][0]}
            y2={points[b][1]}
          />
        ))}
      </g>
      <g fill={node} opacity="0.55">
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} />
        ))}
      </g>
    </svg>
  )
}
