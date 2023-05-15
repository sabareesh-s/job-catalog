import React, { FC, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

export interface CreateJobProps {
  getJobs: () => void;
}

export const CreateJob: FC<CreateJobProps> = ({
  getJobs,
}: CreateJobProps) => {
  let [isOpen, setIsOpen] = useState(false);
  let [stepCount, setStepCount] = useState("1");
  let [jobTitle, setJobTitle] = useState("");
  let [companyName, setCompanyName] = useState("");
  let [industry, setIndustry] = useState("");
  let [location, setLocation] = useState("");
  let [remoteType, setRemoteType] = useState("");
  let [maxExperience, setMaxExperience] = useState("");
  let [minExperience, setMinExperience] = useState("");
  let [minSalary, setMinSalary] = useState("");
  let [maxSalary, setMaxSalary] = useState("");
  let [totalEmployee, setTotalEmployee] = useState("");
  let [applyType, setApplyType] = useState("");
  let [validationError, setValidationError] = useState(false);

  const handleApplyTypeChange = (e:any) => {
    setApplyType(e.target.value);
  };

  function closeModal() {
    setIsOpen(false);
    setStepCount("1");
    clearStates();
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleNext() {
    if (jobTitle && companyName && industry) {
      setStepCount("2");
    } else {
      setValidationError(true);
    }
  }

  function clearStates() {
    setJobTitle("");
    setCompanyName("");
    setIndustry("");
    setLocation("");
    setRemoteType("");
    setMaxExperience("");
    setMinExperience("");
    setMinSalary("");
    setMaxSalary("");
    setTotalEmployee("");
    setApplyType("");
    setValidationError(false);
  }

  const createJob = async () => {
    const data = {
      jobTitle,
      companyName,
      industry,
      location,
      remoteType,
      maxExperience,
      minExperience,
      minSalary,
      maxSalary,
      totalEmployee,
      applyType,
      imgUrl: "https://i.imgur.com/AYjYxro.png",
    };

    const response = await axios.post(
      "https://64615beb491f9402f4a34877.mockapi.io/jobs",
      data
    );
    console.log(response);

    closeModal();
    clearStates();
    getJobs();
  };


  return (
    <div className="">
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 rounded-[5px] bg-primary hover:bg-primaryDarker transition-colors text-textWhite"
      >
        Create Job
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-[10px] bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl flex justify-between items-center "
                  >
                    <span className="text-xl">Create a job</span>
                    <span className="text-base">Step {stepCount}</span>
                  </Dialog.Title>

                  {stepCount === "1" ? (
                    <div className="space-y-6 mt-6">
                      <div className="space-y-1">
                        <span className="text-sm">Job Title<span className="text-error">*</span></span>
                        <input
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className={`${!jobTitle && validationError && 'border-error'} w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none`}
                          placeholder="ex. UX UI Designer"
                        ></input>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Company name<span className="text-error">*</span></span>
                        <input
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className={`${!companyName && validationError && 'border-error'} w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none`}
                          placeholder="ex. Google"
                        ></input>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Industry<span className="text-error">*</span></span>
                        <input
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className={`${!industry && validationError && 'border-error'} w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none`}
                          placeholder="ex. Information Technology "
                        ></input>
                      </div>

                      <div className="flex space-between gap-6">
                        <div className="space-y-1 w-full ">
                          <span className="text-sm">Location</span>
                          <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
                            placeholder="ex. Chennai"
                          ></input>
                        </div>
                        <div className="space-y-1 w-full ">
                          <span className="text-sm">Remote type</span>
                          <input
                            value={remoteType}
                            onChange={(e) => setRemoteType(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none "
                            placeholder="ex. In-Office"
                          ></input>
                        </div>
                      </div>
                    </div>
                  ) : stepCount === "2" ? (
                    <div className="space-y-6 mt-6">
                      <div className="space-y-1">
                        <span className="text-sm">Experience</span>
                        <div className="flex space-between gap-6">
                          <input
                            value={minExperience}
                            onChange={(e) => setMinExperience(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
                            placeholder="Minimum"
                          ></input>
                          <input
                            value={maxExperience}
                            onChange={(e) => setMaxExperience(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
                            placeholder="Maximum"
                          ></input>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Salary</span>
                        <div className="flex space-between gap-6">
                          <input
                            value={minSalary}
                            onChange={(e) => setMinSalary(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none "
                            placeholder="Minimum"
                          ></input>
                          <input
                            value={maxSalary}
                            onChange={(e) => setMaxSalary(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none "
                            placeholder="Maximum"
                          ></input>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Total employee</span>
                        <input
                          value={totalEmployee}
                          onChange={(e) => setTotalEmployee(e.target.value)}
                          className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
                          placeholder="ex. 100"
                        ></input>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Experience</span>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input
                              id="radio-1"
                              type="radio"
                              value="quick-apply"
                              name="radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primaryDarker outline-none"
                              checked={applyType === 'quick-apply'}
                              onChange={handleApplyTypeChange}
                            />
                            <label htmlFor="radio-1" className="ml-2 text-sm">
                              Quick apply
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="radio-2"
                              type="radio"
                              value="external-apply"
                              checked={applyType === 'external-apply'}
                              onChange={handleApplyTypeChange}
                              name="radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primaryDarker outline-none"
                            />
                            <label htmlFor="radio-2" className="ml-2 text-sm">
                              External apply
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-24">
                    {stepCount === "1" ? (
                      <div 
                        className="flex justify-between items-baseline"
                      >
                        {
                          validationError && 
                          <span className="text-sm text-error">
                            Please fill all the required fields before proceeding
                          </span>
                        }
                        <button
                          onClick={handleNext}
                          className="flex ml-auto px-4 py-2 rounded-[5px] bg-primary hover:bg-primaryDarker transition-colors text-textWhite"
                        >
                          Next
                        </button>
                      </div>
                    ) : stepCount === "2" ? (
                      <button
                        onClick={createJob}
                        className="flex ml-auto px-4 py-2 rounded-[5px] bg-primary hover:bg-primaryDarker transition-colors text-textWhite"
                      >
                        Save
                      </button>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
