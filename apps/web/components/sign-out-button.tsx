import { signOut } from "@/app/login/actions";

export function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <form action={signOut}>
      <button type="submit" className={`text-sm font-medium text-[#aeb9b1] underline underline-offset-4 decoration-[#64716a] transition-colors hover:text-white focus-visible:text-white ${className}`}>
        Sign out
      </button>
    </form>
  );
}
