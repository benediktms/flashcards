import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/Primitives/Menubar';

type Props = PropsWithChildren & {
  userName?: string;
  image?: string;
};

export const MenuLayout: React.FC<Props> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Head>
        <title>Flashcards</title>
      </Head>
      <div>
        <div className="flex items-center justify-end sm:justify-between">
          <div className="ml-3 hidden sm:block">
            <h2>Flashcards</h2>
          </div>
          <div className="hidden sm:block">
            <Menubar className="m-2">
              <MenubarMenu>
                <MenubarTrigger>Cards</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Create flashcard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Create Set</MenubarItem>
                  <MenubarItem>See All Sets</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Lessons</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Upcoming</MenubarItem>
                  <MenubarItem>Previous</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Lesson Sets</MenubarItem>
                  <MenubarItem>Schedule Lesson</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Account</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Security</MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger>Settings</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleToggleTheme}>
                        <p className="mr-3">Switch Theme</p>
                        {theme === 'light' ? (
                          <BsFillMoonFill />
                        ) : (
                          <BsFillSunFill />
                        )}
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>Report An Issue</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => void signOut()}>
                    Sign Out
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="sm:hidden">
            <div className="mt-4 mr-5 text-[2rem] hover:cursor-pointer">
              <BiDotsVerticalRounded />
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
