import Head from "next/head";
import  styles  from "./style.module.css";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";

export default function Task() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Detalhes da tarefa</title>
        </Head>
  
        <main className={styles.main}>
          <h1>Tarefa</h1>
        </main>
      </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const id = params?.id as string;
    
    const docRef = doc(db, "tarefas", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.data() === undefined || !snapshot.data()?.public) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,
    };
   
    return {
        props: {},
      };
}

