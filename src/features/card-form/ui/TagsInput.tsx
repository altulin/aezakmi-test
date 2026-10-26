import { useRef, useState } from 'react';
import type { ClipboardEvent, KeyboardEvent } from 'react';
import { TagChip } from '@/entities/card';
import { FormField } from '@/shared/ui';
import styles from './TagsInput.module.scss';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  onBlur?: () => void;
  label?: string;
  error?: string;
}

const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 20;

export const TagsInput = ({
  value,
  onChange,
  onBlur,
  label,
  error,
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isFull = value.length >= MAX_TAGS;

  // Adds candidates with trimming, case-insensitive dedupe and the tag limit.
  // Returns the resulting number of tags.
  const addTags = (candidates: string[]): number => {
    const next = [...value];
    const seen = new Set(next.map((tag) => tag.toLowerCase()));

    for (const candidate of candidates) {
      const tag = candidate.trim().slice(0, MAX_TAG_LENGTH);
      if (!tag || next.length >= MAX_TAGS || seen.has(tag.toLowerCase())) {
        continue;
      }
      next.push(tag);
      seen.add(tag.toLowerCase());
    }

    if (next.length !== value.length) {
      onChange(next);
    }
    return next.length;
  };

  const commitInput = () => {
    addTags([inputValue]);
    setInputValue('');
  };

  // Splitting in onChange covers typed commas, pasted lists ("a, b, c")
  // and mobile keyboards that report e.key as "Unidentified"
  const handleChange = (raw: string) => {
    if (!raw.includes(',')) {
      setInputValue(raw.slice(0, MAX_TAG_LENGTH));
      return;
    }

    const parts = raw.split(',');
    const rest = parts.pop() ?? '';
    const count = addTags(parts);
    // Once the list is full the field turns read-only, so don't leave text in it
    setInputValue(
      count >= MAX_TAGS ? '' : rest.trimStart().slice(0, MAX_TAG_LENGTH)
    );
  };

  // A pasted list is complete, so every part becomes a tag, including the last one.
  // (While typing, the text after the last comma stays in the field: see handleChange.)
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (!pasted.includes(',')) return; // a single word: let the browser paste it

    e.preventDefault();
    const input = e.currentTarget;
    const start = input.selectionStart ?? inputValue.length;
    const end = input.selectionEnd ?? inputValue.length;
    const combined =
      inputValue.slice(0, start) + pasted + inputValue.slice(end);

    addTags(combined.split(','));
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Enter must not submit the whole form
      e.preventDefault();
      commitInput();
      return;
    }

    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      e.preventDefault();
      removeTag(value.length - 1);
    }
  };

  const handleBlur = () => {
    // Don't lose text the user typed but didn't confirm with Enter
    commitInput();
    onBlur?.();
  };

  const placeholder =
    value.length === 0 ? 'Add tags...' : isFull ? `Max ${MAX_TAGS} tags` : '';

  return (
    <FormField label={label} error={error}>
      {(fieldProps) => (
        <div
          className={`${styles.field} ${fieldProps.hasError ? styles.fieldError : ''}`.trim()}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((tag, index) => (
            <TagChip key={tag} tag={tag} onRemove={() => removeTag(index)} />
          ))}
          <input
            ref={inputRef}
            id={fieldProps.id}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            // readOnly (not disabled): typing is blocked, but focus, Tab and
            // Backspace-to-remove keep working
            readOnly={isFull}
            aria-invalid={fieldProps['aria-invalid']}
            aria-describedby={fieldProps['aria-describedby']}
          />
        </div>
      )}
    </FormField>
  );
};
