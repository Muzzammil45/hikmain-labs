/**
 * Honeypot field. Real visitors never see or fill it; bots usually do.
 * Hidden off-screen rather than display:none so simple bots still populate it.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
