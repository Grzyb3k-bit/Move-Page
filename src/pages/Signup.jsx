import { Link, useNavigate } from "react-router-dom";
import Header from "../assets/components/header";
import { useState, useEffect } from "react";
import { GrFormView } from "react-icons/gr";

function Signup() {
  const [login, setLogin] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Przycięte dane
  const trimmedLogin = login.trim();
  const trimmedNick = nick.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  // Sprawdzenie, czy dane są już używane
  const foundLogin = users.find((u) => u.login === trimmedLogin);
  const foundNick = users.find((u) => u.nick === trimmedNick);
  const foundEmail = users.find((u) => u.email === trimmedEmail);

  const handleCreateAccount = () => {
    const newUser = {
      id: Date.now(),
      login: trimmedLogin,
      nick: trimmedNick,
      email: trimmedEmail,
      password: trimmedPassword,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // Reset formularza
    setLogin("");
    setNick("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    navigate("/login");
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailPattern.test(trimmedEmail);

  const isFormValid =
    trimmedLogin &&
    trimmedNick &&
    trimmedEmail &&
    trimmedPassword.length > 4 &&
    trimmedConfirmPassword &&
    isEmailValid &&
    trimmedPassword === trimmedConfirmPassword &&
    !foundLogin &&
    !foundNick &&
    !foundEmail;

  return (
    <>
      <div className="w-full h-[8%] flex justify-center items-center bg-black">
        <Header />
      </div>
      <div className="w-full bg-white h-[92%] flex justify-center items-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="shadow-md rounded px-8 py-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Zarejestruj się
            </h2>

            <input
              type="text"
              placeholder="Login"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            {login && trimmedLogin === "" && (
              <span className="text-red-600">Login nie może być pusty</span>
            )}
            {foundLogin && (
              <span className="text-red-600">Ten login jest już używany</span>
            )}

            <input
              type="text"
              placeholder="Nick"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              required
            />
            {nick && trimmedNick === "" && (
              <span className="text-red-600">Nick nie może być pusty</span>
            )}
            {foundNick && (
              <span className="text-red-600">Ten nick jest już używany</span>
            )}

            <input
              type="email"
              placeholder="E-mail"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && trimmedEmail === "" && (
              <span className="text-red-600">E-mail nie może być pusty</span>
            )}
            {email && !isEmailValid && (
              <span className="text-red-600">Nieprawidłowy adres e-mail</span>
            )}
            {foundEmail && (
              <span className="text-red-600">
                Ten e-mail jest już zarejestrowany
              </span>
            )}

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                className="w-full mb-1 mt-2 px-4 py-2 border rounded pr-10"
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password.length > 0 && (
                <div
                  className="absolute top-5 right-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <GrFormView />
                </div>
              )}
              {password && trimmedPassword.length < 4 && (
                <span className="text-red-600">Hasło musi mieć 4 znaki</span>
              )}
            </div>

            <input
              type="password"
              placeholder="Potwierdź hasło"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {trimmedPassword !== trimmedConfirmPassword && (
              <span className="text-red-600">Hasła są różne</span>
            )}

            {isFormValid && (
              <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 mt-2"
              >
                Utwórz konto
              </button>
            )}

            <Link to="/">
              <button
                type="button"
                className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
              >
                Anuluj
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
