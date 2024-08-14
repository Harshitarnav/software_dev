import React from "react";

const FitnessOptions = [
  { value: "gym", label: "Gym" },
  { value: "yoga", label: "Yoga" },
  { value: "functional-training", label: "Functional Training" },
  { value: "cardio", label: "Cardio" },
];

const FitnessTypeDropDown = () => {
  return (
    <div className="flex justify-center mt-2">
      <div className="flex justify-between bg-tertiary rounded-lg p-2 shadow-md gap-2">
        {FitnessOptions.map((option) => (
          <div
            className="bg-secondary text-sm text-black px-4 py-2 flex items-center rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-colors"
            key={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessTypeDropDown;
