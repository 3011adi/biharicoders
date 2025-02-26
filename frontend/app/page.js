"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const heroRef = useRef(null);
  const achievementsRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from(heroRef.current.querySelector("h1"), {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
    heroTl.from(heroRef.current.querySelector("p"), {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
    heroTl.from(heroRef.current.querySelectorAll("span"), {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.6
    }, "-=0.3");

    // Achievements section animations
    gsap.from(achievementsRef.current.querySelector("h2"), {
      scrollTrigger: {
        trigger: achievementsRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 20,
      duration: 0.8
    });
    
    gsap.from(achievementsRef.current.querySelectorAll(".grid > div"), {
      scrollTrigger: {
        trigger: achievementsRef.current,
        start: "top 70%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8
    });

    // Team section animations
    gsap.from(teamRef.current.querySelector("h2"), {
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 20,
      duration: 0.8
    });
    
    gsap.from(teamRef.current.querySelectorAll(".grid > div"), {
      scrollTrigger: {
        trigger: teamRef.current.querySelector(".grid"),
        start: "top 75%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6
    });

    // CTA section animations
    gsap.from(ctaRef.current.children, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8
    });

    // Stats section animations
    gsap.from(statsRef.current.children, {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8
    });

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Bihar Coders
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Elite Hackathon Team from Bihar
          </p>
          <div className="flex justify-center mb-8">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300 mr-2">
              Problem Solvers
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1 rounded-full dark:bg-purple-900 dark:text-purple-300 mr-2">
              Rapid Prototypers
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
              Innovative Thinkers
            </span>
          </div>
        </div>

        {/* Achievements Section */}
        <div ref={achievementsRef} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">National Champions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Winner of CodeTech Hackathon 2023
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">Regional Leaders</h3>
              <p className="text-gray-600 dark:text-gray-300">
                First place in Eastern India Hack Challenge
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">Industry Recognition</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Featured in Tech Today Magazine
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4"></div>
                <h3 className="font-bold">Team Member {member}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Role / Specialty</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Interested in collaborating?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            We're always looking for new challenges and hackathons to conquer
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Our Team
          </a>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <h4 className="text-3xl font-bold text-blue-600">15+</h4>
            <p className="text-gray-600 dark:text-gray-300">Hackathons Participated</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-blue-600">8</h4>
            <p className="text-gray-600 dark:text-gray-300">Awards Won</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-blue-600">20+</h4>
            <p className="text-gray-600 dark:text-gray-300">Projects Developed</p>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Bihar Coders | Representing Bihar in hackathons nationwide
        </p>
      </footer>
    </div>
  );
}
