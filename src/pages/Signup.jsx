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
  const [touched, setTouched] = useState({
    login: false,
    nick: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const loginPattern = /^[a-zA-Z0-9._-]+$/; // bez spacji
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^.{4,}$/; // min. 4 znaki

  const isLoginValid = loginPattern.test(login);
  const isEmailValid = emailPattern.test(email);
  const isPasswordValid = passwordPattern.test(password);
  const passwordsMatch = password === confirmPassword;

  const foundLogin = users.find((u) => u.login === login);
  const foundNick = users.find((u) => u.nick === nick);
  const foundEmail = users.find((u) => u.email === email);

  const isFormValid =
    login &&
    isLoginValid &&
    nick &&
    email &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch &&
    !foundLogin &&
    !foundNick &&
    !foundEmail;

  const handleCreateAccount = () => {
    const newUser = {
      id: Date.now(),
      login,
      nick,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    setLogin("");
    setNick("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTouched({
      login: false,
      nick: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

    navigate("/login");
  };

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

            {/* LOGIN */}
            <input
              type="text"
              placeholder="Login"
              pattern={loginPattern.source}
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, login: true }))}
              required
            />
            {touched.login && !isLoginValid && (
              <p className="text-red-600">Login nie może zawierać spacji</p>
            )}
            {touched.login && foundLogin && (
              <p className="text-red-600">Ten login jest już używany</p>
            )}

            {/* NICK */}
            <input
              type="text"
              placeholder="Nick"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, nick: true }))}
              required
            />
            {touched.nick && !nick && (
              <p className="text-red-600">Nick nie może być pusty</p>
            )}
            {touched.nick && foundNick && (
              <p className="text-red-600">Ten nick jest już używany</p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="E-mail"
              pattern={emailPattern.source}
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              required
            />
            {touched.email && !isEmailValid && (
              <p className="text-red-600">Nieprawidłowy adres e-mail</p>
            )}
            {touched.email && foundEmail && (
              <p className="text-red-600">Ten e-mail jest już zarejestrowany</p>
            )}

            {/* HASŁO */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                pattern={passwordPattern.source}
                className="w-full mb-1 mt-2 px-4 py-2 border rounded pr-10"
                value={password}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "");
                  setPassword(value);
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
                required
              />
              {password && (
                <div
                  className="absolute top-5 right-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <GrFormView />
                </div>
              )}
              {touched.password && !isPasswordValid && (
                <span className="text-red-600">
                  Hasło musi mieć min. 4 znaki
                </span>
              )}
            </div>

            {/* POTWIERDZENIE HASŁA */}
            <input
              type="password"
              placeholder="Potwierdź hasło"
              className="w-full mb-1 mt-2 px-4 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                setConfirmPassword(value);
              }}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              required
            />
            {touched.confirmPassword && password && !passwordsMatch && (
              <p className="text-red-600">Hasła są różne</p>
            )}

            {/* PRZYCISK */}
            {isFormValid && (
              <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 mt-2"
              >
                Utwórz konto
              </button>
            )}

            {/* ANULUJ */}
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
