import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#FAFBFC] font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 py-32 px-16">
        <h1 className="text-3xl font-bold text-[#111827]">SynapCode</h1>
        <p className="text-lg text-[#6B7280]">
          Học code với English — AI-powered learning platform
        </p>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="rounded-lg bg-[#059669] px-6 py-3 text-sm font-medium text-white hover:bg-[#10B981] transition-colors">
              Sign In with Google / GitHub
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className="flex items-center gap-4">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-10",
                },
              }}
            />
            <p className="text-[#6B7280] text-sm">
              You are signed in — start learning!
            </p>
          </div>
        </Show>
      </main>
    </div>
  );
}
