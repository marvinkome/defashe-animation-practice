import { createRef, useEffect, useMemo, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const ALL_IMAGES = [
  {
    src: "/images/1.jpg",
    alt: "Guy with brown coat",
  },
  {
    src: "/images/2.jpg",
    alt: "Girl with brown beanie",
  },
  {
    src: "/images/3.jpg",
    alt: "Girl with denim shirt",
  },
];

const Image = ({ id }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], [150, 80, 150]);
  const borderRadius = useMotionTemplate`0px 0px 0px 0px`;

  // useEffect(() => {
  //   if (id !== 2) return;
  //   scrollYProgress.onChange((val) => {
  //     console.log(val);
  //   });
  // }, [id, scrollYProgress]);

  return (
    <section className="h-screen flex items-center relative [scroll-snap-align:center] [perspective:500px]">
      <motion.div
        ref={ref}
        className="w-[360px] h-[540px] relative max-h-[90vh] m-5 overflow-hidden"
        style={{ borderRadius: radius }}
        initial={{ y: "60vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.8 }}
      >
        <motion.img src={`/images/${id}.jpg`} alt="A London skyscraper" style={{ borderRadius: radius }} />
      </motion.div>
    </section>
  );
};

const Home: NextPage = () => {
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

      {/* content */}
      <div className="fixed top-0 left-0 w-screen h-screen">
        <div className="container mx-auto py-8">
          {/* header */}
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

          {/* body */}
          <main className="min-h-[80vh] flex flex-col justify-center px-20 pr-60">
            <div>
              <motion.h2
                className="text-9xl mb-6 tracking-wider text-[#ebe0cc] overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1, transition: { duration: 2.5 } }}
              >
                Incredible Collection
              </motion.h2>
              <div />
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
                x: 20,
                transition: {
                  duration: 0.8,
                },
              }}
            >
              <a className="text-3xl text-[#e3d0bf]" href="#">
                Shop Now
              </a>

              <span className="w-20 h-[2px] block bg-[#e3d0bf] ml-4" />
            </motion.div>
          </main>

          {/* copyright */}
          <motion.div
            className="w-fit"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: -25, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-xl mt-[30px] inline-block text-[#f9e4d2] rotate-[-90deg]">@2022</span>
          </motion.div>
        </div>
      </div>

      {/* images */}
      <div className="z-10 absolute h-full top-0 right-28">
        <motion.div className="flex flex-col" initial={{ y: "60vh" }} animate={{ y: 0 }} transition={{ duration: 1.8 }}>
          {[1, 2, 3, 4].map((image) => (
            <Image key={image} id={image} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
