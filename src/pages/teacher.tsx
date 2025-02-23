import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { pathnames } from '@/constants/pathnames';
import { cn } from '@/lib/utils';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { ArrowUp, LogOut, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router';
import Logo from '../assets/logo.svg';
import Book from '../assets/student/book.svg';
import Profile from '../assets/teacher/teacher.svg';

type Notion = {
  notion: string;
  validated: number;
  inProgress: number;
  failed?: number;
  secondInProgress?: number;
};

const notions: Notion[] = [
  {
    notion: 'Fractions',
    validated: 80,
    inProgress: 5,
    failed: 5,
    secondInProgress: 5,
  },
  { notion: 'Géométrie', validated: 80, inProgress: 10 },
  { notion: 'Nombres entiers', validated: 70, inProgress: 15 },
];

export default function Teacher() {
  const categories = [
    { name: '6ème A', color: 'bg-[#F2C955]' },
    { name: '6ème B', color: 'bg-[#E3C3EF]' },
    { name: '6ème C', color: 'bg-[#81DFEF]' },
  ];

  const firstNames = [
    'Lucas',
    'Emma',
    'Nathan',
    'Léa',
    'Mathis',
    'Sophie',
    'Hugo',
    'Jade',
    'Noah',
    'Chloé',
  ];
  const lastNames = [
    'Morel',
    'Fontaine',
    'Caron',
    'Dumont',
    'Laurent',
    'Dubois',
    'Girard',
    'Martinez',
    'Bertrand',
  ];

  const getRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomNames = () => {
    const count = Math.floor(Math.random() * 6) + 3; // between 3 and 8
    const arr = Array.from({ length: count }, getRandomName);
    arr.push('Julien Lemoine');
    return arr;
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [namesList, setNamesList] = useState(generateRandomNames());
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(
    `${namesList[0]}`
  );
  const [selectedStudentName, setSelectedStudentName] = useState(namesList[0]);
  const [selectedClassIndex, setSelectedClassIndex] =
    useState('button-matiere-0');
  const [, setSelectedClassName] = useState('');
  const [selectedNotion, setSelectedNotion] = useState(notions[0]);
  const [loadPage, setLoadPage] = useState(true);

  useEffect(() => {
    const randomNames = generateRandomNames();
    setNamesList(randomNames);
    setSelectedStudentIndex(`${randomNames[0]}-0`);
    setSelectedStudentName(randomNames[0]);

    // Scroll to top of the names list
    const nameScroll = document.getElementById('name-scroll');
    if (nameScroll) {
      setTimeout(() => {
        nameScroll.scrollIntoView({ block: 'start' });
      }, 100);
    }
  }, [selectedCategory]);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false);
    }, 500);
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const pieData = {
    labels: [
      'En cours',
      'Validé',
      ...(selectedNotion.failed ? ['Difficulté'] : []),
      ...(selectedNotion.secondInProgress ? ['En cours'] : []),
      'À faire',
    ],
    datasets: [
      {
        data: [
          selectedNotion.validated,
          selectedNotion.inProgress,
          ...(selectedNotion.failed ? [selectedNotion.failed] : []),
          ...(selectedNotion.secondInProgress
            ? [selectedNotion.secondInProgress]
            : []),
          100 - selectedNotion.validated - selectedNotion.inProgress,
        ],
        backgroundColor: [
          '#81F281',
          '#E3C3EF',
          ...(selectedNotion.failed ? ['#F47474'] : []),
          ...(selectedNotion.secondInProgress ? ['#E3C3EF'] : []),
          '#FFF',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    borderWidth: 2,
    borderColor: ['#000', '#000', '#000'],
    cutout: '70%',
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  };

  return (
    <main className='flex bg-[#EEEEEE] flex-row items-center justify-start min-h-screen h-screen py-8 px-8 gap-8'>
      {/* Sidebar */}
      <nav className='h-full flex flex-col w-fit bg-[#81DFEF] rounded-3xl px-4 justify-between items-center py-4'>
        <div className='flex flex-col items-center justify-center gap-4'>
          {loadPage ? (
            <Skeleton className='h-12 w-12 rounded-full' />
          ) : (
            <img
              src={Profile}
              alt='avatar'
              className='h-12 w-12 rounded-full'
            />
          )}
          <div className='bg-[#EEEEEE] p-2 rounded-full h-12 w-12 flex items-center justify-center'>
            {loadPage ? (
              <Skeleton className='h-8 w-8' />
            ) : (
              <img src={Book} alt='book' />
            )}
          </div>
        </div>
        <Link to={pathnames.login}>
          {loadPage ? (
            <Skeleton className='h-6 w-6 rounded' />
          ) : (
            <LogOut size={24} className='text-white' />
          )}
        </Link>
      </nav>

      {/* Main Section */}
      <section className='flex flex-col items-center justify-start w-full h-full gap-8'>
        <header className='flex flex-row items-center justify-between w-full'>
          <div className='border-black border rounded-full flex items-center justify-between gap-4 p-1'>
            {loadPage ? (
              <Skeleton className='w-64 h-8 rounded-full' />
            ) : (
              <>
                <input
                  placeholder='Rechercher un cours'
                  className='ml-4 max-w-96 outline-none border-none'
                />
                <Button className='h-full rounded-full'>
                  <Search size={24} className='text-white' />
                </Button>
              </>
            )}
          </div>
          {loadPage ? (
            <Skeleton className='w-16 h-8' />
          ) : (
            <img src={Logo} alt='logo' className='h-8' />
          )}
        </header>

        <div className='grid grid-cols-7 gap-8 w-full'>
          {/* Left Column */}
          <div className='flex col-span-3 flex-col items-center justify-center max-w-[468px] gap-4'>
            {/* Vue d'ensemble */}
            <Card className='w-full'>
              <CardHeader>
                {loadPage ? (
                  <Skeleton className='w-40 h-6' />
                ) : (
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                    Vue d'ensemble
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent className='flex flex-wrap flex-row items-center gap-2'>
                {loadPage
                  ? [1, 2, 3].map((i) => (
                      <Skeleton key={i} className='w-20 h-6' />
                    ))
                  : categories.map((category) => (
                      <Button
                        key={category.name}
                        className={cn(
                          'w-fit text-s font-semibold',
                          selectedCategory === category.name
                            ? 'bg-[#F2C955] hover:bg-[#F2C955]'
                            : ''
                        )}
                        variant='outline'
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </Button>
                    ))}
              </CardContent>
            </Card>
            {/* Liste des étudiants */}
            <Card className='w-full max-h-[250px]'>
              <CardHeader>
                {loadPage ? (
                  <Skeleton className='w-32 h-6 rounded-full' />
                ) : (
                  <CardTitle className='w-fit text-lg font-semibold text-center rounded-full py-1 px-4 bg-[#F2C955]'>
                    {selectedCategory}
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent className='max-h-[180px] overflow-y-auto'>
                <div
                  className='w-full flex flex-col items-center justify-between gap-2 h-full pr-3'
                  id='name-scroll'
                >
                  {loadPage
                    ? [1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className='w-full h-8 rounded' />
                      ))
                    : namesList.map((name, index) => (
                        <Button
                          key={`${name}-${index}`}
                          className={cn(
                            'w-full text-s font-semibold justify-start',
                            selectedStudentIndex === `${name}-${index}`
                              ? 'bg-[#E3C3EF] hover:bg-[#E3C3EF]'
                              : 'bg-[#fff]'
                          )}
                          variant='outline'
                          onClick={() => {
                            setSelectedStudentIndex(`${name}-${index}`);
                            setSelectedStudentName(name);
                          }}
                        >
                          {name}
                        </Button>
                      ))}
                </div>
              </CardContent>
            </Card>
            {/* Choix du chapitre de la matière */}
            {selectedStudentName && (
              <Card className='w-full'>
                <CardHeader>
                  {loadPage ? (
                    <Skeleton className='w-40 h-6' />
                  ) : (
                    <CardTitle className='w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4'>
                      Mathématiques
                    </CardTitle>
                  )}
                </CardHeader>
                <CardContent className='flex flex-col items-center gap-2 w-full'>
                  {loadPage
                    ? [1, 2, 3].map((i) => (
                        <Skeleton key={i} className='w-full h-8 rounded' />
                      ))
                    : notions.map((notion, index) => (
                        <Button
                          key={`button-matiere-${index}`}
                          className={cn(
                            'w-full text-s font-semibold justify-start',
                            selectedClassIndex === `button-matiere-${index}`
                              ? 'bg-[#81F281] hover:bg-[#81F281]'
                              : 'bg-[#F8F8F8]'
                          )}
                          variant='outline'
                          onClick={() => {
                            setSelectedClassIndex(`button-matiere-${index}`);
                            setSelectedClassName(notion.notion);
                            setSelectedNotion(notion);
                          }}
                        >
                          {notion.notion}
                        </Button>
                      ))}
                </CardContent>
              </Card>
            )}
          </div>
          {/* Right Column: Chat & Progression */}
          <div className='flex flex-col col-span-4 gap-4 h-[90%]'>
            {/* Chat Card */}
            <Card className='w-full flex flex-col transition-all duration-300 h-36'>
              <CardHeader className='w-full flex flex-row gap-2 justify-start'>
                {loadPage ? (
                  <Skeleton className='w-40 h-6' />
                ) : (
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81DFEF] rounded-full py-1 px-4'>
                    De quoi as-tu besoin aujourd'hui ?
                  </CardTitle>
                )}
              </CardHeader>
              <CardFooter className='w-full'>
                {loadPage ? (
                  <Skeleton className='w-full h-10 rounded-full' />
                ) : (
                  <div className='w-full rounded-full border border-black flex items-center justify-between gap-4 p-1'>
                    <input
                      placeholder='Écris ton message ici'
                      className='ml-4 w-full outline-none border-none resize-none h-fit'
                      value={''}
                    />
                    <Button className='h-full rounded-full'>
                      <ArrowUp size={24} className='text-white' />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
            {/* Progression Card */}
            <Card className='w-full transition-all duration-300 h-full'>
              <CardHeader className='cursor-pointer flex flex-row gap-2'>
                {loadPage ? (
                  <>
                    <Skeleton className='w-32 h-6' />
                    <Skeleton className='w-32 h-6' />
                  </>
                ) : (
                  <>
                    <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                      {selectedStudentName}
                    </CardTitle>
                    <CardTitle className='w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4'>
                      Mathématiques
                    </CardTitle>
                  </>
                )}
              </CardHeader>
              <CardContent className='w-full flex flex-row items-center justify-center h-full gap-2'>
                {loadPage ? (
                  <>
                    <Skeleton className='w-[40%] h-40' />
                    <div className='w-[60%] space-y-2'>
                      <Skeleton className='w-full h-8 rounded-full' />
                      <Skeleton className='w-full h-8 rounded-full' />
                      <Skeleton className='w-full h-8 rounded-full' />
                      <Skeleton className='w-full h-8 rounded-full' />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-[40%] flex flex-col items-center justify-center gap-4'>
                      <Doughnut data={pieData} options={pieOptions} />
                    </div>
                    <ul className='w-[60%] flex flex-col gap-2'>
                      <li className='w-full flex flex-row items-center uppercase px-4 py-1 text-lg font-semibold rounded-full border border-black bg-[#E3C3EF]'>
                        en cours
                      </li>
                      <li className='w-full flex flex-row items-center uppercase px-4 py-1 text-lg font-semibold rounded-full border border-black bg-[#81F281]'>
                        validé
                      </li>
                      <li className='w-full flex flex-row items-center uppercase px-4 py-1 text-lg font-semibold rounded-full border border-black bg-[#FFF]'>
                        à faire
                      </li>
                      <li className='w-full flex flex-row items-center uppercase px-4 py-1 text-lg font-semibold rounded-full border border-black bg-[#F47474]'>
                        difficultés rencontrées
                      </li>
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
