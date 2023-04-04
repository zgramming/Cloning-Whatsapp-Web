import Head from 'next/head';
import ChatContainer from '@/components/ChatContainer';
import NavHeader from '@/components/NavHeader';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloning Whatsapp Web</title>
        <meta name="description" content="Cloning Whatsapp Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen w-screen">
        <NavHeader />
        <ChatContainer />
      </div>
    </>
  );
}
