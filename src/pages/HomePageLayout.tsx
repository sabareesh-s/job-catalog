import React, { FC, Fragment, useEffect, useState } from 'react'
import { CreateJob } from '../components/CreateJob'
import { JobCard } from '../components/JobCard'
import axios, { AxiosResponse } from 'axios'

export interface HomePageProps {
  
}

export const HomePageLayout: FC<HomePageProps> = ({

}: HomePageProps) => {
  let [jobs, setJobs] = useState<AxiosResponse | null | void>(null)

  useEffect(() => {
    getJobs()
  }, [])

  const getJobs = () => {
    axios
      .get('https://64615beb491f9402f4a34877.mockapi.io/jobs')
      .then(response => {
        setJobs(response)
      })
  }

  return (
    <>
      <header className='p-6'>
        <CreateJob getJobs={getJobs}/>  
      </header>
      <main className='bg-[#d8d8d8] grid grid-cols-2 gap-6 p-6'>
        {jobs?.data?.length === 0 && <span className='text-sm italic text-dark'>No Jobs Found</span>}
        {jobs?.data?.map((job:any, index:any)=>
          <Fragment
            key={index.toString()}  
          >
            <JobCard
              getJobs={getJobs}
              id={job.id}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              location={job.location}
              remoteType={job.remoteType}
              minExperience={job.minExperience}
              maxExperience={job.maxExperience}
              minSalary={job.minSalary}
              maxSalary={job.maxSalary}
              totalEmployee={job.totalEmployee}
              applyType={job.applyType}
              imgUrl={job.imgUrl}
              industry={job.industry}
            />
          </Fragment>
        )}
      </main>
    </>
  )
}