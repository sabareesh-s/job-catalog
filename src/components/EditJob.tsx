import React, { FC, useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

export interface EditJobsProps {
  id: string;
  getJobs: () => void;
  className?: string;
}
  
export const EditJobs: FC<EditJobsProps> = ({
  id,
  getJobs,
  className
}: EditJobsProps) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  let [jobId, setJobId] = useState("")
  let [jobTitle, setJobTitle] = useState("")
  let [companyName, setCompanyName] = useState("")
  let [location, setLocation] = useState("")
  let [remoteType, setRemoteType] = useState("")
  let [minExperience, setMinExperience] = useState("")
  let [maxExperience, setMaxExperience] = useState("")
  let [minSalary, setMinSalary] = useState("")
  let [maxSalary, setMaxSalary] = useState("")
  let [totalEmployee, setTotalEmployee] = useState("")
  let [applyType, setApplyType] = useState("")
  let [industry, setIndustry] = useState("")
  let [stepCount, setStepCount] = useState("1")
  let [validationError, setValidationError] = useState(false)

  function handleNext() {
    if (jobTitle && companyName && industry) {
      setStepCount("2");
    } else {
      setValidationError(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setStepCount("1");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteOpen(false);
    setStepCount("1");
  }

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }

  const handleApplyTypeChange = (e:any) => {
    setApplyType(e.target.value);
  };

  useEffect(() => {
    handleEditJob(id)
  }, [id])

  const handleEditJob = (id: string) => {
    axios
      .get(`https://64615beb491f9402f4a34877.mockapi.io/jobs/${id}`)
      .then(response => {
        setJobId(response.data.id)
        setJobTitle(response.data.jobTitle)
        setCompanyName(response.data.companyName)
        setLocation(response.data.location)
        setRemoteType(response.data.remoteType)
        setMinExperience(response.data.minExperience)
        setMaxExperience(response.data.maxExperience)
        setMinSalary(response.data.minSalary)
        setMaxSalary(response.data.maxSalary)
        setTotalEmployee(response.data.totalEmployee)
        setApplyType(response.data.applyType)
        setIndustry(response.data.industry)
      })
  }

  const handleUpdateJob = () => {
    axios
      .put(`https://64615beb491f9402f4a34877.mockapi.io/jobs/${jobId}`, {
        jobTitle: jobTitle,
        companyName: companyName,
        location: location,
        remoteType: remoteType,
        minExperience: minExperience,
        maxExperience: maxExperience,
        minSalary: minSalary,
        maxSalary: maxSalary,
        totalEmployee: totalEmployee,
        applyType: applyType,
        industry: industry
      })
      .then(response => {
        console.log(response)
        getJobs();
      })
    closeModal();
  }

  const handleDeleteJob = (id: string) => {
    axios
      .delete(`https://64615beb491f9402f4a34877.mockapi.io/jobs/${id}`)
      .then(response => {
        console.log(response)
        closeDeleteModal();
        getJobs();
      })
  }

  return (
    <div className={className}>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary hover:bg-primaryDarker transition-colors text-textWhite"
          aria-label="edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>

        </button>
        <button
          type="button"
          onClick={openDeleteModal}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-400 hover:bg-error transition-colors text-textWhite"
          aria-label="delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>

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
                    <span className="text-xl">Edit job</span>
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
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm "
                            placeholder="ex. Chennai"
                          ></input>
                        </div>
                        <div className="space-y-1 w-full ">
                          <span className="text-sm">Remote type</span>
                          <input
                            value={remoteType}
                            onChange={(e) => setRemoteType(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
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
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
                            placeholder="Minimum"
                          ></input>
                          <input
                            value={maxSalary}
                            onChange={(e) => setMaxSalary(e.target.value)}
                            className="w-full h-9 border py-3 px-2 rounded-[5px] text-sm outline-none"
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
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primaryDarker "
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
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primaryDarker"
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
                        className="flex ml-auto px-4 py-2 rounded-[5px] bg-primary text-textWhite"
                      >
                        Next
                      </button>
                    </div>
                    ) : stepCount === "2" ? (
                      <button
                        onClick={handleUpdateJob}
                        className="flex ml-auto px-4 py-2 rounded-[5px] bg-primary text-textWhite"
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

      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[10px] bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl flex justify-between items-center "
                  >
                    <span className="text-xl">Delete job</span>
                  </Dialog.Title>
                  <div className="mt-4">
                    <span className="text-sm">Are you sure you want to delete this job?</span>
                  </div>

                  <div className="flex w-36 mt-6 ml-auto items-center">
                    <button
                      onClick={closeDeleteModal}
                      className="flex px-4 py-2 rounded-[5px] bg-white text-primary hover:text-primaryDarker border hover:border-primaryDarker border-primary"
                    >
                      No
                    </button>
                    <button
                      onClick={() => handleDeleteJob(id)}
                      className="flex ml-auto px-4 py-2 rounded-[5px] border border-primary bg-primary hover:bg-primaryDarker transition-colors text-textWhite"
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
