import { useId } from 'react'

function Wrapper({ id, label, required, optionalLabel = true, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-cloud">
        {label}
        {required ? (
          <span className="text-teal">
            {' '}*<span className="sr-only"> required</span>
          </span>
        ) : (
          optionalLabel && <span className="font-normal text-faint"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id, hint, error) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
}

export function TextField({ label, name, type = 'text', required, hint, error, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        className="field"
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  )
}

export function TextArea({ label, name, required, hint, error, rows = 5, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="field resize-y"
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  )
}

export function SelectField({ label, name, options, required, hint, error, placeholder, value, defaultValue, ...rest }) {
  const id = useId()
  // Works controlled (value) or uncontrolled (defaultValue); never both.
  const valueProps = value !== undefined ? { value } : { defaultValue: defaultValue ?? '' }
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        name={name}
        className="field"
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...valueProps}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  )
}

export function FileField({ label, name, hint, error, accept, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        className="field cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-bold file:text-teal-ink"
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  )
}

export function Checkbox({ name, label, error, required = true, children, ...rest }) {
  const id = useId()
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="yes"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-teal"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-mist">
          {children || label}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-8 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export function Fieldset({ legend, hint, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold text-cloud">{legend}</legend>
      {hint && <p className="-mt-2 text-sm text-muted">{hint}</p>}
      {children}
    </fieldset>
  )
}

/** Shared "something went wrong" and success blocks for every form. */
export function FormError({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="rounded-xl bg-red-500/10 p-3.5 text-sm font-medium text-danger shadow-[inset_0_0_0_1px_rgba(252,165,165,.4)]">
      {children}
    </p>
  )
}

export function FormSuccess({ title, children }) {
  return (
    <div role="status" className="panel-in rounded-3xl bg-teal/10 p-7 shadow-[inset_0_0_0_1px_rgba(94,234,212,.5)]">
      <span className="pop-in mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-teal text-teal-ink">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-2 leading-relaxed text-mist">{children}</div>
    </div>
  )
}
