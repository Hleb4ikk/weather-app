import { validateInput } from '../../shared/validation';
import styles from './AdminPage.module.css';
import { useState } from 'react';
import { uploadMeme } from '../../api/memesApi';
import { LoaderCircle } from 'lucide-react';
const categories = [
  { value: 'freezing', label: 'Меньше -15°C' },
  { value: 'cold', label: 'От -15 до 0°C' },
  { value: 'zero', label: 'Ровно 0°C' },
  { value: 'mild', label: 'От 1 до 22°C' },
  { value: 'warm', label: 'От 23 до 35°C' },
  { value: 'hot', label: 'Больше 35°C' },
];

export default function AdminPage() {
  const [pending, setPending] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('mild');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const text = formData.get('jokeText')?.toString().trim();

    const message = validateInput(text);
    setStatus(message ? { isError: true, message } : null);

    if (text) {
      setPending(true);
      try {
        const response = await uploadMeme(text, selectedCategory);
        switch (response.code) {
          case 201:
            setStatus({ isError: false, message: response.message });
            form.reset();
            setSelectedCategory('mild');
            break;
          default:
            setStatus({ isError: true, message: response.message });
            break;
        }
      } catch (err) {
        console.log(err);
        setStatus({
          isError: true,
          message: 'Ошибка при загрузке шутки.',
        });
      }
    }
    setPending(false);
  }

  return (
    <div className={styles.formContainer}>
      <h2>Добавить шутку</h2>
      <form
        className={styles.submitForm}
        onSubmit={onSubmit}
      >
        <textarea
          className={styles.jokeArea}
          placeholder="Введите текст шутки..."
          id="jokeText"
          name="jokeText"
        />
        <select
          className={styles.selectCategory}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
            >
              {cat.label}
            </option>
          ))}
        </select>
        {status && <p className={`${status.isError ? styles.errorMessage : ''}`}>{status.message}</p>}
        <div className={styles.submitButtonContainer}>
          <button
            className={`${styles.submitButton} ${pending ? styles.pendingSubmitButton : ''}`}
            type="submit"
          >
            {pending ? (
              <>
                <LoaderCircle
                  size={20}
                  className={styles.loader}
                />
                Загрузка...
              </>
            ) : (
              'Загрузить'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
