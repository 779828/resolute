import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ id, name, value, options, placeholder = 'Select...', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between rounded-lg border-2 bg-background px-4 py-3 text-left text-sm transition-colors ${
          isOpen ? 'border-primary' : 'border-input'
        } ${value ? 'text-foreground' : 'text-muted-foreground'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel || placeholder}</span>
        <svg
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-card shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                value === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-card-foreground hover:bg-secondary'
              }`}
              onClick={() => {
                onChange(name, option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
