import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { LogOut, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import Book from "../assets/student/book.svg";

export default function Teacher() {
  const categories = [
    { name: "6ème A", color: "bg-[#F2C955]" },
    { name: "6ème B", color: "bg-[#F2C955]" },
    { name: "6ème C", color: "bg-[#F2C955]" },
  ];

  const firstNames = [
    "Lucas",
    "Emma",
    "Nathan",
    "Léa",
    "Mathis",
    "Sophie",
    "Hugo",
    "Jade",
    "Noah",
    "Chloé",
  ];
  const lastNames = [
    "Morel",
    "Fontaine",
    "Caron",
    "Dumont",
    "Laurent",
    "Dubois",
    "Lemoine",
    "Girard",
    "Martinez",
    "Bertrand",
  ];

  const getRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomNames = () => {
    const count = Math.floor(Math.random() * 6) + 3; // Génère un nombre entre 3 et 8
    return Array.from({ length: count }, getRandomName);
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [namesList, setNamesList] = useState(generateRandomNames());
  const [selectedStudentIndex, setSelectedStudentIndex] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedClassIndex, setSelectedClassIndex] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");

  // Met à jour la liste des noms lorsque la catégorie sélectionnée change
  useEffect(() => {
    setNamesList(generateRandomNames());
    setSelectedStudentIndex(""); // Réinitialise le nom sélectionné lors du changement de catégorie
    setSelectedStudentName("");
  }, [selectedCategory]);

  return (
    <main className="flex bg-[#EEEEEE] flex-row items-center justify-start min-h-screen h-screen py-8 px-8 gap-8">
      <nav className="h-full flex flex-col w-fit bg-[#81DFEF] rounded-3xl px-4 justify-between items-center py-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={faker.image.avatar()}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <div className="bg-[#EEEEEE] p-2 rounded-full h-12 w-12 justify-center flex items-center">
            <img src={Book} alt="book" className="" />
          </div>
        </div>
        <LogOut size={24} className="text-white" />
      </nav>
      <section className="flex flex-col items-center justify-start w-full h-full gap-8">
        <header className="flex flex-row items-center justify-between w-full">
          <div className="border-black border rounded-full flex items-center justify-between gap-4 p-1">
            <input
              placeholder="Rechercher un cours"
              className="ml-4 max-w-96 outline-none border-none"
            />
            <Button className="h-full rounded-full">
              <Search size={24} className="text-white" />
            </Button>
          </div>
          <img src={Logo} alt="logo" className="h-8" />
        </header>
        <div className="grid grid-cols-7 gap-8 w-full">
          <div className="flex col-span-3 flex-col items-center justify-center max-w-[468px] gap-4">
            {/* Vue d'ensemble */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="w-fit text-lg font-semibold text-center bg-[#81F281] rounded-full py-1 px-4">
                  Vue d'ensemble
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap flex-row items-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    className={cn(
                      "w-fit text-s font-semibold",
                      selectedCategory === category.name ? category.color : ""
                    )}
                    variant="outline"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
            {/* Liste des étudiants */}
            <Card className="w-full max-h-[300px]">
              <CardHeader>
                <CardTitle className="w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4">
                  {selectedCategory}
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[180]">
                <div className="w-full flex flex-col items-center justify-between gap-2 max-h-[180px] overflow-y-auto pr-3">
                  {namesList.map((name, index) => (
                    <Button
                      key={`${name}-${index}`}
                      className={cn(
                        "w-full text-s font-semibold justify-start",
                        selectedStudentIndex === `${name}-${index}`
                          ? "bg-[#E3C3EF]"
                          : "bg-[#F8F8F8]"
                      )}
                      variant="outline"
                      onClick={() => {
                        setSelectedStudentIndex(`${name}-${index}`);
                        setSelectedStudentName(name);
                      }}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Choix du chapitre de la matière */}
            {selectedStudentName && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="w-fit text-lg font-semibold text-center bg-[#F2C955] rounded-full py-1 px-4">
                    Mathématiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2 w-full">
                  <Button
                    key={`button-matiere-0`}
                    className={cn(
                      "w-full text-s font-semibold justify-start",
                      selectedClassIndex === `button-matiere-0`
                        ? "bg-[#81F281]"
                        : "bg-[#F8F8F8]"
                    )}
                    variant="outline"
                    onClick={() => {
                      setSelectedClassIndex(`button-matiere-0`);
                      setSelectedClassName("Géométrie");
                    }}
                  >
                    Géométrie
                  </Button>
                  <Button
                    key={`button-matiere-1`}
                    className={cn(
                      "w-full text-s font-semibold justify-start",
                      selectedClassIndex === `button-matiere-1`
                        ? "bg-[#81F281]"
                        : "bg-[#F8F8F8]"
                    )}
                    variant="outline"
                    onClick={() => {
                      setSelectedClassIndex(`button-matiere-1`);
                      setSelectedClassName("Fonction");
                    }}
                  >
                    Fonction
                  </Button>
                  <Button
                    key={`button-matiere-2`}
                    className={cn(
                      "w-full text-s font-semibold justify-start",
                      selectedClassIndex === `button-matiere-2`
                        ? "bg-[#81F281]"
                        : "bg-[#F8F8F8]"
                    )}
                    variant="outline"
                    onClick={() => {
                      setSelectedClassIndex(`button-matiere-2`);
                      setSelectedClassName("Nombre entiers");
                    }}
                  >
                    Nombre entiers
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          <div></div>
        </div>
      </section>
    </main>
  );
}
