import { getSession } from "next-auth/react";

export const requireAuth = async (context: any, destination: string) => {
  const session = await getSession(context);
   
  if (!session?.user) {
    return {
      redirect: {
        destination: destination,
        permanent: false,
      },
    };
  }

  return {
    props: { 
      user: {
        email: session?.user?.email,
      }, 
    },
  };
};
