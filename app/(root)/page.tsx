import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>DevEase</h1>
      <div className="mt-5 flex items-center justify-center gap-4">
        {!session && (
          <>
            <Link href="/sign-in">
              <Button>Sign-In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign-Up</Button>
            </Link>
          </>
        )}
        {session && (
          <form
            className="px-10 pt-[100px]"
            action={async () => {
              "use server";

              await signOut({ redirectTo: ROUTES.SIGN_IN });
            }}
          >
            <Button type="submit">Log out</Button>
          </form>
        )}
      </div>
    </div>
  );
}
