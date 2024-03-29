import React from 'react';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header title="About" />
      <main>
        <div className="flex flex-col gap-3 font-medium">
          <p className="text-center italic text-gray-300">
            You'll find Contact information at the end of this section
          </p>
          <p>
            Hi! my name is{' '}
            <strong>Luis Portillo, Venezuelan Fullstack Web developer</strong>,
            the only developer involved in this project. In this section you can
            find general information about this{' '}
            <span className="italic">some kind of</span> App called Relyn, which
            without further ado, I will explain below...
          </p>
          <p>
            I will be as honest possible. I'm not here to show off my amazing
            skill as a developer or anything like that, just being realistic and
            critical of my work.
          </p>
          <p>
            What can you do here in general? Well... create an account, post
            things, comment on them, rate them, search for them, follow other
            users, some customization among other essential things. Of course,
            there is not much depth in these systems and there are many that are
            obviously missing but the idea was never to make a social network or
            something 100% functional in general, it is just a personal learning
            project, don't forget that.
          </p>
          <p>
            <strong>A mess, my little beautiful mess</strong>, this is how I
            would describe this App project, since the initial idea was quite
            simple development that tried to imitate Reddit posts or something
            like that, emphasizing learning in the process, but only that.
          </p>
          <p>
            For the SPA frontend, I used React (hooks), Redux, Tailwind CSS,
            among other common libraries and my own implementations.
          </p>
          <p>
            For the backend I used TypeScript with ExpressJS, as well as a
            handful of libraries to perform different tasks and many others that
            I implemented on my own. Always following the MVC pattern.
          </p>
          <p>
            In the case of the database, MongoDB and Mongoose as ORM. The
            connection to the database is done remotely.
          </p>
          <p>
            There are <strong>9</strong> internal routes in the client and
            another <strong>28</strong> dedicated to the API that supports it.
          </p>
          <p>
            There are approximately 5,000 lines of code. There was more time
            invested than I would like to admit, especially due to poor
            development conditions and things that I was completely unaware of
            until then.
          </p>
          <p>
            The choice of this technological stack is mainly based on the factor
            of learning, flexibility and essentially freedom to do my own stuff,
            and although they fit decently with the initial idea, quickly with
            the inclusion of new challenges it no longer fit so well, but I
            decided to keep it since the priority was learning since I have
            already used "The right tool for the job" before and I simply made
            limitations one more problem to solve.
          </p>
          <p>
            The technology stack used quickly was insufficient and inefficient
            to cover the increasing features that were added to the initial
            idea, simply because I thought "Why not?", since that made
            development more interesting and made it a challenge from which get
            a lot of benefit based on the experience gained.
          </p>
          <p>
            There is a certain layer of security in the client and API
            especially, everything essential that can be considered according to
            the needs of this project such as JWT Authentication, CSRF tokens
            and all kinds of measures and basic considerations in the processes
            to make everything work in a way safe, at least in theory, since in
            practice it is the first time that I do these implementations on my
            own, they will probably work roughly but it is even more likely that
            there are problems that have escaped my hands due to my lack of
            experience and I don't even know it yet.
          </p>
          <p>
            Some implementations may falter due to my lack of previous
            experience and which I do not have the time or the intention to
            correct unfortunately due to the scope of this project as well as
            other reasons that I explain throughout this document. That said and
            despite the fact that I made a good attempt, I doubt the
            effectiveness and reliability of these systems and I strongly
            recommend not providing sensitive data under any circumstances since
            its security is not guaranteed and in general many things with the
            App can break or not behave properly due to its development context
            and intention of use (Just to test).
          </p>
          <p>
            Of course and given the explicit explanation given above, I am not
            responsible for the damages that the use of this service may
            generate, you simply go on your own. Although I can guarantee that
            internally there is no use of data other than the functionality that
            is desired to be achieved in this App, there may still be many
            external agents that can maliciously alter said functionality.
          </p>
          <p>
            The codebase is not totally free of boilerplate, bugs, things to
            refactor or optimize (probably) and I am quite aware of most of
            those problems but in the end it works, almost everything, but the
            main point is all the knowledge, research, experience and cracks of
            head that I won and of which I am quite proud. For reasons of time
            and plans with other projects of a similar purpose (learning) I
            decided to simply finish as soon as possible to move on to other
            interesting challenges that I consider myself, even so the final
            result of this App experiment met and satisfactorily exceeded its
            objective, being something that I have really enjoyed doing and what
            I have learned and grown professionally, making me stay awake a few
            nights for this which is my passion for software development.
          </p>
          <p>
            In any case, I hope it will be a pleasant experience for you, user,
            although there really isn't too much to do around here. If you want
            to contact me for any reason, you can visit{' '}
            <a
              href="https://www.devcorvus.com/contact"
              title="Go to DevCorvus Contact page"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-400 hover:underline focus:underline hover:text-blue-500 focus:text-blue-500 transition"
            >
              DevCorvus Contact page (my personal website)
            </a>{' '}
            where you'll find such information and much more.
          </p>
          <p>
            Note to hobbyist hackers with a lot of free time: Do not try to
            circumvent the security of this sacred site, it will be so easy that
            you will be disappointed, kappa.
          </p>
          <p>Thanks for reading! ♥</p>
        </div>
      </main>
    </>
  );
}
