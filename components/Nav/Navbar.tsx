"use client";
"use client";
import React from "react";
import { Menu, X, User, Settings, LogOut, Sword } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import WalletConnection from "./WalletConnection";
import Image from "next/image";

const ModernMedievalNavbar = () => {
  const [isSidenavOpen, setIsSidenavOpen] = React.useState(false);

  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  const menuItems = ["Home", "Marketplace", "Inventory", "Quests"];

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg border border-amber-300">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div
                  style={{
                    fontFamily: "'MedievalSharp', cursive",
                    color: "#FFD700",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  }}
                  className="flex items-center justify-center gap-4 font-bold text-3xl"
                >
                  <Sword className="h-10 w-10  text-yellow-400 rotate-90" />
                  THYNFT
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {menuItems.map((item) => (
                      <a
                        style={{
                          fontFamily: "'MedievalSharp', cursive",
                          color: "#FFD700",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                        }}
                        key={item}
                        href="#"
                        className="hover:bg-amber-500 hover:text-indigo-900 px-3 py-2 rounded-md  font-mono font-bold text-base font-medieval transition-colors duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="md:hidden lg:block">
                  <WalletConnection />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/avatar.png"
                          className="object-cover"
                          alt="User"
                        />
                        <AvatarFallback>
                          <Image
                            src={"/avatar.png"}
                            alt=""
                            width={1920}
                            height={1080}
                            className="max-w-20 object-cover max-h-20"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 mt-6" align="end" forceMount>
                    <div className="grid gap-4">
                      <div className="font-medieval">
                        <h4 className="font-medium leading-none">John Doe</h4>
                        <p className="text-sm text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="md:block lg:hidden">
                          <WalletConnection />
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medieval"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medieval"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medieval"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="md:hidden flex flex-row items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidenav}
                  className="text-amber-600 hover:text-amber-900 hover:bg-amber-100"
                >
                  <span className="sr-only">Open main menu</span>
                  {isSidenavOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidenav overlay */}
      {isSidenavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidenav}
        ></div>
      )}

      {/* Mobile sidenav */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-gradient-to-bl from-amber-400 to-amber-600 shadow-xl transform ${
          isSidenavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex items-center justify-between p-4 bg-amber-500">
          <Sword className="h-8 w-8 text-amber-600" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidenav}
            className="text-amber-600 hover:text-amber-900"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div
          style={{
            fontFamily: "'MedievalSharp', cursive",
            color: "#FFD700",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
          className="flex-grow px-2 py-4"
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2 font-medieval  rounded-md"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="p-4 border-t border-amber-300">
          <WalletConnection />
        </div>
        <div className="p-4 border-t border-amber-300">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback>
                {" "}
                <Image
                  src={"/avatar.png"}
                  alt=""
                  width={1920}
                  height={1080}
                  className="max-w-20 object-cover max-h-20"
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-white font-medieval">
                John Doe
              </p>
              <p className="text-xs font-medium text-white font-medieval">
                john@example.com
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start font-medieval"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medieval"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medieval"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernMedievalNavbar;
