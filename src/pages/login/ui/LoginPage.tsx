// pages/LoginPage.tsx — ВРЕМЕННАЯ проверка (удалить после ревью)
import { TextField, Button } from '@/shared/ui';

export const LoginPage = () => {
  return (
    <div
      style={{
        padding: 24,
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <h2>UI Components Check</h2>

      {/* --- TextField: пустое поле --- */}
      <TextField placeholder="Email" />
      <TextField placeholder="Password" type="password" />

      {/* --- TextField: с ошибкой --- */}
      <TextField
        placeholder="Email"
        value="wrong-email"
        onChange={() => {}}
        error="Please enter a valid email address"
      />
      <TextField
        placeholder="Password"
        type="password"
        value="123"
        onChange={() => {}}
        error="Password must be at least 6 characters"
      />

      {/* --- TextField: с иконкой --- */}
      <TextField
        placeholder="Email with icon"
        icon={<span style={{ fontSize: 16 }}>✉️</span>}
      />

      {/* --- TextField: с иконкой + ошибка --- */}
      <TextField
        placeholder="Email with icon"
        icon={<span style={{ fontSize: 16 }}>✉️</span>}
        value="bad"
        onChange={() => {}}
        error="Please enter a valid email address"
      />

      {/* --- BUTTON: primary --- */}
      <Button>Sign In</Button>

      {/* --- BUTTON: secondary --- */}
      <Button variant="secondary">Cancel</Button>

      {/* --- BUTTON: loading (primary) --- */}
      <Button isLoading>Sign In</Button>

      {/* --- BUTTON: loading (secondary) --- */}
      <Button variant="secondary" isLoading>
        Cancel
      </Button>

      {/* --- BUTTON: disabled --- */}
      <Button disabled>Disabled</Button>
    </div>
  );
};
