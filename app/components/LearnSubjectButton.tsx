import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LiveKitMetadata } from "@/types/livekit";
import useAuthContext from "@/hooks/custom/useAuthContext";
import { Button } from "@/components/ui/button";


const chaptersBySubject: Record<string,Record<string, string[]>> = {
  "10" : {
      Civics: [
      "Challenges To Democracy",
      "Democracy And Diversity",
      "Federalism",
      "Gender Religion And Caste",
      "Outcomes Of Democracy",
      "Political Parties",
      "Popular Struggles And Movements",
      "Power Sharing",
    ],
    Economics: [
      "Consumer Rights",
      "Development",
      "Globalisation And The Indian Economy",
      "Money And Credit",
      "Sectors Of Indian Economy",
    ],
    Geography: [
      "Agriculture",
      "Forest And Wildlife Resources",
      "Lifelines Of National Economy",
      "Manufacturing Industries",
      "Mineral And Energy Resources",
      "Resources And Development",
      "Water Resources",
    ],
    History: [
      "Nationalism In India",
      "Print Culture and the Modern World",
      "The Age Of Industrialization",
      "The Making Of Global World",
      "The Rise Of Nationalism In Europe",
    ],
  },
  "6" : {
    English : [
      "A Dancing Bear", "After Twenty Years", "Gandhi- As a Student", "Gull", "If", "Indian Women in Sports", "Raunak Ali- The Master Craftsman", "Real Friend- A Gift of God", "Realise Your Dreams", "Save the Birds", "Silver", "The Four Magicians", "The Prisoner", "The Shrewd Farmer", "The Sun has Long Been Set", "Tom Sawyer and His Whitewashing"
    ]

  }
};

const LearnSubjectButton = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const router = useRouter();
  const authContext = useAuthContext()

  const handleStartLearning = () => {


    if (selectedClass && selectedSubject && selectedChapter) {
      const data:LiveKitMetadata = {userId: authContext.config.loggedIn? authContext.config.id : "" , standard: Number.parseInt(selectedClass), subject: selectedSubject, chapter: selectedChapter };
      sessionStorage.setItem("learnSubjectData", JSON.stringify(data));
      router.push("/learn-subject");
    } else {
      alert("Please select all options.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Start Learning Subject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select Your Class, Subject & Chapter</DialogTitle>
        <DialogDescription>Choose the class, subject, and chapter you want to learn.</DialogDescription>

        {/* Class Selection */}
        <select
          className="w-full border p-2 rounded mt-2"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          <option value="10">Class 10</option>
          <option value="6">Class 6</option>
        </select>

        {/* Subject Selection */}
        <select
          className="w-full border p-2 rounded mt-2"
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setSelectedChapter(""); // Reset chapter when subject changes
          }}
        >
          <option value="">Select Subject</option>
          {selectedClass &&
            Object.keys(chaptersBySubject[selectedClass]).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
        </select>

        {/* Chapter Selection */}
        <select
          className="w-full border p-2 rounded mt-2"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          disabled={!selectedSubject}
        >
          <option value="">Select Chapter</option>
          {selectedSubject &&
            chaptersBySubject[selectedClass][selectedSubject].map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
        </select>

        {/* Start Learning Button */}
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant={"outline"} onClick={handleStartLearning}>
              Start Learning
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnSubjectButton;
