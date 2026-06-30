import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFBFC]">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-md rounded-xl border border-[#E5E7EB]",
            headerTitle: "text-[#111827] text-xl font-semibold",
            headerSubtitle: "text-[#6B7280] text-sm",
            socialButtonsBlockButton:
              "border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium h-11",
            formButtonPrimary:
              "bg-[#059669] hover:bg-[#10B981] text-white rounded-lg text-sm font-medium h-11 shadow-none",
            footerActionLink: "text-[#059669] hover:text-[#10B981]",
            formFieldInput:
              "rounded-lg border-[#E5E7EB] text-sm h-11 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]",
            dividerLine: "bg-[#E5E7EB]",
            dividerText: "text-[#6B7280] text-xs",
          },
        }}
      />
    </div>
  );
}
