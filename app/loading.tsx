'use client';

import React from 'react';

function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent' />
    </div>
  );
}

export default Loading;
