import { useId } from 'react'

const inputClass =
  'block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-black placeholder:text-slate-500 focus:border-action focus:outline-2 focus:outline-action aria-[invalid=true]:border-red-600'

function Wrapper({ id, label, required, optionalLabel = true, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
        {required ? (
          <span className="text-red-700"> *<span className="sr-only"> required</span></span>
        ) : (
          optionalLabel && <span className="font-normal text-black/60"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-black/65">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
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
        className={inputClass}
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
        className={inputClass}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  )
}

export function SelectField({ label, name, options, required, hint, error, placeholder, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        name={name}
        className={inputClass}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        defaultValue=""
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
        className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary`}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  )
}

export function Checkbox({ name, label, error, required = true, children }) {
  const id = useId()
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="yes"
          className="mt-1 h-5 w-5 shrink-0 rounded border-slate-400 accent-action"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="text-sm leading-relaxed">
          {children || label}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-8 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function Fieldset({ legend, hint, error, children }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold">{legend}</legend>
      {hint && <p className="text-sm text-black/65">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  )
}
