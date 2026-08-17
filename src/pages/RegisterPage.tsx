import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

function getRegistrationError(message: string) {
  if (message.includes('already registered')) return 'Аккаунт с такой почтой уже существует.';
  if (message.includes('valid email')) return 'Проверь, правильно ли написана почта.';
  if (message.includes('Password')) return 'Пароль должен содержать минимум 6 символов.';
  return 'Не получилось создать аккаунт. Попробуй ещё раз.';
}

export function RegisterPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function registerWithGoogle() {
    setMessage('');

    if (!isSupabaseConfigured) {
      setMessage('Сначала подключи Supabase в файле .env.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/game` },
      });

      if (error) {
        setMessage('Не получилось войти через Google. Попробуй ещё раз.');
        setIsSubmitting(false);
      }
    } catch {
      setMessage('Нет соединения с сервером. Проверь интернет и попробуй ещё раз.');
      setIsSubmitting(false);
    }
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!isSupabaseConfigured) {
      setMessage('Сначала подключи Supabase в файле .env.');
      return;
    }

    if (nickname.trim().length < 2) {
      setMessage('Никнейм должен содержать минимум 2 символа.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { nickname: nickname.trim() },
          emailRedirectTo: `${window.location.origin}/game`,
        },
      });

      if (error) {
        setIsSuccess(false);
        setMessage(getRegistrationError(error.message));
        return;
      }

      setIsSuccess(true);
      setMessage('Аккаунт создан! Проверь почту и подтверди регистрацию.');
    } catch {
      setIsSuccess(false);
      setMessage('Нет соединения с сервером. Проверь интернет и попробуй ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <Link className="register-brand" href="/" aria-label="Вернуться на главную">YC</Link>
        <p className="eyebrow">НОВОЕ ПРИКЛЮЧЕНИЕ</p>
        <h1>Создай аккаунт</h1>
        <p className="register-intro">Сохраняй прогресс и заботься о своём питомце каждый день.</p>

        <GoogleAuthButton disabled={isSubmitting} onClick={registerWithGoogle} />

        <div className="register-divider"><span>или по почте</span></div>

        <form className="register-form" onSubmit={register}>
          <label>
            Никнейм
            <input
              autoComplete="nickname"
              maxLength={24}
              minLength={2}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Например, SunnyCat"
              required
              value={nickname}
            />
          </label>
          <label>
            Почта
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Пароль
            <input
              autoComplete="new-password"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Минимум 6 символов"
              required
              type="password"
              value={password}
            />
          </label>
          <button className="primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
          </button>
        </form>

        {message && <p className={isSuccess ? 'register-message success' : 'register-message error'}>{message}</p>}
        <p className="register-back"><Link href="/">← Вернуться на главную</Link></p>
      </section>
    </main>
  );
}
