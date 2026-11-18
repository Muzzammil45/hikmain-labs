import { Mark } from './Logo'

const orbitChips = [
  { label: 'AI evaluation', pos: 'left-1/2 -top-[18px] -ml-[78px] w-[156px]' },
  { label: 'Research', pos: '-right-14 top-1/2 -mt-[19px] w-[140px]' },
  { label: 'Data annotation', pos: 'left-1/2 -bottom-[18px] -ml-[78px] w-[156px]' },
  { label: 'Tutoring', pos: '-left-14 top-1/2 -mt-[19px] w-[140px]' },
]

/**
 * The hero centrepiece: HIKMAIN as one hub, with its services orbiting it. It shows the
 * company's model at a glance: the client deals with one point of contact, and HIKMAIN
 * coordinates the work around it. Purely decorative; the same facts are in the copy.
 */
export default function HubVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-[520px] items-center justify-center max-sm:h-[340px]">
      <div className="float-slow relative flex h-[440px] w-[440px] items-center justify-center max-sm:scale-[.72]">
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_var(--color-line)]" />
        <svg className="spin-slower absolute inset-[70px] h-[300px] w-[300px]" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="148" fill="none" stroke="#5EEAD4" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 9" />
        </svg>

        <div className="relative h-[132px] w-[132px]">
          {[
            'rgba(94,234,212,.55)',
            'rgba(125,168,255,.5)',
            'rgba(94,234,212,.4)',
          ].map((c, i) => (
            <div
              key={c}
              className="halo absolute inset-0 rounded-[36px]"
              style={{ boxShadow: `0 0 0 2px ${c}`, animationDelay: `${i * 1.33}s` }}
            />
          ))}
          <div
            className="breathe absolute inset-0 flex items-center justify-center rounded-[36px]"
            style={{
              background: 'linear-gradient(145deg, #12305A, #071429)',
              boxShadow: '0 0 0 1px rgba(94,234,212,.45), 0 0 60px -10px rgba(94,234,212,.55)',
            }}
          >
            <Mark size={72} framed={false} />
          </div>
        </div>

        <div className="spin-slow absolute inset-0">
          {orbitChips.map((chip) => (
            <div
              key={chip.label}
              className={`spin-slow-reverse absolute rounded-2xl bg-royal px-2.5 py-2.5 text-center text-[13px] font-semibold text-cloud shadow-[inset_0_0_0_1px_var(--color-line-strong)] ${chip.pos}`}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      <div className="drift absolute left-0 top-0 z-10 rounded-2xl max-sm:hidden bg-cloud px-3.5 py-2.5 text-[13.5px] font-bold text-navy shadow-[0_16px_30px_-14px_rgba(0,0,0,.6)]">
        One clear point of contact
      </div>
      <div
        className="drift absolute bottom-0 right-0 z-10 rounded-2xl max-sm:hidden bg-teal px-3.5 py-2.5 text-[13.5px] font-bold text-teal-ink shadow-[0_16px_30px_-14px_rgba(0,0,0,.6)]"
        style={{ animationDelay: '1s', animationDuration: '7.5s' }}
      >
        Scope agreed in writing
      </div>
      <div
        className="drift absolute bottom-0 left-0 z-10 rounded-2xl max-sm:hidden bg-royal px-3.5 py-2.5 text-[13.5px] font-bold text-cloud shadow-[inset_0_0_0_1px_var(--color-line-strong),0_16px_30px_-14px_rgba(0,0,0,.6)]"
        style={{ animationDelay: '.5s', animationDuration: '6s' }}
      >
        One-off or weekly
      </div>
    </div>
  )
}
