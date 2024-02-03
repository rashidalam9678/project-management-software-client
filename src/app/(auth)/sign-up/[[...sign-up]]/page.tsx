import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const initial={
    firstName:"Mohd"
  }
  return (
    <div className="flex justify-center py-24">
      <SignUp initialValues={initial}  redirectUrl="/dashboard" />
    </div>
  );
}


// function create(params: SignUpCreateParams): Promise<SignUpResource>;