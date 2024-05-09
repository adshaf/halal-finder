'use client';

import React, { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({
  children
}) => {
  return (
    <div className="max-w-[2520px] flex flex-row justify-between ml-4 mr-4 relative">
      {children}
    </div>
  )
}

export default Container