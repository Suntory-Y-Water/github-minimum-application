import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-20 h-[64px] border-b bg-background backdrop-blur'>
      <div className='mx-auto flex h-full max-w-[1024px] items-center justify-center px-4'>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <h1>GitHub Minimum Client Application!</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
