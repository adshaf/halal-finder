'use client';

import React, { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({
  children
}) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex flex-row justify-between items-center">
      {children}
    </div>
  )
}

export default Container