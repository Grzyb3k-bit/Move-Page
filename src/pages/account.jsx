import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../assets/components/header";
import { filmImages } from "../assets/components/FilmImages";
import userIcon from "../assets/img/user.png";
import FilmData from "../assets/components/FilmData";

const Account = () => {
  const [liczba, setLiczba] = useState(0);
  const [mostWatched, setMostWatched] = useState({});
  const [lastWatchedTitle, setLastWatchedTitle] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const nickname = currentUser?.nick;

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const lastwatchedmovie = filmImages[lastWatchedTitle];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));

    if (userData && userData.stats) {
      setLiczba(userData.stats.filmsWatched);
      setMostWatched({
        title: userData.stats.mostWatchedTitle,
        creator: userData.stats.mostWatchedCreator,
      });
      setLastWatchedTitle(userData.stats.lastWatchedTitle);
    } else if (userData) {
      const randomFilmsWatched = getRandomInt(100);
      const randomFilm = FilmData[Math.floor(Math.random() * FilmData.length)];
      const randomFilm1 = FilmData[Math.floor(Math.random() * FilmData.length)];

      const stats = {
        filmsWatched: randomFilmsWatched,
        minutesWatched: randomFilmsWatched * 90,
        mostWatchedTitle: randomFilm.title,
        mostWatchedCreator: randomFilm.creator,
        lastWatchedTitle: randomFilm1.title,
      };

      const updatedUser = { ...userData, stats };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setLiczba(stats.filmsWatched);
      setMostWatched({
        title: stats.mostWatchedTitle,
        creator: stats.mostWatchedCreator,
      });
      setLastWatchedTitle(stats.lastWatchedTitle);
    }
  }, []);

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   setIsLoggedIn(!!currentUser);
  // }, [location.pathname]);

  return (
    <div className="flex flex-wrap content-start h-full overflow-x-hidden">
      <div className="w-full h-[8%] flex justify-center items-center bg-black">
        <Header />
      </div>

      <main className="flex flex-col lg:flex-row lg:justify-between p-4 gap-4 h-[92%] w-full">
        <section className="flex-1 bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-evenly text-white">
          <img
            src={userIcon}
            alt="user icon"
            className="sm:w-48 sm:h-48 rounded-full mb-4"
          />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2">
            {nickname}
          </h2>
          <p className="text-lg sm:text-2xl mb-2">
            Obejrzane minuty: <strong>{liczba * 90}</strong>
          </p>
          <p className="text-lg sm:text-2xl mb-2">
            Obejrzane filmy: <strong>{liczba}</strong>
          </p>
          <p className="text-lg sm:text-2xl mb-2">
            Najczęściej oglądany: <strong>{mostWatched.title}</strong>
          </p>
          <p className="text-lg sm:text-2xl">
            Autor: <strong>{mostWatched.creator}</strong>
          </p>
        </section>

        <section className="flex-1 bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center">
          <img
            src={lastwatchedmovie}
            alt="film"
            className="w-full h-auto max-h-[900px] object-cover rounded mb-4"
          />
          <p className="text-xl sm:text-3xl text-center text-white">
            Ostatnio oglądany film: <strong>{lastWatchedTitle}</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Account;
