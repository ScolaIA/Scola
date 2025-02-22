import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import Logo from "../assets/logo.svg";
import Man from "../assets/home/man.svg";
import Woman from "../assets/home/woman.svg";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (identifier && password) {
      if (identifier.toLowerCase() === "teacher") {
        navigate("/professeur");
      } else if (identifier.toLowerCase() === "student") {
        navigate("/etudiant");
      }
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen w-full flex-col px-20 bg-[#F8F8F8] font-[Poppins]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-4 pt-6"
      >
        <img src={Logo} alt="Scola Logo" className="h-12 mb-6" />
        <div className="flex flex-col gap-4 w-80">
          <Input
            type="text"
            placeholder="IDENTIFIANT"
            className="w-full px-4 py-2 border rounded-full bg-white text-gray-700 placeholder-gray-500"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Input
            type="password"
            placeholder="MOT DE PASSE"
            className="w-full px-4 py-2 border rounded-full bg-white text-gray-700 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500"
          >
            ENTRER
          </button>
          <div className="flex justify-center mt-4">
            <ArrowLeft
              size={24}
              className="text-gray-600 cursor-pointer transition-transform transform hover:-translate-x-2"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </form>
      <img
        src={Woman}
        alt="woman"
        className="absolute left-0 top-[65%] w-[200px] transform -translate-y-1/2"
      />
      <img
        src={Man}
        alt="man"
        className="absolute right-0 top-[70%] w-[220px] transform -translate-y-1/2"
      />
    </div>
  );
}

export default Login;
