import Footer from "./footer";
import Header from "./header";
import { useEffect, useState } from "react";
import { finetuneModel, inferenceModel } from "../api/api";

function Home() {
  const [numberOfClasses, setNumberOfClasses] = useState(1);
  const [loadingImages, setLoadingImages] = useState(false);
  const [labels, setLabels] = useState([{}]);
  const [isDone, setIsDone] = useState(false);
  const [isInferenceLoading, setIsInferenceLoading] = useState(false);
  const [modelResponse, setModelResponse] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleLabelChange = (index, value) => {
    const newLabels = [...labels];
    newLabels[index].tag = value;
    newLabels[index].num_examples = 10;
    setLabels(newLabels);
  };

  const handleFinetuneClick = async () => {
    console.log("Next clicked");
    console.log(labels);
    const data = {
      job_name: jobTitle,
      labels: labels,
    };
    console.log(data);
    await finetuneModel(data);
    setLoadingImages(true);
    setIsDone(true);
  };

  const handleInferenceClick = () => {
    console.log("Inference clicked");
    inferenceModel();
    setIsInferenceLoading(true);
    setModelResponse("Inference response");
  };

  useEffect(() => {
    // if number of classes increase, append to classNames
    if (labels.length < numberOfClasses) {
      const newClassNames = [...labels];
      newClassNames.push({});
      setLabels(newClassNames);
    }
    // if number of classes decrease, remove from classNames
    if (labels.length > numberOfClasses) {
      const newClassNames = [...labels];
      newClassNames.pop();
      setLabels(newClassNames);
    }
    console.log(labels);
  }, [numberOfClasses]);

  return (
    <div>
      <Header />
      <div>
        {/* <div class="flex items-center justify-center h-screen bg-black">
          <div className="flex flex-col justify-ceter">
            <h1 class="text-white text-6xl">Opendream</h1>
          </div>
        </div> */}
      </div>
      <div className="bg-black p-10 h-screen">
        <div className="text-white text-center text-4xl flex flex-col pb-12">
          <span>Welcome to Opendream🌙</span>
          <span className="text-white text-2xl text-center">
            Lets finetune a model!
          </span>
        </div>

        {/* step 1 is to title the job */}
        <div className="flex flex-row justify-center">
          <div className="w-96 flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <span className="text-white text-xl">Title The Job</span>
            </div>
            <input
              type="text"
              className="rounded-lg p-2 m-2 ml-4 bg-gray-medium text-white"
              placeholder="Job Title"
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
        </div>

        {/* how many classes */}
        <div className="">
          <div className="flex flex-row justify-center">
            <div className="flex flex-row justify-center">
              <div className="flex flex-col justify-center">
                <span className="text-white text-xl">How many classes?</span>
              </div>
              <input
                type="number"
                className="rounded-lg p-2 m-2 ml-4 bg-gray-medium text-white"
                placeholder="# classes"
                min="1"
                value={numberOfClasses}
                onChange={(e) =>
                  setNumberOfClasses(Math.max(1, e.target.value))
                }
              />
            </div>
          </div>
        </div>

        {/* for i in range number of classes  */}
        <div className="mt-8">
          {Array.from({ length: numberOfClasses }, (_, index) => (
            <div key={index} className="">
              <div className="flex flex-row justify-around">
                <input
                  type="text"
                  className="rounded-lg p-2 m-2 bg-gray-medium text-white w-96"
                  placeholder="Class Name"
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                />
              </div>

              {/* Add any additional content for each class div */}
            </div>
          ))}
        </div>

        {/* next button */}
        <div className="flex justify-center">
          <button
            className="bg-green-accent hover:bg-green-darker text-white rounded-lg p-2 m-2"
            onClick={handleFinetuneClick}
          >
            {!loadingImages ? (
              <span>Finetune</span>
            ) : (
              // show loading spinner
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* once done allow user to inference */}
        {isDone && (
          <div className="flex justify-center mt-32 mb-16">
            <input
              className="rounded-lg p-2 m-2 bg-gray-medium text-white w-72"
              placeholder="Image Src"
              onChange={(e) => setImageSrc(e.target.value)}
            ></input>
            <button
              className="bg-green-accent hover:bg-green-darker text-white rounded-lg p-2 m-2"
              onClick={handleInferenceClick}
            >
              {!isInferenceLoading ? (
                <span>Inference</span>
              ) : (
                // show loading spinner
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </button>
          </div>
        )}

        {/* if model response is not empty */}
        {modelResponse && (
          <div className="flex justify-center mb-16">
            <div className="text-white text-start bg-gray-medium rounded-xl p-4">
              {modelResponse}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
