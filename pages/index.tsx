import { createRef, useEffect, useMemo, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const ALL_IMAGES = [
  {
    title: "Incredible Collection",
    src: "/images/1.jpg",
    alt: "Guy with brown coat",
    color: "#6f543f",
  },
  {
    title: "Fashion Revolution",
    src: "/images/2.jpg",
    alt: "Girl with brown beanie",
    color: "#2d362e",
  },
  {
    title: "Effortless Lifestyle",
    src: "/images/3.jpg",
    alt: "Girl with denim shirt",
    color: "#71403f",
  },
  {
    title: "Delight in the details",
    src: "/images/4.jpg",
    alt: "Girl with denim shirt",
    color: "#011627",
  },
];

const Image = ({ image }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], [150, 80, 150]);

  return (
    <aside className="basis-1/3">
      <motion.div
        className="w-[360px] h-[540px] relative max-h-[90vh] m-5 overflow-hidden"
        initial={{ y: "60vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.8 }}
      >
        <motion.img src="/images/1.jpg" alt="Guy with brown coat" />
      </motion.div>
    </aside>
  );
};

const Section = ({ showLog }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [150, 80, 150]);
  const width = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "50%", "100%", "50%", "0%"]);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      if (showLog) console.log(v);
    });
  }, [scrollYProgress, showLog]);

  return (
    <div className="w-screen min-h-screen flex flex-row justify-center items-center container mx-auto [scroll-snap-align:center] [perspective:500px]">
      <main className="h-full flex flex-col justify-center pl-16 basis-2/3">
        <div>
          <motion.h2
            className="text-9xl mb-6 tracking-wider text-[#ebe0cc] overflow-hidden"
            style={{ width }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1, transition: { duration: 2.5 } }}
          >
            Incredible Collection
          </motion.h2>
        </div>

        <motion.div
          className="flex items-center w-fit ml-20 "
          initial={{ x: -40, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut",
            },
          }}
          whileHover={{
            x: 15,
            transition: {
              duration: 0.6,
            },
          }}
        >
          <a className="text-3xl text-[#e3d0bf]" href="#">
            Shop Now
          </a>

          <span className="w-20 h-[2px] block bg-[#e3d0bf] ml-4" />
        </motion.div>
      </main>

      <aside className="h-auto basis-1/3" ref={ref}>
        <motion.div
          className="w-[360px] h-[540px] relative max-h-[90vh] m-5 overflow-hidden"
          initial={{ y: "60vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.8 }}
          style={{ borderRadius }}
        >
          <motion.img src="/images/1.jpg" alt="Guy with brown coat" style={{ borderRadius }} />
        </motion.div>
      </aside>
    </div>
  );
};

const Home: NextPage = () => {
  const { scrollYProgress } = useScroll();

  const color = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ALL_IMAGES.map((i) => i.color)
  );

  useEffect(() => {
    color.onChange((value) => {
      document.documentElement.style.setProperty("--background-color", value);
    });
  }, [color]);

  return (
    <>
      {/* initial opacity overlay */}
      <motion.div
        className="bg-[#6f543f] h-screen w-screen top-0 left-0 fixed pointer-events-none z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* background circle */}
      <motion.div
        className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] border-4 border-[#f9e4d2] rounded-full pointer-events-none z-0"
        initial={{ y: 120, opacity: 0.1 }}
        animate={{ y: 0, opacity: 0.4, transition: { duration: 1.4 } }}
      ></motion.div>

      <header className="fixed top-0 left-0 w-screen">
        <div className="container mx-auto py-8">
          <motion.header
            className="flex flex-row items-center text-[#f9e4d2]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="uppercase font-medium text-4xl">Defashe</h1>
            <div className="flex flex-row ml-40">
              <p className="text-xl">
                <a className="hover:text-[#fcf1e9]" href="#">
                  Trends
                </a>
              </p>

              <p className="ml-8 text-xl">
                <a className="hover:text-[#fcf1e9]" href="#">
                  Collections
                </a>
              </p>

              <p className="ml-8 text-xl">
                <a className="hover:text-[#fcf1e9]" href="#">
                  Explore
                </a>
              </p>
            </div>
          </motion.header>
        </div>
      </header>

      <footer className="fixed bottom-0 left-0 w-screen">
        <div className="container mx-auto py-8 my-8">
          <motion.div
            className="w-fit"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: -25, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-xl mt-[30px] inline-block text-[#f9e4d2] rotate-[-90deg]">@2022</span>
          </motion.div>
        </div>
      </footer>

      <div>
        <Section showLog />
        <Section />
        <Section />
        <Section />
      </div>
    </>
  );
};

export default Home;
