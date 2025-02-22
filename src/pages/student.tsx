import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import Logo from '../assets/logo.svg';
import Book from '../assets/student/book.svg';

export default function Student() {
  const categories = [
    {
      name: 'Ma progression',
      color: 'bg-[#F2C955]',
    },
    {
      name: 'Mes challenges',
      color: 'bg-[#F2C955]',
    },
    {
      name: 'Mes réussites',
      color: 'bg-[#F2C955]',
    },
  ];

  const classes = [
    {
      ""
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  return (
    <main className='flex bg-[#EEEEEE] flex-row items-center justify-start min-h-screen h-screen py-8 px-8 gap-8'>
      <nav className='h-full flex flex-col w-fit bg-[#DFC5ED] rounded-3xl px-4 justify-between items-center py-4'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <img
            src={faker.image.avatar()}
            alt='avatar'
            className='h-12 w-12 rounded-full'
          />
          <div className='bg-[#EEEEEE] p-2 rounded-full h-12 w-12 justify-center flex items-center'>
            <img src={Book} alt='book' className='' />
          </div>
        </div>

        <LogOut size={24} className='text-white' />
      </nav>
      <section className='flex flex-col items-center justify-start w-full h-full gap-8'>
        <header className=' flex flex-row items-center justify-between w-full'>
          <div className='border-black border rounded-full flex items-center justify-between gap-4 p-1'>
            <input
              placeholder='Rechercher un cours'
              className='ml-4 max-w-96 outline-none border-none'
            />
            <Button className='h-full rounded-full '>
              <Search size={24} className='text-white' />
            </Button>
          </div>

          <img src={Logo} alt='logo' className='h-8' />
        </header>
        <div className='grid grid-cols-7 gap-8 w-full'>
          <div className='flex col-span-3 flex-col items-center justify-center max-w-[468px] gap-4'>
            {/* Vue d'ensemble */}
            <Card className='w-full'>
              <CardHeader>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                  Vue d'ensemble
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap flex-row items-center justify-between gap-2'>
                {categories.map((category, index) => {
                  return (
                    <Button
                      className={cn(
                        'w-fit text-xs font-semibold ',
                        selectedCategory === category.name ? category.color : ''
                      )}
                      variant={
                        'outline'
                      }
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
            {/* Tes cours */}
            <Card
              className='w-full'
            >
              <CardHeader>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81DFEF] rounded-full py-1 px-4'>
                  Tes cours
                </CardTitle>
              </CardHeader>

            </Card>
          </div>
          <div></div>
        </div>
      </section>
    </main>
  );
}
