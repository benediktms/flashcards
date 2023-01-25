import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState, type PropsWithChildren } from 'react';
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
} from '@/components/Menubar';

type Props = PropsWithChildren & {
  userName: string;
};

export const MenuLayout: React.FC<Props> = ({ children, userName }) => {
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
    <div>
      <div className="flex items-center justify-between">
        <div className="ml-3">Hello {userName}</div>
        <Menubar className="m-2">
          <MenubarMenu>
            <MenubarTrigger>Cards</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Create Card</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Create Set</MenubarItem>
              <MenubarItem>See All Sets</MenubarItem>
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
                    {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>Report An Issue</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => void signOut()}>Sign Out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {children}
    </div>
  );
};
