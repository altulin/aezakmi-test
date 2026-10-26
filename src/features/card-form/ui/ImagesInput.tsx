import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import type { CardImage } from '@/entities/card';
import { FormField } from '@/shared/ui';
import styles from './ImagesInput.module.scss';

interface ImagesInputProps {
  value: CardImage[];
  onChange: (images: CardImage[]) => void;
  onBlur?: () => void;
  label?: string;
  error?: string;
}

const MAX_IMAGES = 6;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const isAcceptedFile = (file: File) =>
  file.type.startsWith('image/') && file.size <= MAX_SIZE_BYTES;

export const ImagesInput = ({
  value,
  onChange,
  onBlur,
  label,
  error,
}: ImagesInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState('');

  const isFull = value.length >= MAX_IMAGES;
  const openFilePicker = () => fileInputRef.current?.click();

  const addFiles = (files: FileList) => {
    const all = Array.from(files);
    const accepted = all.filter(isAcceptedFile);
    const freeSlots = MAX_IMAGES - value.length;
    const toAdd = accepted.slice(0, freeSlots);

    const problems: string[] = [];
    if (accepted.length < all.length) {
      problems.push(`only images up to ${MAX_SIZE_MB} MB are allowed`);
    }
    if (accepted.length > freeSlots) {
      problems.push(`max ${MAX_IMAGES} images`);
    }
    setNotice(
      problems.length > 0
        ? `Some files were skipped: ${problems.join(', ')}.`
        : ''
    );

    if (toAdd.length === 0) return;

    onChange([
      ...value,
      ...toAdd.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    // Reset so that picking the same file again still fires onChange
    e.target.value = '';
  };

  // Without preventDefault in dragOver the browser ignores drop and opens the file
  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isFull) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isFull) addFiles(e.dataTransfer.files);
  };

  const handleRemove = (image: CardImage) => {
    // Every createObjectURL keeps the file in memory until it is revoked
    URL.revokeObjectURL(image.url);
    onChange(value.filter((item) => item.id !== image.id));
    setNotice('');
  };

  const dropHandlers = {
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  };

  const fullLabel =
    label && value.length > 0 ? `${label} (${value.length})` : label;

  return (
    <FormField label={fullLabel} error={error}>
      {(fieldProps) => (
        <div className={styles.body}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className={styles.hiddenInput}
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleFileSelect}
          />

          {value.length > 0 && (
            <ul className={styles.grid}>
              {value.map((image) => (
                <li key={image.id} className={styles.tile}>
                  <div className={styles.preview}>
                    <img src={image.url} alt={image.name} />
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(image)}
                      aria-label={`Remove ${image.name}`}
                    >
                      🗑
                    </button>
                  </div>
                  <span className={styles.name} title={image.name}>
                    {image.name}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!isFull && (
            <button
              type="button"
              id={fieldProps.id}
              className={[
                value.length === 0 ? styles.dropzone : styles.addMore,
                isDragging ? styles.dragging : '',
                fieldProps.hasError ? styles.fieldError : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={openFilePicker}
              onBlur={onBlur}
              aria-describedby={fieldProps['aria-describedby']}
              {...dropHandlers}
            >
              <span className={styles.icon} aria-hidden="true">
                ☁️
              </span>
              {value.length === 0 ? (
                <>
                  <span className={styles.text}>Drag & drop images here</span>
                  <span className={styles.browse}>or click to browse</span>
                </>
              ) : (
                <span className={styles.text}>
                  Drag & drop or{' '}
                  <span className={styles.browse}>click to add more</span>
                </span>
              )}
            </button>
          )}

          {notice && (
            <span className={styles.notice} role="status">
              {notice}
            </span>
          )}
        </div>
      )}
    </FormField>
  );
};
