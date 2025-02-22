import { buttonVariants } from '@/components/ui/button';
import { pathnames } from '@/constants/pathnames';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import Man from "../assets/home/man.svg";
import Title from '../assets/home/title.svg';
import Woman from "../assets/home/woman.svg";
import Cross from '../assets/home/x.svg';

function Home() {
  return (
    <div className='relative flex justify-center items-center h-screen w-full flex-col px-20'>
      <img src={Title} alt='title' className='w-full ' />
      <div className='flex flex-col items-center gap-12 pt-16'>
        <Link
          className={cn(
            
            buttonVariants({ variant: 'outline' },),'text-2xl font-medium !py-6 border-black border-2 px-8'
          )}
          to={pathnames.login}
        >
          Accéder à votre portail
        </Link>
        <p className=''>Scola sera là pour vous accompagner, du début à la fin.</p>
        <img src={Cross} alt='cross' className='' />
      </div>
      <img src={Woman} alt="woman" className="absolute left-0 top-[65%] w-[200px] transform  -translate-y-1/2" />
      <img src={Man} alt="man" className="absolute right-0 top-[70%] w-[220px] transform  -translate-y-1/2" />
    </div>
  );
}

export default Home;
