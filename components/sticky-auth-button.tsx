import AuthButton from './auth-button';

export default function StickyAuthButton() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <AuthButton />
    </div>
  );
} 