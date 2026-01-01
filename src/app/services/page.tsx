"use client";
import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CountUp from "@/app/services/CountUp";
import { details } from "@/data/details";
import { services } from "@/data/services";
import { motion } from "framer-motion";

const ServicesPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [activeSection, setActiveSection] =
    useState<keyof typeof details>("internship");

  return (
    <div className="h-screen overflow-hidden md:overflow-visible items-center flex flex-col md:justify-center w-full max-w-4xl mx-auto md:gap-6 gap-20 pt-40 md:pt-0">
      <div>
        <motion.h1
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 3,
            delay: 1,
            type: "spring",
            stiffness: 100,
            damping: 5,
            mass: 1,
          }}
          className="text-4xl font-bold md:mt-20 dark:text-white text-gray-800"
        >
          How do I help?
        </motion.h1>
      </div>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex flex-col md:flex-row md:justify-between md:gap-16 gap-6"
      >
        <div className="flex items-center md:items-start flex-col gap-2">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col gap-2 aspect-square p-6 dark:border-none border border-gray-300 rounded-xl dark:bg-[radial-gradient(circle_at_top,#1e1e1e,#000000)]">
                        <div>
                          <img
                            src={service.img}
                            alt={`Image ${index}`}
                            className="w-15 h-15"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <h1 className="font-bold text-xl dark:text-white text-gray-800">
                            {service.title}
                          </h1>
                          <p className="dark:text-white text-gray-600">
                            {service.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex gap-8 text-center justify-center">
            <CountUp to={20} topText="Projects" bottomText="Completed" />
            <CountUp to={6} topText="Months of" bottomText="Experience" />
            <CountUp to={600} topText="GitHub" bottomText="Contributions" />
          </div>
        </div>
        <div className="md:flex flex-col gap-4 md:w-1/2 md:items-start items-center hidden">
          <nav className="relative flex gap-4">
            {Object.keys(details).map((key) => {
              const isActive = activeSection === key;
              return (
                <div
                  key={key}
                  onClick={() => setActiveSection(key as keyof typeof details)}
                  className="relative cursor-pointer py-2"
                >
                  <span
                    className={`${
                      isActive
                        ? "dark:text-white text-gray-800"
                        : "dark:text-gray-400 text-gray-500"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#27272a] rounded"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border dark:border-[#27272a] border-gray-300 rounded-xl dark:shadow-none shadow-sm shadow-gray-300 h-64 dark:bg-[radial-gradient(circle_at_top,#1e1e1e,#000000)]">
            {details[activeSection]}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
