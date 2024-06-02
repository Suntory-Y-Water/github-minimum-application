import React from 'react';

type Props = {
  params: {
    element: string;
  };
};
const NotElement = ({ params }: Props) => {
  return (
    <div className='grid place-items-center py-40'>
      <h2>{`${params.element}がありませんでした🤔`}</h2>
    </div>
  );
};

export default NotElement;
