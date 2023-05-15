import React, { FC, useEffect } from 'react'
import { EditJobs } from './EditJob'

export interface JobCardProps {
  getJobs: () => void
  id: string
  jobTitle: string
  companyName: string
  location: string
  remoteType: string
  minExperience: string
  maxExperience: string
  minSalary: string
  maxSalary: string
  totalEmployee: string
  applyType: string
  imgUrl: string
  industry: string
}

export const JobCard: FC<JobCardProps> = ({
  getJobs,
  id,
  jobTitle,
  companyName,
  location,
  remoteType,
  minExperience,
  maxExperience,
  minSalary,
  maxSalary,
  totalEmployee,
  applyType,
  imgUrl,
  industry
}: JobCardProps) => {

  return (
    <div className='min-h-80 border border-cardBorder rounded-[10px] px-6 py-4 flex space-x-2 bg-white group'>
        <img className='h-12 w-12' src={imgUrl} alt="company-logo" />
        <div className='w-full flex flex-col justify-between'>
          <div className='space-y-6'>
            <div className='flex flex-col'>
              <div className='  flex justify-between'>
                <span className='text-2xl text-dark'>{jobTitle}</span>
                <EditJobs className='group-hover:block hidden' id={id} getJobs={getJobs}/>
              </div>
              <span className='text-base text-dark'>{companyName} - {industry}</span>
              {location && <span className='text-base text-placeholder'> {location} {remoteType && <>({remoteType})</>}</span>}
            </div>

            <div className='flex flex-col space-y-2'>           
              {minExperience && maxExperience && <span className='text-base text-dark'>Experience ({minExperience} - {maxExperience} years)</span>}
              {minSalary && maxSalary && <span className='text-base text-dark'>INR (₹) {minSalary} - {maxSalary} / Month</span>}
              {totalEmployee && <span className='text-base text-dark'>{totalEmployee} employees</span>}
            </div>
          </div>

          { applyType !== 'external-apply' ? 
            <button className='px-4 w-fit py-2 mt-6 rounded-[5px] bg-primary hover:bg-primaryDarker transition-colors text-textWhite'>Apply now</button> : 
            <button className='px-4 w-fit py-2 mt-6 rounded-[5px] text-primary hover:text-primaryDarker border border-primary hover:border-primaryDarker transition-colors'>External Apply</button>
          }
        </div>
    </div>
  )
}