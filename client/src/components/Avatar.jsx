import React, { memo } from 'react';

const Avatar = memo(({ url, name }) => (
  <div>
    {!!url ? (
      <img src={url} alt='avatar' className='avatar-img' />
    ) : (
      <div className='avatar-txt'></div>//{name.charAt(0)} 일단 에러 나서 지움
    )}
  </div>
));

export default Avatar;
