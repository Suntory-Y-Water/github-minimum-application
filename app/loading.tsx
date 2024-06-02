'use client';

import React from 'react';

function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent' />
    </div>
  );
}

export default Loading;
