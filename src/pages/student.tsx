import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { pathnames } from '@/constants/pathnames';
import { cn } from '@/lib/utils';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import LlamaAI from 'llamaai';
import { ArrowUp, Loader2, LogOut, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import Logo from '../assets/logo.svg';
import Book from '../assets/student/book.svg';
import Portrait from '../assets/student/portrait.png';

type Notion = {
  notion: string;
  validated: number;
  inProgress: number;
};

type Subject = {
  subject: string;
  notions: Notion[];
};

type Message = {
  role: 'student' | 'agent';
  content: string;
  date: Date;
};

const subjectsNotions: Subject[] = [
  {
    subject: 'Hist - Géo',
    notions: [
      { notion: 'Les civilisations anciennes', validated: 80, inProgress: 10 },
      { notion: 'La Révolution française', validated: 70, inProgress: 15 },
      { notion: 'Géographie des continents', validated: 60, inProgress: 20 },
      { notion: 'Cartographie', validated: 55, inProgress: 25 },
    ],
  },
  {
    subject: 'Français',
    notions: [
      { notion: 'Grammaire et conjugaison', validated: 85, inProgress: 5 },
      { notion: 'Analyse de texte', validated: 75, inProgress: 10 },
      { notion: 'Écriture créative', validated: 65, inProgress: 15 },
      { notion: 'Lecture et compréhension', validated: 55, inProgress: 20 },
    ],
  },
  {
    subject: 'Maths',
    notions: [
      { notion: 'Fractions', validated: 90, inProgress: 5 },
      { notion: 'Géométrie', validated: 80, inProgress: 10 },
      { notion: 'Nombres entiers', validated: 70, inProgress: 15 },
      { notion: 'Nombres décimaux', validated: 60, inProgress: 20 },
      { notion: 'Divisibilité', validated: 50, inProgress: 20 },
      { notion: 'Proportionnalités', validated: 40, inProgress: 25 },
      { notion: 'Unités de temps', validated: 30, inProgress: 20 },
    ],
  },
  {
    subject: 'Physique',
    notions: [
      { notion: 'Électricité et magnétisme', validated: 88, inProgress: 5 },
      { notion: 'Mécanique des fluides', validated: 78, inProgress: 10 },
      { notion: 'Optique', validated: 68, inProgress: 15 },
      { notion: 'Thermodynamique', validated: 58, inProgress: 20 },
    ],
  },
  {
    subject: 'Anglais',
    notions: [
      { notion: 'Grammaire anglaise', validated: 82, inProgress: 10 },
      { notion: 'Vocabulaire thématique', validated: 72, inProgress: 15 },
      { notion: 'Compréhension écrite', validated: 62, inProgress: 20 },
      { notion: 'Expression orale', validated: 52, inProgress: 20 },
    ],
  },
  {
    subject: 'Espagnol',
    notions: [
      { notion: 'Conjugaison des verbes', validated: 80, inProgress: 10 },
      { notion: 'Vocabulaire courant', validated: 70, inProgress: 15 },
      { notion: 'Compréhension auditive', validated: 60, inProgress: 20 },
      { notion: 'Expression écrite', validated: 50, inProgress: 15 },
    ],
  },
  {
    subject: 'SVT',
    notions: [
      { notion: 'Biologie cellulaire', validated: 85, inProgress: 5 },
      { notion: 'Écologie et environnement', validated: 75, inProgress: 10 },
      { notion: 'Anatomie humaine', validated: 65, inProgress: 15 },
      { notion: 'Évolution des espèces', validated: 55, inProgress: 10 },
    ],
  },
  {
    subject: 'Techno',
    notions: [
      { notion: 'Programmation de base', validated: 90, inProgress: 5 },
      { notion: 'Robotique éducative', validated: 80, inProgress: 10 },
      { notion: 'Design et innovation', validated: 70, inProgress: 15 },
      { notion: 'Sécurité informatique', validated: 60, inProgress: 20 },
    ],
  },
];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Student() {
  const categories = [
    { name: 'Ma progression', color: 'bg-[#F2C955]' },
    { name: 'Mes challenges', color: 'bg-[#F2C955]' },
    { name: 'Mes réussites', color: 'bg-[#F2C955]' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSubject, setSelectedSubject] = useState(
    subjectsNotions[0].subject
  );
  const [selectionNotion, setSelectionNotion] = useState(
    subjectsNotions[0].notions[0]
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [progressionExpanded, setProgressionExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadPage, setLoadPage] = useState(true);
  const [firstMessage, setFirstMessage] = useState('');

  const llamaAPI = new LlamaAI(
    'LA-110d98957e5441368e0c99a528efb8fc860af82643ec4f98aec8a55b7684ade8'
  );

  // When a message is sent, collapse the progression card (if messages exist)
  useEffect(() => {
    if (messages.length > 0) {
      setProgressionExpanded(false);
    }
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (message) {
      setLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'student',
          content: message,
          date: new Date(),
        },
      ]);
      setMessage('');
      const apiRequestJson = {
        messages: [
          {
            role: 'user',
            content: firstMessage,
          },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: 'user',
            content: !messages.length
              ? (() => {
                  const msg =
                    "réponds moi uniquement en français et dans un format très structuré qui me permettra de le parser en markdown, je m'appelle julien, je suis un élève de 4ème j'adore les lego, parle moi comme un élève de 4ème et j'aime apprendre lorsque c'est en rapport avec mon centre d'intéret, c'est simplement du contexte ne le precise jamais mais prends le en compte dans tes réponses " +
                    message;
                  setFirstMessage(msg);
                  return msg;
                })()
              : message,
          },
        ],
        stream: false,
      };

      llamaAPI
        .run(apiRequestJson)
        .then((res: any) => {
          console.log(res.choices[0].message.content);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'agent',
              content: res.choices[0].message.content,
              date: new Date(),
            },
          ]);
        })
        .catch((error: any) => {
          console.error('Erreur API :', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'agent',
              content: 'Erreur lors de la récupération de la réponse.',
              date: new Date(),
            },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [message]);

  const pieData = {
    labels: ['En cours', 'Validé', 'À faire'],
    datasets: [
      {
        data: [
          selectionNotion.inProgress,
          selectionNotion.validated,
          100 - selectionNotion.validated - selectionNotion.inProgress,
        ],
        backgroundColor: ['#E3C3EF', '#81F281', '#fff'],
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

  // When the selected subject changes, set the notion to the first in the list.
  useEffect(() => {
    const newNotion = subjectsNotions.find(
      (subjectNotion) => subjectNotion.subject === selectedSubject
    )?.notions[0];
    if (newNotion) {
      setSelectionNotion(newNotion);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (messages.length > 0 && progressionExpanded) {
      const chatContent = document.getElementById('chat-content');
      if (chatContent) {
        setTimeout(() => {
          chatContent.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 200);
      }
    }
  }, [messages, progressionExpanded]);

  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false);
    }, 600);
  }, []);

  if (loadPage) {
    return (
      // skeleton of 4 cards with nothing inside
      <main className='flex bg-[#FFF] flex-row items-center justify-start min-h-screen h-screen py-8 px-8 gap-8'>
        <nav className='h-full flex flex-col w-fit bg-[#DFC5ED] rounded-3xl px-4 justify-between items-center py-4'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <img
              src={Portrait}
              alt='avatar'
              className='h-12 w-12 rounded-full'
            />
            <div className='bg-[#EEEEEE] p-2 rounded-full h-12 w-12 flex items-center justify-center'>
              <img src={Book} alt='book' />
            </div>
          </div>
          <Link to={pathnames.login}>
            <LogOut size={24} className='text-white' />
          </Link>
        </nav>
        <section className='flex flex-col items-center justify-start w-full h-full gap-8'>
          <header className='flex flex-row items-center justify-between w-full'>
            <div className='border border-black rounded-full flex items-center justify-between gap-4 p-1'>
              <input
                placeholder='Rechercher un cours'
                className='ml-4 max-w-96 outline-none border-none'
              />
              <Button className='h-full rounded-full'>
                <Search size={24} className='text-white' />
              </Button>
            </div>
            <img src={Logo} alt='logo' className='h-8' />
          </header>
          <div className='grid grid-cols-7 gap-8 w-full h-full'>
            <div className='flex flex-col col-span-3 gap-4 h-full'>
              <Card className='w-full' style={{ height: '150px' }}>
                <CardHeader>
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                    Vue d'ensemble
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-wrap flex-row items-center justify-start gap-2 h-full'>
                  {[0, 1, 2].map((index) => (
                    <Skeleton key={index} className='w-24 h-8 rounded-full' />
                  ))}
                </CardContent>
              </Card>
              <Card className='w-full flex-1 overflow-hidden'>
                <CardHeader>
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81DFEF] rounded-full py-1 px-4'>
                    Tes cours
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4 h-full overflow-auto'>
                  <div className='flex flex-row flex-wrap gap-2'>
                    {[0, 1, 2].map((index) => (
                      <Skeleton key={index} className='w-24 h-8 rounded-full' />
                    ))}
                  </div>
                  <ul className='flex flex-col gap-2 w-full max-h-[270px] overflow-y-scroll pr-3'>
                    {[0, 1, 2, 3].map((index) => (
                      <li key={index}>
                        <Skeleton className='w-full h-8 rounded-full' />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className='flex flex-col col-span-4 gap-4 h-[90%]'>
              <Card className='w-full transition-all duration-300'>
                <CardHeader className='cursor-pointer flex flex-row gap-2'>
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                    Ma progression
                  </CardTitle>
                  <CardTitle className='w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4'>
                    {selectionNotion.notion}
                  </CardTitle>
                </CardHeader>
                <CardContent className='w-full flex flex-row items-center justify-start gap-2'>
                  <div className='w-[40%] flex flex-col items-center justify-center gap-4'>
                    <Skeleton className='w-48 h-48' />
                  </div>
                  <ul className='w-[60%] flex flex-col gap-2'>
                    {[0, 1, 2].map((index) => (
                      <li key={index}>
                        <Skeleton className='w-full h-8 rounded-full' />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='flex bg-[#FFF] flex-row items-center justify-start min-h-screen h-screen py-8 px-8 gap-8'>
      {/* Left Sidebar */}
      <nav className='h-full flex flex-col w-fit bg-[#DFC5ED] rounded-3xl px-4 justify-between items-center py-4'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <img src={Portrait} alt='avatar' className='h-12 w-12 rounded-full' />
          <div className='bg-[#EEEEEE] p-2 rounded-full h-12 w-12 flex items-center justify-center'>
            <img src={Book} alt='book' />
          </div>
        </div>
        <Link to={pathnames.login}>
          <LogOut size={24} className='text-white' />
        </Link>
      </nav>

      {/* Main Section */}
      <section className='flex flex-col items-center justify-start w-full h-full gap-8'>
        <header className='flex flex-row items-center justify-between w-full'>
          <div className='border border-black rounded-full flex items-center justify-between gap-4 p-1'>
            <input
              placeholder='Rechercher un cours'
              className='ml-4 max-w-96 outline-none border-none'
            />
            <Button className='h-full rounded-full'>
              <Search size={24} className='text-white' />
            </Button>
          </div>
          <img src={Logo} alt='logo' className='h-8' />
        </header>

        <div className='grid grid-cols-7 gap-8 w-full h-full'>
          {/* Left Column: Vue d’ensemble & Tes cours */}
          <div className='flex flex-col col-span-3 gap-4 h-full'>
            {/* Vue d’ensemble: Fixed height */}
            <Card className='w-full' style={{ height: '150px' }}>
              <CardHeader>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                  Vue d'ensemble
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap flex-row items-center justify-start gap-2 h-full'>
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    className={cn(
                      'w-fit text-xs font-semibold',
                      selectedCategory === category.name
                        ? `${category.color} hover:${category.color}`
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

            {/* Tes cours: Take remaining vertical space */}
            <Card className='w-full flex-1 overflow-hidden'>
              <CardHeader>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81DFEF] rounded-full py-1 px-4'>
                  Tes cours
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-4 h-full overflow-auto'>
                <div className='flex flex-row flex-wrap gap-2'>
                  {subjectsNotions.map((subjectNotion, index) => (
                    <Button
                      key={index}
                      className={cn(
                        'w-fit text-xs font-semibold',
                        selectedSubject === subjectNotion.subject
                          ? 'bg-[#E3C3EF] hover:bg-[#E3C3EF]'
                          : ''
                      )}
                      variant='outline'
                      onClick={() => setSelectedSubject(subjectNotion.subject)}
                    >
                      {subjectNotion.subject}
                    </Button>
                  ))}
                </div>
                {/* Notions */}
                <ul className='flex flex-col gap-2 w-full max-h-[270px] overflow-y-scroll pr-3'>
                  {subjectsNotions
                    .find(
                      (subjectNotion) =>
                        subjectNotion.subject === selectedSubject
                    )
                    ?.notions.map((notion, index) => (
                      <li key={index}>
                        <Button
                          className={cn(
                            'w-full px-3 py-1 text-xs font-semibold text-left',
                            selectionNotion.notion === notion.notion
                              ? 'bg-[#F2C955] hover:bg-[#F2C955]'
                              : ''
                          )}
                          variant='outline'
                          onClick={() => setSelectionNotion(notion)}
                        >
                          {notion.notion}
                        </Button>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Chat & Progression */}
          <div className='flex flex-col col-span-4 gap-4 h-[90%]'>
            {/* Chat Card */}
            <Card
              className={cn(
                'w-full flex flex-col transition-all duration-300',
                messages.length > 0 && !progressionExpanded
                  ? 'flex-1 '
                  : 'h-36',
                progressionExpanded ? '' : 'max-h-[550px]'
              )}
            >
              <CardHeader className='w-full flex flex-row gap-2 justify-start'>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81DFEF] rounded-full py-1 px-4'>
                  De quoi as-tu besoin aujourd'hui ?
                </CardTitle>
              </CardHeader>
              {messages.length > 0 && !progressionExpanded && (
                <CardContent
                  className='w-full h-full overflow-y-scroll flex flex-col gap-2 mr-3'
                  id='chat-content'
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'p-2 rounded-lg max-w-[70%] text-sm',
                        msg.role === 'agent'
                          ? 'bg-gray-200 self-start'
                          : 'bg-blue-200 self-end'
                      )}
                    >
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  ))}
                </CardContent>
              )}
              <CardFooter className='w-full'>
                <div className='w-full rounded-full border border-black flex items-center justify-between gap-4 p-1'>
                  <input
                    placeholder='Écris ton message ici'
                    className='ml-4 w-full outline-none border-none resize-none h-fit'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button className='h-full rounded-full' onClick={sendMessage}>
                    {!loading ? (
                      <ArrowUp size={24} className='text-white' />
                    ) : (
                      <Loader2 size={24} className='animate-spin' />
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Progression Card */}
            <Card className='w-full transition-all duration-300'>
              <CardHeader
                onClick={() => {
                  if (messages.length > 0) {
                    setProgressionExpanded((prev) => !prev);
                  }
                }}
                className='cursor-pointer flex flex-row gap-2'
              >
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4'>
                  Ma progression
                </CardTitle>
                <CardTitle className='w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4'>
                  {selectionNotion.notion}
                </CardTitle>
              </CardHeader>
              {(messages.length === 0 || progressionExpanded) && (
                <CardContent className='w-full flex flex-row items-center justify-start gap-2'>
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
                  </ul>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
